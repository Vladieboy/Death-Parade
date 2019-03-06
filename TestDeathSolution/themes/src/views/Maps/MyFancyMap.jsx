import React, { Suspense } from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import * as addressService from "services/addressService.js";

export default class MyFancyMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: null,
      openInfoWindowMarkerId: ""
    };
  }

  getAddresses() {
    addressService
      .getAll()
      .then(this.onGetAddressSuccess)
      .catch(this.onGetAddressFailure);
  }

  componentDidMount() {
    this.getAddresses();
  }

  onGetAddressSuccess = resp => {
    this.setState({
      address: resp.Items
    });
  };

  onGetAddressFailure = resp => {
    console.log(resp);
  };

  handleToggleOpen = markerId => {
    this.setState({
      openInfoWindowMarkerId: markerId
    });
  };

  handleToggleCLose = () => {
    this.setState({
      isOpen: false
    });
  };

  moreTests = ({ ...props }) => {
    if (this.state.address) {
      return this.state.address.map(item => {
        return (
          <div>
            {props.isMarkerShown && (
              <Marker
                key={item.AddressId}
                position={{ lat: item.Lat, lng: item.Long }}
                onClick={() => this.handleToggleOpen(item.AddressId)}
              >
                {this.state.openInfoWindowMarkerId == item.AddressId && (
                  <InfoWindow
                    key={item.AddressId}
                    onClick={this.handleToggleCLose}
                  >
                    <div>{item.AddressCategory}</div>
                  </InfoWindow>
                )}
              </Marker>
            )}
          </div>
        );
      });
    }
  };

  render() {
    const MyFancyMap = compose(
      withProps({
        googleMapURL:
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyDPt4lOsC7-Fo-BBk_WD_DeQO2ozHe2y6A",

        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100vh` }} />,
        mapElement: <div style={{ height: `100%` }} />
      }),
      withScriptjs,
      withGoogleMap
    )(props => (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 34.092808, lng: -118.328659 }}
        defaultOptions={{
          scrollwheel: true,
          zoomControl: true,
          styles: [
            {
              featureType: "water",
              stylers: [
                { saturation: 43 },
                { lightness: -11 },
                { color: "#5e2c4e" },
                { hue: "#e91640" }
              ]
            },
            {
              featureType: "road",
              elementType: "geometry.fill",
              stylers: [
                { hue: "#ff0000" },
                { saturation: -100 },
                { lightness: 99 }
              ]
            },
            {
              featureType: "road",
              elementType: "geometry.stroke",
              stylers: [{ color: "#808080" }, { lightness: 54 }]
            },
            {
              featureType: "landscape.man_made",
              elementType: "geometry.fill",
              stylers: [{ color: "#ece2d9" }]
            },
            {
              featureType: "poi.park",
              elementType: "geometry.fill",
              stylers: [{ color: "#ccdca1" }]
            },
            {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: [{ color: "#767676" }]
            },
            {
              featureType: "road",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#ffffff" }]
            },
            { featureType: "poi", stylers: [{ visibility: "off" }] },
            {
              featureType: "landscape.natural",
              elementType: "geometry.fill",
              stylers: [{ visibility: "on" }, { color: "#b8cb93" }]
            },
            { featureType: "poi.park", stylers: [{ visibility: "on" }] },
            {
              featureType: "poi.sports_complex",
              stylers: [{ visibility: "on" }]
            },
            { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
            {
              featureType: "poi.business",
              stylers: [{ visibility: "simplified" }]
            }
          ]
        }}
      >
        {this.moreTests(props)}
      </GoogleMap>
    ));

    return (
      <Suspense>
        <div>
          <MyFancyMap isMarkerShown openInfoWindowMarkerId />
        </div>
      </Suspense>
    );
  }
}
