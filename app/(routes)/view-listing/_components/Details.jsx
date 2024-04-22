import GoogleMapSection from "@/app/_components/GoogleMapSection";
import { Button } from "@/components/ui/button";
import {
  Bath,
  Bed,
  CarFront,
  Home,
  LucideBuilding,
  MapPinIcon,
  MapPinnedIcon,
  Share,
} from "lucide-react";
import React from "react";
import AgentDetails from "./AgentDetails";

const Details = ({ listing }) => {
  return (
    <div className="my-10">
      {listing ? (
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-extrabold">$ {listing?.price}</h1>
              <p className="text-lg flex gap-2 text-gray-600 items-center">
                <MapPinIcon className="h-4 w-4" /> {listing.address}
              </p>
            </div>
            <Button className="flex gap-2 p-5">
              <Share /> Share
            </Button>
          </div>
          <hr />
          <div className="mt-2 ">
            <h1 className="text-2xl font-bold my-5">Key Features</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-5">
              <div className="bg-purple-100 p-5 rounded-xl">
                <p className=" text-purple-700 font-medium flex gap-2 items-center justify-center">
                  <Home className="h-6 w-6" /> {listing.propertyType}
                </p>
              </div>
              <div className="bg-purple-100 p-5 rounded-xl">
                <p className=" text-purple-700 font-medium  flex gap-2 items-center justify-center">
                  <LucideBuilding className="h-6 w-6" /> Built In{" "}
                  {listing.builtIn}
                </p>
              </div>
              <div className="bg-purple-100 p-5 rounded-xl">
                <p className=" text-purple-700 font-medium  flex gap-2 items-center justify-center">
                  <MapPinnedIcon className="h-6 w-6" /> {listing.area}
                </p>
              </div>
              <div className="bg-purple-100 p-5 rounded-xl">
                <p className=" text-purple-700 font-medium  flex gap-2 items-center justify-center">
                  <Bed className="h-6 w-6" /> {listing.bedroom} Bed(s)
                </p>
              </div>
              <div className="bg-purple-100 p-5 rounded-xl">
                <p className=" text-purple-700 font-medium  flex gap-2 items-center justify-center">
                  <Bath className="h-6 w-6" /> {listing.bathroom} Bath(s)
                </p>
              </div>
              <div className="bg-purple-100 p-5 rounded-xl">
                <p className=" text-purple-700 font-medium  flex gap-2 items-center justify-center">
                  <CarFront className="h-6 w-6" /> {listing.parking} Parking(s)
                </p>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <h1 className="text-2xl font-bold my-5">What's Special</h1>
            <p className="text-lg">{listing.description}</p>
          </div>
          <div className="mt-2">
            <h1 className="text-2xl font-bold my-5">Location</h1>
            <GoogleMapSection
              listing={[listing]}
              coordinates={listing.coordinates}
            />
          </div>
          <div className="mt-2">
            <h1 className="text-2xl font-bold my-5">Agent Details</h1>
            <AgentDetails listing={listing} />
          </div>
        </div>
      ) : (
        <div className="w-full h-[400px] bg-gray-300 rounded-lg animate-pulse"></div>
      )}
    </div>
  );
};

export default Details;
