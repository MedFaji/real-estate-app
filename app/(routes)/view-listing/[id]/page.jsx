"use client";
import { supabase } from "@/utils/supabase/client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Slider from "../_components/Slider";
import Details from "../_components/Details";
import AgentDetails from "../_components/AgentDetails";

const ViewListing = () => {
  const { id } = useParams();
  const [listing, setListing] = useState([]);

  const getListing = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*, listingImages(url, listing_id)")
      .eq("id", id)
      .eq("active", true)
      .single();
    if (error) {
      toast.error("Error fetching listing");
    }
    if (data) {
      setListing(data);
    }
  };

  useEffect(() => {
    getListing();
  }, [id]);

  return (
    <div className="px-4 md:px-32 lg:px-56 my-5">
      <Slider images={listing?.listingImages} />
      <Details listing={listing} />
    </div>
  );
};

export default ViewListing;
