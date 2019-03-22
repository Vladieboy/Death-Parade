import React from "react";
import Pagination from "react-js-pagination";
import classNames from "classnames";
import { Modal, UncontrolledAlert } from "reactstrap";
import AddressUpdate from "./AddressCreation";
import AddressCard from "./AddressCard";
import * as addressService from "../../Services/addressService";

class AddressDisplayContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: [],
      modal: false,
      tc: false,
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
      activePage: resp.data.Item.PageIndex,
      pageSize: resp.data.Item.PageSize,
      hasNextPage: resp.data.Item.HasNextPage,
      hasPreviousPage: resp.data.Item.HasPreviousPage,
      totalCount: resp.data.Item.TotalCount,
      totalPages: resp.data.Item.TotalPages
    };

    this.setState({
      addresses: resp.data.Item.PagedItems,
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

  remove = address => {
    debugger;
    console.log("Successfully Deleted!");
    let data = address;
    addressService
      .deleteAddress(data, this.pageDisplay, this.onGetAddressFailure)
      .then(this.onAddressDeleteSuccess);
  };

  onAddressDeleteSuccess = () => {
    this.setState({
      tc: true
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

  render() {
    return (
      <>
        <div className="content">
          {" "}
          <h3>Address Display</h3>
          <div> {this.state.addresses.map(this.getAllAddresses)}</div>
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
        </div>
      </>
    );
  }
}

export default AddressDisplayContainer;
