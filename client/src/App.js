import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import MapGL from "react-map-gl";
// import ControlPanel from "./control-panel";
import { json as requestJson } from "d3-request";
import { MAPBOX_KEY } from "./.env.json";
import { Sidebar } from "./Sidebar";
import { Legend } from "./Legend";
import { validateCoordinates } from "./validate-coordinates";
import { adjustBadValues } from "./adjust-bad-values";
import { PopupButton } from "./PopupButton";
import { PopupComponent } from "./Popup.js";

const HEATMAP_SOURCE_ID = "decibel-source";
const DATA_URL =
  "https://noise-pollution-hackathon2019.herokuapp.com/api/getData";
// "https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewport: {
        width: "100vw",
        height: "100vh",
        latitude: 29.7604,
        longitude: -95.2228,
        zoom: 9
      },
      popup: false,
      data: null
    };

    this._mapRef = React.createRef();
    this._handleMapLoaded = this._handleMapLoaded.bind(this);
    this._handlePopupOpen = this._handlePopupOpen.bind(this);
    this._handlePopupClose = this._handlePopupClose.bind(this);
  }

  _mkFeatureCollection = features => {
    return { type: "FeatureCollection", features };
  };

  _mkHeatmapLayer = (id, source) => {
    const MAX_ZOOM_LEVEL = 13;
    return {
      id,
      source,
      maxzoom: MAX_ZOOM_LEVEL,
      type: "heatmap",
      paint: {
        // Increase the heatmap weight based on frequency and property magnitude
        "heatmap-weight": {
          property: "decibel",
          type: "exponential",
          stops: [[1, 0], [150, 1]]
        },
        // Increase the heatmap color weight weight by zoom level
        // heatmap-intensity is a multiplier on top of heatmap-weight
        "heatmap-intensity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          1,
          MAX_ZOOM_LEVEL,
          3
        ],
        // Adjust the heatmap radius by zoom level
        "heatmap-radius": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          2,
          MAX_ZOOM_LEVEL,
          20
        ],
        "heatmap-color": [
          "interpolate",
          ["linear"],
          ["heatmap-density"],
          0,
          "rgba(236,222,239,0)",
          0.2,
          "#ffffb2",
          0.4,
          "#fecc5c",
          0.6,
          "#fd8d3c",
          0.8,
          "#f03b20",
          1,
          "#bd0026"
        ]
      }
    };
  };

  _onViewportChange = viewport => this.setState({ viewport });

  _getMap = () => {
    return this._mapRef.current ? this._mapRef.current.getMap() : null;
  };

  _handleMapLoaded = event => {
    const map = this._getMap();

    requestJson(DATA_URL, (error, response) => {
      if (!error) {
        response = {
          ...response,
          features: response.features
            .filter(validateCoordinates)
            .map(adjustBadValues)
        };
        this.setState({
          data: response
        });
        map.addSource(HEATMAP_SOURCE_ID, { type: "geojson", data: response });
        map.addLayer(this._mkHeatmapLayer("heatmap-layer", HEATMAP_SOURCE_ID));
      }
    });
  };

  _handlePopupOpen() {
    this.setState({
      popup: true
    });
  }

  _handlePopupClose() {
    this.setState({
      popup: false
    });
  }

  _setMapData = features => {
    const map = this._getMap();
    map &&
      map
        .getSource(HEATMAP_SOURCE_ID)
        .setData(this._mkFeatureCollection(features));
  };

  render() {
    const { viewport } = this.state;
    console.log(this.state);
    return (
      <Fragment>
        <MapGL
          ref={this._mapRef}
          {...viewport}
          width="100%"
          height="100%"
          style={{ position: "fixed" }}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          onViewportChange={this._onViewportChange}
          mapboxApiAccessToken={MAPBOX_KEY}
          onLoad={this._handleMapLoaded}
        />
        <Sidebar />
        <div onClick={this._handlePopupOpen.bind(this)}>
          <PopupButton />
        </div>

        {this.state.popup && (
          <PopupComponent closePopup={this._handlePopupClose} />
        )}
        <Legend />
      </Fragment>
    );
  }
}

export function renderToDOM(container) {
  render(<App />, container);
}
