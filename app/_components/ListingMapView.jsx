"use client";
import React, { useEffect, useState } from "react";
import Listing from "./Listing";
import { supabase } from "@/utils/supabase/client";
import { toast } from "sonner";
import GoogleMapSection from "./GoogleMapSection";

const ListingMapView = ({ type }) => {
  const [listing, setListing] = useState([]);
  const [searchedAddress, setSearchedAddress] = useState({});
  const [bedroom, setBedroom] = useState("");
  const [bathroom, setBathroom] = useState("");
  const [parking, setParking] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [coordinates, setCoordinates] = useState({});

  useEffect(() => {
    fetchListings();
  }, []);

  const resetFilter = () => {
    setSearchedAddress("");
    setBedroom("");
    setBathroom("");
    setParking("");
    setPropertyType("");
  };

  const handleSearchButton = async () => {
    console.log(bathroom, bedroom, parking, propertyType);
    const searchTerm = searchedAddress?.value?.structured_formatting?.main_text;
    let query = supabase
      .from("listing")
      .select("*, listingImages( url, listing_id)")
      .eq("active", true)
      .eq("type", type)
      .order("created_at", { ascending: false });

    if (searchTerm) {
      query = query.like("address", `%${searchTerm}%`);
    }

    if (bedroom) {
      query = query.eq("bedroom", bedroom);
    }

    if (bathroom) {
      query = query.eq("bathroom", bathroom);
    }

    if (parking) {
      query = query.eq("parking", parking);
    }

    if (propertyType) {
      query = query.eq("propertyType", propertyType);
    }

    const { data, error } = await query;

    if (error) {
      toast.error("An error occurred while fetching listings");
    }

    if (data) {
      setListing(data);
    }
  };

  const fetchListings = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*, listingImages( url, listing_id)")
      .eq("active", true)
      .eq("type", type)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("An error occurred while fetching listings");
    }

    if (data) {
      setListing(data);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div>
        <Listing
          listing={listing}
          handleSearchButton={handleSearchButton}
          setSearchedAddress={setSearchedAddress}
          setBathroom={setBathroom}
          setBedroom={setBedroom}
          setParking={setParking}
          setPropertyType={setPropertyType}
          resetFilter={resetFilter}
          setCoordinates={setCoordinates}
        />
      </div>
      <div className="md:fixed md:right-10 md:w-[320px] lg:w-[450px] xl:w-[700px] sm:max-h-fit">
        <GoogleMapSection coordinates={coordinates} listing={listing} />
      </div>
    </div>
  );
};

export default ListingMapView;
