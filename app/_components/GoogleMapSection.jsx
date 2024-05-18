import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import MarkerItem from "./MarkerItem";

const containerStyle = {
  width: "90%",
  maxWidth: "90%",
  height: "80vh",
  borderRadius: "20px",
};

const center = {
  lat: 31.794525,
  lng: -7.0849336,
};

const GoogleMapSection = ({ coordinates, listing }) => {
  const [center, setCenter] = useState({ lat: 33.57, lng: -7.67 });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  useEffect(() => {
    if (coordinates?.lat && coordinates?.lng) {
      setCenter({ lat: coordinates.lat, lng: coordinates.lng });
    }
  }, [coordinates]);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      gestureHandling="greedy"
    >
      {listing.map((item, index) => (
        <MarkerItem key={index} item={item} />
      ))}
    </GoogleMap>
  );
};

export default GoogleMapSection;
