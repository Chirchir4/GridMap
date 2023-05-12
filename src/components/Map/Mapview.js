import React, { Component } from "react";
import Leaflet from "leaflet";
import { Grid } from "@mui/material";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Polygon,
} from "react-leaflet";
import "../../../node_modules/leaflet/dist/leaflet.css";
import { VenueLocationIcon, VisitedLocationIcon,allUserCurrentLocations } from "./VenueLocationIcon";
import { getData, getDataWithoutDocId, saveData } from "../../functions/functions";
import Dialog from "../Dialog/Dialog";
import Header from "../Header/Header";
// import data from "../../data/locations.json";
// import Markers from "./VenueMarker";

function MyComponent(props) {
  const map = useMap();
  if (map) {
    Leaflet.GridLayer.GridDebug = Leaflet.GridLayer.extend({
      createTile: function (coords) {
        // console.log("These are the coords", coords);
        const tile = document.createElement("div");
        tile.style.outline = "1px solid gray";
        tile.style.fontWeight = "bold";
        tile.style.fontSize = "14pt";
        tile.innerHTML = coords.x + ":" + coords.y;
        return tile;
      },
    });

    Leaflet.gridLayer.gridDebug = function (opts) {
      return new Leaflet.GridLayer.GridDebug(opts);
    };
    // console.log("This is ti0,", Leaflet.gridLayer.gridDebug());
    map.addLayer(Leaflet.gridLayer.gridDebug());
    let layerElements = document.getElementsByClassName("leaflet-layer");
    if (props.visitedLocations.length > 0) {
      map.eachLayer(function (layer) {
        if (layer instanceof Leaflet.GridLayer) {
          var markerList = document.getElementsByClassName(
            "leaflet-venue-icon-invisible"
          );
          for (let marker of markerList) {
            if (marker) {
              for (let [key, value] of Object.entries(layer._tiles)) {
                const layer = value;
                const layerBound = value.el.getBoundingClientRect();
                const markerBound = marker.getBoundingClientRect();
                if (
                  layerBound.left < markerBound.right &&
                  layerBound.right > markerBound.left &&
                  layerBound.top < markerBound.bottom &&
                  layerBound.bottom > markerBound.top
                ) {
                  layer.el.style.background = "red";
                  layer.el.style.opacity = "0.6";
                }
                // if (
                //   markerBound.top < layerBound.top &&
                //   markerBound.bottom > layerBound.bottom &&
                //   markerBound.left > layerBound.left &&
                //   markerBound.right > layerBound.right
                // ) {
                //   layer.el.style.background = "red";
                // }
                // console.log("This is maker bbound",markerBound['top']);
              }
              // console.log("This is the marker", marker.getBoundingClientRect())
            }
          }
          // console.log("THis is the layer tiles",layer._tiles)
          // layer._tiles['183708:106219:18'].el.style.background = "red"
          // layer._tiles['183708:106219:18'].el.getBoundingClientRect();
          // console.log("His is teh layer",layer._tiles['183708:106219:18'].el.getBoundingClientRect())
        }
      });
    }
    layerElements[0].style.zIndex = 1000;
  }
  return null;
}

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: null,
      zoom: 12,
      timer: null,
      visitedLocations: [],
      darkMode: false,
      showAccessiblity: false,
      allUserLocations:[]
    };
  }
  // Converts numeric degrees to radians
  toRad = (Value) => {
    return (Value * Math.PI) / 180;
  };

  caculateDistance = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // km
    var dLat = this.toRad(lat2 - lat1);
    var dLon = this.toRad(lon2 - lon1);
    var lat1 = this.toRad(lat1);
    var lat2 = this.toRad(lat2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  };
  setCurrentLocations = (position) => {
    var currentLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    localStorage.setItem(
      "previousLocation",
      localStorage.getItem("currentLocation")
    );
    localStorage.setItem("currentLocation", JSON.stringify(currentLocation));
    this.setState({ currentLocation: currentLocation });
  };
  showPosition = (position) => {
    // console.log("This is the position", position);
    this.setCurrentLocations(position);
  };

  toggleDarkMode = () => {
    this.setState({ darkMode: !this.state.darkMode });
  };

  toggleAccessiblity = () => {
    this.setState({ showAccessiblity: !this.state.showAccessiblity });
  };

  getAllUsers = () =>{
    getDataWithoutDocId('users').then(
      (result)=>{
        const allUserLocations = []
        result.forEach(
          (doc) =>{
            const { currentLocation } = doc.data();
            allUserLocations.push(currentLocation)
          }
        )
        this.setState({allUserLocations:allUserLocations})
      }
    )
  }

  componentDidMount() {
    getData("users", localStorage.getItem("uid")).then((doc) => {
      const USER = doc.data();
      console.log("THis is the user", USER);
      this.setState({ visitedLocations: USER.visitedLocations || [] });
    });
    if(localStorage.getItem("userType").includes('admin'))
    {
      this.getAllUsers()
    }
    if (navigator.geolocation) {
      var that = this;
      navigator.geolocation.getCurrentPosition(this.showPosition);
      navigator.geolocation.watchPosition(function (position) {
        var currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        that.setCurrentLocations(position);
        const prevLoc =
          localStorage.getItem("previousLocation") &&
          JSON.parse(localStorage.getItem("previousLocation"));
        if (prevLoc) {
          const distanceInMeters =
            that.caculateDistance(
              prevLoc.lat,
              prevLoc.lng,
              currentLocation.lat,
              currentLocation.lng
            ) * 1000;
          localStorage.setItem(
            "currentLocation",
            JSON.stringify(currentLocation)
          );

          saveData("users", localStorage.getItem("uid"), {
            currentLocation: currentLocation,
          }).then(() => {
            console.log("location saved successfull");
          });
          if (distanceInMeters >= 10) {
            // alert("This will now save the visited locations");
            var tempVisitedLocations = that.state.visitedLocations;
            tempVisitedLocations.push(currentLocation);
            saveData("users", localStorage.getItem("uid"), {
              visitedLocations: tempVisitedLocations,
            }).then(() => {
              console.log("Visited location saved successfull");
            });
            // console.log("The distance is in meters");
          }
        }
      });
      return true;
    } else {
      alert("App need your location work properly");
    }
  }

  render() {
    const multiPolygon = [
      [
        [51.51, -0.12],
        [51.51, -0.13],
        [51.53, -0.13],
      ],
      [
        [51.51, -0.05],
        [51.51, -0.07],
        [51.53, -0.07],
      ],
    ];
    const fillBlueOptions = { fillColor: "blue" };

    return this.state.currentLocation !== null ? (
     <>
       <Header/>
       <div className="h-80">
      <MapContainer
        center={[
          this.state.currentLocation.lat,
          this.state.currentLocation.lng,
        ]}
        zoom={18}
        scrollWheelZoom={false}
      >
        <Dialog
          toggleDarkMode={this.toggleDarkMode}
          darkMode={this.state.darkMode}
          showAccessiblity={this.state.showAccessiblity}
          toggleAccessiblity={this.toggleAccessiblity}
        ></Dialog>
        <Polygon pathOptions={fillBlueOptions} positions={multiPolygon} />
        {/* <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.mapbox.com/styles/v1/mapbox/dark-v11/pk.eyJ1Ijoic2FtLW1hcCIsImEiOiJjbGd6YXBtdXIwaHR4M2RtOWY5OWVpN3hzIn0.acKDCMHcqKopFB24OGBpxQ"
        /> */}
        {/* https://api.mapbox.com/styles/v1/sam-map/clh2cu88n016s01paeqiegne9/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2FtLW1hcCIsImEiOiJjbGd6YXBtdXIwaHR4M2RtOWY5OWVpN3hzIn0.acKDCMHcqKopFB24OGBpxQ */}
        {/* https://api.mapbox.com/styles/v1/sam-map/clh2cu88n016s01paeqiegne9/tiles/256/%7Bz%7D/%7Bx%7D/%7By%7D@2x?access_token=pk.eyJ1Ijoic2FtLW1hcCIsImEiOiJjbGd6YXBtdXIwaHR4M2RtOWY5OWVpN3hzIn0.acKDCMHcqKopFB24OGBpxQ */}
        {this.state.darkMode ? (
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://api.mapbox.com/styles/v1/sam-map/clh2cu88n016s01paeqiegne9/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2FtLW1hcCIsImEiOiJjbGd6YXBtdXIwaHR4M2RtOWY5OWVpN3hzIn0.acKDCMHcqKopFB24OGBpxQ"
          />
        ) : (
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        )}
        {!localStorage.getItem("userType").includes('admin') && (
          <MyComponent
            visitedLocations={this.state.visitedLocations}
          ></MyComponent>
        )}
        {!localStorage.getItem("userType").includes('admin') &&
          this.state.visitedLocations.map((marker, index) => {
            return (
              <Marker
                position={[marker.lat, marker.lng]}
                icon={VisitedLocationIcon}
              >
                <span id={"location-marker" + index}></span>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            );
          })}
           {localStorage.getItem("userType").includes('admin') &&
          this.state.allUserLocations.map((marker, index) => {
            return (
              <Marker
                position={[marker.lat, marker.lng]}
                icon={allUserCurrentLocations}
              >
                <span id={"location-marker" + index}></span>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            );
          })}
        <Marker
          position={[
            this.state.currentLocation.lat,
            this.state.currentLocation.lng,
          ]}
          icon={VenueLocationIcon}
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        {/* <div
          style={{
            display:"flex",
            flexDirection:"justify-between",
            position: "absolute",
            top: 0,
            zIndex: 20000000,
            width: "60%",
            background: "white",
          }}
        >
          <Grid container direction={"row"}>
            <Grid item md={6}>
              <Grid container justifyContent={"center"}>
                <button
                  id="logout"
                  type="button"
                  className="button-active-large"
                  onClick={() => {
                    this.toggleAccessiblity();
                  }}
                >
                  Accessibility
                </button>
              </Grid>
            </Grid>
            <Grid item md={3}>
              <Grid container justifyContent={"center"}>
                <button
                  id="logout"
                  type="button"
                  className="button-active-large"
                  onClick={() => {
                    window.location.href = "/chat";
                  }}
                >
                  Chat
                </button>
              </Grid>
            </Grid>
            <Grid item md={3}>
              <Grid container justifyContent={"center"}>
                <button
                  id="logout"
                  type="button"
                  className="button-active-large"
                  onClick={() => {
                    localStorage.removeItem("uid");
                    localStorage.removeItem("userType");
                    window.location.href = "/";
                  }}
                >
                  Logout
                </button>
              </Grid>
            </Grid>
          </Grid>
        </div> */}
      </MapContainer>
      </div>
      <div
          style={{
            display:"flex",
            flexDirection:"justify-between",
            position: "absolute",
            bottom: 0,
            zIndex: 20000000,
            width: "100%",
            background: "white",
          }}
        >
          <Grid container direction={"row"}>
            <Grid item md={6}>
              <Grid container justifyContent={"center"}>
                <button
                  id="logout"
                  type="button"
                  className="button-active-large"
                  onClick={() => {
                    this.toggleAccessiblity();
                  }}
                >
                  Accessibility
                </button>
              </Grid>
            </Grid>
            <Grid item md={3}>
              <Grid container justifyContent={"center"}>
                <button
                  id="logout"
                  type="button"
                  className="button-active-large"
                  onClick={() => {
                    window.location.href = "/chat";
                  }}
                >
                  Chat
                </button>
              </Grid>
            </Grid>
            <Grid item md={3}>
              <Grid container justifyContent={"center"}>
                <button
                  id="logout"
                  type="button"
                  className="button-active-large"
                  onClick={() => {
                    localStorage.removeItem("uid");
                    localStorage.removeItem("userType");
                    window.location.href = "/";
                  }}
                >
                  Logout
                </button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </>
    ) : (
      <div>Please Allow Location</div>
    );
    // <Map center={currentLocation} zoom={zoom} scrollWheelZoom={false}>
    //   <TileLayer
    //     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //     attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    //   />

    //   <Markers venues={data.venues} />
    //   {/* <Grid
    //     container
    //     direction="row"
    //     alignItems="flex-end"
    //     style={{ height: "98%" }}
    //   >
    //     <Grid
    //       container
    //       direction="column"
    //       alignItems="flex-start"
    //       style={{ position: "relative", width: "50%", zIndex: 100000000000 }}
    //     >
    //       <Paper style={{ marginLeft: "2%" }}>
    //         <IconButton>
    //           <GpsFixedIcon></GpsFixedIcon>
    //         </IconButton>
    //       </Paper>
    //     </Grid>
    //     <Grid
    //       container
    //       direction="column"
    //       alignItems="flex-end"
    //       style={{ position: "relative", width: "50%", zIndex: 100000000000 }}
    //     >
    //       <Paper style={{ marginRight: "2%" }}>
    //         <IconButton>
    //           {" "}
    //           <GpsFixedIcon></GpsFixedIcon>
    //         </IconButton>
    //       </Paper>
    //     </Grid>
    //   </Grid>*/}
    // </Map>


  }
}

export default MapView;
