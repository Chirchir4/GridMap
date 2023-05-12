import L from "leaflet";
import marker from "../../assets/map.png";
import visitedLocations from "../../assets/location.png";


export const VenueLocationIcon = L.icon({
  iconUrl: marker,
  iconRetinaUrl: marker,
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [35, 35],
  className: "leaflet-venue-icon",
});

export const VisitedLocationIcon = L.icon({
  iconUrl: visitedLocations,
  iconRetinaUrl: marker,
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [35, 35],
  className: "leaflet-venue-icon-invisible",
});

export const allUserCurrentLocations = L.icon({
  iconUrl: visitedLocations,
  iconRetinaUrl: marker,
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [35, 35],
  className: "leaflet-venue-icon",
});