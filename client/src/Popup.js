import React, { useState, Component } from "react";
import styled, { keyframes } from "styled-components";
import DecibelMeter from "decibel-meter";
import { fadeIn } from "react-animations";

const fader = keyframes`${fadeIn}`;

const OverlayContainer = styled.div`
  top: 0;
  left: 0;
  position: fixed;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  animation: 1s ${fader} alternate infinite;
  animation-iteration-count: 1;
`;

const StyledPopup = styled.div`
  position: fixed;
  top: 50%;
  z-index: 101;
  width: 100%;
`;

const PopupContent = styled.div`
  > * {
    color: white;
    text-align: center;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
`;

const initialState = {
  lat: navigator.geolocation.lat,
  lng: navigator.geolocation.lng,
  dB: 0,
  averageDb: null,
  errorVisible: false
};

export class PopupComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState
    };
    this._meter = new DecibelMeter("unique-id");
    this._handleClose = this._handleClose.bind(this);
  }

  componentDidMount() {
    this._meter.connectTo("default").catch(err => alert("Connection Error"));
    this._meter.listen();
    this._meter.on("sample", (dB) => {
      this.setState({ dB: dB > 0 ? Math.ceil(dB) : 0 });
    });
  }

  async _handleClose() {
    try {
      this._meter.stopListening();
      await this._meter.disconnect();
    } catch (err) {
      throw Error(err);
    }
    this.props.closePopup();
  };

  // const _handleSubmit = () => {};

  render() {
    return (
      <OverlayContainer>
        <StyledPopup>
          <PopupContent>
            <h2>{this.state.dB}</h2>
          </PopupContent>
        </StyledPopup>
        <Backdrop onClick={this._handleClose} />
      </OverlayContainer>
    )
  }
};
