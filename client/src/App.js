import React,{Component} from 'react';
import './App.css';
import {MAPBOX_KEY} from "./.env.json"
import ReactMapGL from 'react-map-gl';
import SweetAlert from 'sweetalert2-react';
import DecibelMeter from 'decibel-meter';

import styled from 'styled-components';

// const meter = new DecibelMeter('unique-id');

const AppContainer = styled.div`
width: 100vw;
height: 100vh;
`

const PopupButton = styled.button`
color: red;
background-color: orange;
width:100px;height:100px;
position: fixed;
top: 86vh;
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
    dB:0,
    viewport: {
      width: "100vw",
      height: "100vh",
      latitude: 29.7604,
      longitude: -95.3698,
      zoom: 10,
    }
  };
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
  console.log(meter)
  // meter.connectTo('not-real').catch(err => alert('Connection Error'))
  meter.on('sample', (dB, percent, value) => console.log(dB))
  meter.on('sample', (dB, percent, value) => this.setState({dB:dB}))
}

handleClick=()=>{
  this.setState({
    visiblePopup:true
  })
  console.log(this.state.visiblePopup)
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
    <PopupButton onClick={() => this.setState({show:true})}>POPUP</PopupButton>
    <SweetAlert show={this.state.show}
    title="POPUP"
    text={this.state.dB}
    onConfirm={()=>this.setState({show:false})}
    />
    </AppContainer>
  );
}
}

export default App;
