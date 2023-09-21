import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import styled from "styled-components";
import "leaflet/dist/leaflet.css";
import PropTypes from "prop-types";

const PanToLocation = ({ location }) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(location);
  }, [location, map]);

  PanToLocation.propTypes = {
    location: PropTypes.arrayOf(PropTypes.number).isRequired,
  };

  return null;
};

const Map = ({ location }) => {
  return (
    <StyledMapContainer center={location} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={location}></Marker>
      <PanToLocation location={location} />
    </StyledMapContainer>
  );
};

Map.propTypes = {
  location: PropTypes.arrayOf(PropTypes.number),
};

export default Map;

const StyledMapContainer = styled(MapContainer)`
  @media (min-width: 375px) {
    top: 30%;
  }
  position: absolute;
  top: 45%;
  width: 100%;
  height: 100%;
  z-index: 0;
`;
