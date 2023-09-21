import { MapContainer, TileLayer, Marker } from "react-leaflet";
import styled from "styled-components";
import "leaflet/dist/leaflet.css";
import PropTypes from "prop-types";

const Map = ({ location }) => {
  return (
    <StyledMapContainer
      center={location}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}></Marker>
    </StyledMapContainer>
  );
};

Map.propTypes = {
  location: PropTypes.arrayOf(PropTypes.number),
};

export default Map;

const StyledMapContainer = styled(MapContainer)`
  position: absolute;
  top: 45%;
  width: 100%;
  height: max-content;
`;
