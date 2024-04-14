"use client";
import GoogleAddressSearch from "@/app/_components/GoogleAddressSearch";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/client";
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const AddNewListing = () => {
  const [selectedAddress, setSelectedAddress] = useState();
  const [coordinates, setCoordinates] = useState();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const nextHandler = async () => {
    setLoading(true);
    console.log(selectedAddress, coordinates);
    const { data, error } = await supabase
      .from("listing")
      .insert([
        {
          address: selectedAddress.label,
          coordinates: coordinates,
          createdBy: user?.primaryEmailAddress.emailAddress,
        },
      ])
      .select();

    if (error) {
      toast.error("Error Adding Listing");
      setLoading(false);
      setCoordinates(null);
      setSelectedAddress(null);
    }
    if (data) {
      toast.success("Listing Added Successfully");
      setLoading(false);
      setCoordinates(null);
      setSelectedAddress(null);
      router.replace(`/edit-listing/${data[0].id}`);
    }
  };

  return (
    <div className="pt-24 mx-6 md:mx-40 lg:mx-80">
      <div className="flex flex-col gap-8 items-center justify-center">
        <h2 className="font-bold text-2xl">Add New Listing</h2>
        <div className="p-10 w-full rounded-lg border shadow-md flex flex-col gap-5">
          <h2 className="text-gray-600">
            Enter Address which you want to list
          </h2>
          <GoogleAddressSearch
            setSelectedAddress={setSelectedAddress}
            setCoordinates={setCoordinates}
          />
          {loading ? (
            <Button
              onClick={nextHandler}
              disabled={!selectedAddress || !coordinates}
            >
              <Loader className="mx-auto animate-spin" />
            </Button>
          ) : (
            <Button
              onClick={nextHandler}
              disabled={!selectedAddress || !coordinates}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddNewListing;
