"use client";
import { MarkerF, OverlayView } from "@react-google-maps/api";
import React, { useState } from "react";
import MarkerListing from "./MarkerListing";

const MarkerItem = ({ item }) => {
  const [selectedListing, setSelectedListing] = useState(null);

  const close = () => setSelectedListing(null);
  return (
    <div>
      <MarkerF
        position={item.coordinates}
        onClick={() => {
          if (selectedListing === item) {
            setSelectedListing(null);
          } else {
            setSelectedListing(null);
            setSelectedListing(item);
          }
        }}
        icon={{
          url: "/pin.png",
          scaledSize: {
            width: 40,
            height: 40,
          },
        }}
      >
        {selectedListing && (
          <OverlayView
            position={selectedListing.coordinates}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <MarkerListing item={selectedListing} close={close} />
          </OverlayView>
        )}
      </MarkerF>
    </div>
  );
};

export default MarkerItem;
