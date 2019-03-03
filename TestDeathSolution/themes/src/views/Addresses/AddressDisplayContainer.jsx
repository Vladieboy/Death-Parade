import React, { Suspense } from "react";
import AddressCard from "./AddressCard";
import Pagination from "react-js-pagination";
import * as addressService from "services/addressService.js";
import { CardDeck } from "reactstrap";
import PageLoader from "../../components/PageLoader/PageLoader.jsx";

class AddressDisplayContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: [],
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

  // paginate = () => {
  //   return (

  //   );
  // };

  getAllAddresses = (address, i) => {
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

    return <AddressCard key={i} address={address} mapImageUrl={mapImageUrl} />;
  };

  render() {
    return (
      <Suspense fallback={<PageLoader />}>
        <div>
          {" "}
          <CardDeck>{this.state.addresses.map(this.getAllAddresses)}</CardDeck>
          <div className="container-fluid pt-3">
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
        </div>
      </Suspense>
    );
  }
}
export default AddressDisplayContainer;
