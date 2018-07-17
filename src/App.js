import React, { Component } from 'react'
import { Route, Switch, NavLink } from 'react-router-dom'
import gmapLogo from './assets/maps_64dp.png'
import './App.css'
import Map from './components/Map/Map';
import alpoints from './assets/alpoints.json'
import Table from './components/Table/Table';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon'
import OtherControls from './components/OtherControls/OtherControls'
import Modal from './components/Modal/Modal'

const otherControl = (props, disabled) => {
  return (
    <OtherControls googleMapRef={props} disabled={disabled}></OtherControls>
  )
}

class App extends Component {
  constructor(props) {
    super(props)
    this.googleMap = React.createRef()
  }
  state = {
    showMap: false,
    loadMap: false,
    showModal: true,
    layout: 1,
    points: null,

  }
  loadMap = () => {
    let mapLoaded = this.state.loadMap
    if (!mapLoaded) {
      this.setState({ loadMap: true })
      this.googleMap.current.loadTheMap()
    }
  }
  toggleInfo = () => {
    this.googleMap.current.showInfo()
  }
  toggleMap = () => {
    this.googleMap.current.showMap()
  }
  setMarkersAL = () => {
    console.log('alpoints', alpoints["points"]);

    alpoints["points"].forEach(p => {
      console.log('alpoints', p);
      this.googleMap.current.addMarker(p.lat, p.long, p.title)
    });
  }
  goToPoint = (point) => {
    console.log('go to Point', point);
    this.googleMap.current.panTo(point)
  }
  toggleModal = () => {
    let show = this.state.showModal
    if (show) {
      this.setState({ showModal: !show })
      this.googleMap.current.setLeft('0')
    } else {
      this.setState({ showModal: !show })
      this.googleMap.current.setLeft('28.5%')
    }
    console.log('toggleModal', this.state.showModal)
  }
  toggleZoom = () => {
    this.googleMap.current.toggleZoom()
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={gmapLogo} className="App-logo" alt="Google Map Logo" />
          <h1 className="App-title">Google Maps & React</h1>
        </header>
        <ul className="top-menu">
          <NavLink
            to="/"
          >
            <Button variant="outlined" color="primary" aria-label="Edit">
              <Icon>home</Icon>
            </Button>
          </NavLink>
          <NavLink
            to="/google-map"
          >
            <Button variant="outlined" color="primary" aria-label="Edit">
              {/* <Icon>forward</Icon> */}
              External Map Control
            </Button>
          </NavLink>
          <NavLink
            to="/projectinfo"
          >
            <Button variant="outlined" color="primary" aria-label="Edit">
              {/* <Icon>forward</Icon> */}
              Project Details
            </Button>
          </NavLink>
        </ul>
        <div id="map-info" className="map-info">
          <Table
            show={this.state.loadMap}
            goToPoint={this.goToPoint}
            markers={alpoints["points"]}
          />
          <Map
            ref={this.googleMap}
            zoom={10}
            lat={34.703585}
            lng={-86.593049}
            title={'Marky'}
            show={this.state.showMap}
            load={this.state.loadMap}
            points={alpoints["points"]}
          />
        </div>
        <div className="button-bar">
          <Button variant="contained" color="primary" onClick={this.loadMap}>Load Map</Button>
          <Button variant="contained" color="primary" onClick={this.toggleZoom} disabled={!this.state.loadMap}>Toggle Zoom</Button>
          <Button variant="contained" color="primary" onClick={this.toggleMap} disabled={!this.state.loadMap}>Toggle Map</Button>
          <Button variant="contained" color="primary" onClick={this.setMarkersAL} disabled={!this.state.loadMap}>Add Markers for 35950</Button>
          <Button variant="contained" color="primary" onClick={() => this.googleMap.current.hideMarkers()} disabled={!this.state.loadMap}>Hide markers</Button>
          <Button variant="contained" color="primary" onClick={() => this.googleMap.current.showMarkers()} disabled={!this.state.loadMap}>Show Markers</Button>
          <Button variant="contained" color="primary" onClick={() => this.googleMap.current.clearMarkers()} disabled={!this.state.loadMap}>Clear Markers</Button>
          <Button variant="contained" color="primary" onClick={() => this.googleMap.current.resetMap()} disabled={!this.state.loadMap}>Reset Map</Button>
        </div>
        <Switch>
          <Route path="/google-map" render={() => otherControl(this.googleMap, this.state.showMap)} />
          <Route path="/projectinfo" component={Modal} />
          <Route path="/" component={Modal} />
        </Switch>
      </div>
    )
  }
}

export default App
