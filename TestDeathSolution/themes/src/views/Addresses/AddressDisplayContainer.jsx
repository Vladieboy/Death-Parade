import React, { Suspense } from "react";
import AddressCard from "./AddressCard";
import Pagination from "react-js-pagination";
import * as addressService from "services/addressService.js";
import { CardDeck, Modal } from "reactstrap";
import PageLoader from "../../components/PageLoader/PageLoader.jsx";
import AddressUpdate from "./AddressCreation";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";

class AddressDisplayContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: [],
      modal: false,
      pages: {
        totalCount: null,
        totalPages: null,
        pageSize: null,
        activePage: null,
        hasPreviousPage: null
      }
    };
  }

  componentDidMount() {
    let pageObject = { pageIndex: 0, pageSize: 2 };
    addressService
      .getPage(pageObject)
      .then(this.onGetAddressSuccess)
      .catch(this.onGetAddressFailure);
  }

  pageDisplay = pageObject => {
    addressService
      .getPage(pageObject)
      .then(this.onGetAddressSuccess)
      .catch(this.onGetAddressFailure);
  };

  onGetAddressSuccess = resp => {
    const pageResp = {
      activePage: resp.Item.PageIndex,
      pageSize: resp.Item.PageSize,
      hasNextPage: resp.Item.HasNextPage,
      hasPreviousPage: resp.Item.HasPreviousPage,
      totalCount: resp.Item.TotalCount,
      totalPages: resp.Item.TotalPages
    };

    this.setState({
      addresses: resp.Item.PagedItems,
      pages: pageResp
    });

    console.log(this.state);
  };

  onGetAddressFailure(resp) {
    console.log(resp);
  }

  pageChange = pageIndex => {
    let pageObject = {
      pageIndex: pageIndex - 1,
      pageSize: this.state.pages.pageSize
    };

    this.pageDisplay(pageObject);
    window.scrollTo(0, 0);
  };

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onModalRequested = address => {
    this.setState({
      modal: !this.state.modal,
      addressInfo: address
    });
  };

  getAllAddresses = address => {
    let mapImage = JSON.parse(address.Value);

    let mapImageUrl = encodeURIComponent(
      mapImage.lineOne.replace(/[&\\#,+()$~%.'":*?<>{}]/g, "") +
        "," +
        mapImage.lineTwo.replace(/[&\\#,+()$~%.'":*?<>{}]/g, "") +
        "," +
        mapImage.city.replace(/[&\\#,+()$~%.'":*?<>{}]/g, "") +
        "," +
        mapImage.state.replace(/[&\\#,+()$~%.'":*?<>{}]/g, "") +
        "," +
        mapImage.postalCode.replace(/[&\\#,+()$~%.'":*?<>{}]/g, "")
    );

    return (
      <AddressCard
        {...this.props}
        key={address.AddressId}
        address={address}
        mapImageUrl={mapImageUrl}
        modalRequester={this.onModalRequested}
        remove={this.remove}
      />
    );
  };

  remove = address => {
    console.log("Successfully Deleted!");
    let data = address.AddressId;
    addressService.deleteAddress(
      data,
      this.pageDisplay,
      this.onGetAddressFailure
    );
  };

  render() {
    return (
      <Suspense fallback={<PageLoader />}>
        <GridContainer>
          {" "}
          <GridItem xs={12} sm={12} md={6}>
            {this.state.addresses.map(this.getAllAddresses)}
          </GridItem>
        </GridContainer>{" "}
        <div className="d-flex justify-content-center">
          <Pagination
            itemClass="page-item"
            linkClass="page-link"
            hideDisabled
            activePage={this.state.pages.activePage + 1}
            itemsCountPerPage={this.state.pages.pageSize}
            totalItemsCount={this.state.pages.totalCount}
            pageRangeDisplayed={5}
            onChange={this.pageChange}
          />
        </div>
        <Modal
          style={{ marginLeft: "500px" }}
          {...this.props}
          className="Modal"
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          container={this.true}
        >
          <AddressUpdate
            address={this.state.addressInfo}
            remove={this.remove}
          />
        </Modal>
      </Suspense>
    );
  }
}
export default AddressDisplayContainer;
