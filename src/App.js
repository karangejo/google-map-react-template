import React from 'react';
import { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import ApiKey from './env';

//material ui imports
import AlbumIcon from '@material-ui/icons/Album';

const Marker = ({ text }) => <div>

                              <AlbumIcon/>
                              {text}

                            </div>;

class App extends Component {
  state = {
    currentLatitude: 59.95,
    currentLongitude: 30.33,
    timestamp: '',
    mapClicks: [],

  }

  componentDidMount(){
    if(navigator.geolocation){
      console.log("we have a navigator");
      navigator.geolocation.getCurrentPosition(this.handleCurrentPos)
    }
  }

  handleCurrentPos = (position) => {
    console.log(position);
    const lat = parseFloat(position.coords.latitude);
    const long = parseFloat(position.coords.longitude);
    const timeStamp  = parseFloat(position.timestamp);
    this.setState({currentLatitude: lat , currentLongitude: long, timestamp: timeStamp});
  }

 getMapOptions = (maps: any) => {
    return (
      {
        disableDefaultUI: true,
        mapTypeControl: true,
        streetViewControl: true,
        styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
      }
  )
  }

  addMarker = (e) => {
    console.log(e);
    const lat = e.lat;
    const long = e.lng;
    const newMarker = {Lat: lat, Lng: long};
    const markersList = this.state.mapClicks;
    markersList.push(newMarker);
    this.setState({mapClicks: markersList});
  }

  displayMarkers = () => {
    console.log(this.state.mapClicks);
    const markers = this.state.mapClicks.map((click,index) =>
      <Marker
        key={index}
        lat={parseFloat(click.Lat)}
        lng={parseFloat(click.Lng)}
        text={index}
      />
    )
    return(markers)
  }


  render() {

    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          onClick={(e) => this.addMarker(e)}
          options={this.getMapOptions()}
          bootstrapURLKeys={{ key: ApiKey }}
          center={{
                    lat: this.state.currentLatitude,
                    lng: this.state.currentLongitude
                  }}
          defaultZoom={11}
        >
        {this.displayMarkers()}
        <Marker
          lat={this.state.currentLatitude}
          lng={this.state.currentLongitude}
          text="Map Center"
          />

        </GoogleMapReact>
      </div>
    );
  }

}

export default App;
