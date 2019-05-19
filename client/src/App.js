import React,{Component} from 'react';
import './App.css';
import {MAPBOX_KEY} from "./.env.json"
import ReactMapGL from 'react-map-gl';
// import SweetAlert from 'sweetalert2-react';
import SweetAlert from 'react-bootstrap-sweetalert';
import DecibelMeter from 'decibel-meter';

import styled from 'styled-components';

// const meter = new DecibelMeter('unique-id');

const AppContainer = styled.div`
width: 100vw;
height: 100vh;
`

const PopupButton = styled.button`
color: black;
background-color: orange;
width:200px;height:50px;
position: fixed;
top: 93vh;
left: 50%;
transform: translateX(-50%);
position: fixed;`

class App extends Component {
  constructor(){
    super()

  this.state = {
    height: window.innerHeight,
    width: window.innerWidth,
    show:false,
    alert:null,
    dB:0,
    latitude:0,
    longitude:0,
    viewport: {
      width: "100vw",
      height: "100vh",
      latitude: 29.7604,
      longitude: -95.3698,
      zoom: 10,
    }
  };
}
componentDidMount() {
    if('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      })
    }
  }
  submitData=()=>{
    fetch('http://localhost:8080/api/reading', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        decibel: this.state.dB
      })
  }).then(this.setState({show:false}))
}
testingClick=()=>{
  const meter = new DecibelMeter('unique-id');
  meter.sources.then(sources => {
    meter.connect(sources[0])
  })
  meter.listen()
  setTimeout(function(){
    meter.stopListening()
  },5000)

  // meter.connectTo('not-real').catch(err => alert('Connection Error'))
  meter.on('sample', (dB, percent, value) => console.log(dB))
  meter.on('sample', (dB, percent, value) => this.setState({dB:dB}))
}

handleClick=()=>{
  this.setState({show:true})
  const meter = new DecibelMeter('unique-id');
  meter.sources.then(sources => {
    meter.connect(sources[0])
  })
  meter.listen()
  setTimeout(function(){
    meter.stopListening()
  },5000)

  // meter.connectTo('not-real').catch(err => alert('Connection Error'))
  meter.on('sample', (dB, percent, value) => console.log(dB))
  meter.on('sample', (dB, percent, value) => this.setState({dB:dB}))
}

handlePastTwentyFourHoursClick = () => {
  fetch('http://localhost:8080/api/getPastTwentyFourHoursData')
  .then(response => response.json()).then(json => console.log(json))
}

handleDecibelThreshold = () => {
  fetch('http://localhost:8080/api/getDecibelThreshold')
  .then(response => response.json()).then(json => console.log(json))
}

render(){
  return (

    <AppContainer>
    <button onClick={this.testingClick}>
    {this.state.dB}
    </button>
    <button onClick={this.handlePastTwentyFourHoursClick}>Past 24 Hours</button>
    <button onClick={this.handleDecibelThreshold}>Decibel Threshold</button>
    <ReactMapGL
      {...this.state.viewport}
      mapboxApiAccessToken={MAPBOX_KEY}
      onViewportChange={(viewport) => this.setState({viewport})}
    />
    <PopupButton onClick={this.handleClick}>Check Decibel Levels</PopupButton>
    <SweetAlert
    showCancel
    confirmBtnText="Send Data?"
    confirmBtnBsStyle="danger"
    cancelBtnBsStyle="default"
    show={this.state.show}
    title="Decibel Stuff"
    onCancel={()=>this.setState({show:false})}
    onConfirm={this.submitData}
    >{this.state.dB}</SweetAlert>
    </AppContainer>
  );
}
}

export default App;
