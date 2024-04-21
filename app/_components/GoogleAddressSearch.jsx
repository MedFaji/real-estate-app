"use client";
import { MapPin } from "lucide-react";
import React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";

const GoogleAddressSearch = ({ setSelectedAddress, setCoordinates }) => {
  return (
    <div className="flex items-center w-full border rounded-md">
      <MapPin
        size={10}
        className="p-2 h-10 w-10 rounded-l-md text-primary bg-purple-200"
      />
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        selectProps={{
          placeholder: "Address...",
          label: "Search Property Address",
          isClearable: true,
          className: "w-full",
          onChange: (address) => {
            if (address) {
              setSelectedAddress(address);
              geocodeByAddress(address.label)
                .then((results) => getLatLng(results[0]))
                .then(({ lat, lng }) => setCoordinates({ lat, lng }));
            }
          },
          styles: {
            control: (provided) => ({
              ...provided,
              border: "none",
              boxShadow: "none",
            }),
            menu: (provided) => ({ ...provided, zIndex: 9999 }),
          },
        }}
      />
    </div>
  );
};

export default GoogleAddressSearch;
