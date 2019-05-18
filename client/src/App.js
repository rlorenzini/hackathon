import React,{Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import {MAPBOX_KEY} from "./.env.json"
import ReactMapGL from 'react-map-gl';
import SweetAlert from 'sweetalert2-react';

import styled from 'styled-components';

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
    viewport: {
      width: "100vw",
      height: "100vh",
      latitude: 29.7604,
      longitude: -95.3698,
      zoom: 10,
    }
  };
}
handleClick=()=>{
  this.setState({
    visiblePopup:true
  })
  console.log(this.state.visiblePopup)
}
render(){
  return (
    <AppContainer>
    <ReactMapGL
      {...this.state.viewport}
      mapboxApiAccessToken={MAPBOX_KEY}
      onViewportChange={(viewport) => this.setState({viewport})}
    />
    <PopupButton onClick={() => this.setState({show:true})}>POPUP</PopupButton>
    <SweetAlert show={this.state.show}
    title="POPUP"
    text="STUFF"
    onConfirm={()=>this.setState({show:false})}
    />
    </AppContainer>
  );
}
}

export default App;
