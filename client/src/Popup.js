import React, { Component } from "react";
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

const ButtonLabel = styled.label`
  color: white;
  font-family: "Inconsolata", monospace;
  font-weight: bold;
  position: relative;
  left: 50%;
  &:hover {
    cursor: pointer;
  }
`;

const initialState = {
  lat: navigator.geolocation.lat,
  lng: navigator.geolocation.lng,
  dB: 0,
  averageDb: null,
  errorVisible: false,
  values: [],
  showAverage: false
};

export class PopupComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState
    };
    this._meter = new DecibelMeter("unique-id");
    this._handleSubmit = this._handleSubmit.bind(this);
    this._submitAverage = this._submitAverage.bind(this);
    this._stopMeter = this._stopMeter.bind(this);
  }

  componentDidMount() {
    this._meter.connectTo("default").catch(err => alert("Connection Error"));
    this._meter.listen();
    this._meter.on("sample", dB => {
      this.setState({
        dB: Math.ceil(dB) + 100,
        values: this.state.values.concat(dB + 100)
      });
    });
    setTimeout(async () => {
      await this._stopMeter();
      this._submitAverage();
    }, 5000);
  }

  _submitAverage() {
    this.setState({
      showAverage: true
    })
  }

  async _stopMeter() {
    try {
      this._meter.stopListening();
      await this._meter.disconnect();
    } catch (err) {
      throw Error(err);
    }
  }

  async _handleSubmit() {
   await new Promise(resolve => {setTimeout(() => {resolve()}, 200)});
  }

  _getAverageDecibel() {
    const arr = this.state.values.filter(val => val > 10);
    const sum = arr.reduce((memo, val) => {
      return memo + val;
    }, 0);
    const average = sum / arr.length;
    return Math.round(average * 100) / 100;
  }

  render() {
    return (
      <OverlayContainer>
        {this.state.showAverage ? (
          <StyledPopup>
            <PopupContent>
              <h2>Average Reading: {this._getAverageDecibel()} dB˝</h2>
                <ButtonLabel onClick={() => this.props.closePopup()}>
                  Submit
                </ButtonLabel>
            </PopupContent>
          </StyledPopup>
        ) : (
          <StyledPopup>
            <PopupContent>
              <h2>{this.state.dB} dB</h2>
            </PopupContent>
          </StyledPopup>
        )}
        <Backdrop />
      </OverlayContainer>
    );
  }
}
