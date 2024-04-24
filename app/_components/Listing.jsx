import { Bath, BedDouble, MapPin, RotateCw, Ruler, Search } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import GoogleAddressSearch from "./GoogleAddressSearch";
import { Button } from "@/components/ui/button";
import FilterSection from "./FilterSection";
import Link from "next/link";

const Listing = ({
  listing,
  handleSearchButton,
  setSearchedAddress,
  setCoordinates,
  setBathroom,
  setBedroom,
  setParking,
  setPropertyType,
}) => {
  const [address, setAddress] = useState("");
  return (
    <div>
      <div className="flex flex-col gap-4 mb-10">
        <div className="flex gap-2 items-center">
          <GoogleAddressSearch
            setCoordinates={(v) => setCoordinates(v)}
            setSelectedAddress={(v) => {
              setSearchedAddress(v);
              setAddress(v);
            }}
          />
          <Button
            className="flex gap-3 p-4 border border-primary"
            onClick={handleSearchButton}
          >
            <Search /> Search
          </Button>
        </div>
        {address && (
          <div className="flex gap-2 items-center">
            <h2 className="text-xl font-bold">Search Results for:</h2>
            <h2 className="text-xl font-bold text-primary">{address.label}</h2>
          </div>
        )}
        <FilterSection
          setBedroom={setBedroom}
          setBathroom={setBathroom}
          setParking={setParking}
          setPropertyType={setPropertyType}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {listing.length > 0
          ? listing.map((item, index) => (
              <Link href={`/view-listing/${item.id}`} key={index}>
                <div className="p-3 hover:border hover:border-primary rounded-md h-50 flex flex-col justify-between md:h-[320px]">
                  <Image
                    src={
                      item.listingImages[0]
                        ? item.listingImages[0]?.url
                        : "/placeholder.webp"
                    }
                    alt={item.title}
                    width={800}
                    height={150}
                    className="rounded-lg object-cover h-[150px] w-[800px]"
                  />
                  <div className="flex flex-col mt-2 gap-2">
                    <h2 className="font-bold text-xl">${item?.price}</h2>
                    <h2 className="flex gap-1 text-sm text-gray-400">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{item.address}</span>
                    </h2>
                    <div className="flex gap-2 mt-2 justify-between">
                      <h2 className="flex text-sm bg-slate-200 rounded-md p-2 gap-2 justify-center items-center w-full">
                        <BedDouble className="h-4 w-4" />
                        <span>{item?.bedroom}</span>
                      </h2>
                      <h2 className="flex text-sm bg-slate-200 rounded-md p-2 gap-2 justify-center items-center w-full">
                        <Bath className="h-4 w-4" />
                        <span>{item?.bathroom}</span>
                      </h2>
                      <h2 className="flex text-sm bg-slate-200 rounded-md p-2 gap-2 justify-center items-center w-full">
                        <Ruler className="h-4 w-4" />
                        <span>{item?.area}</span>
                      </h2>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          : [1, 2, 3, 4, 5].map((item, index) => (
              <div
                key={index}
                className="p-3 rounded-md h-50 max-w-[320px] flex flex-col justify-between animate-pulse"
              >
                <div className="bg-gray-300 h-[150px] w-[320px] rounded-lg"></div>
                <div className="flex flex-col mt-2 gap-2">
                  <div className="bg-gray-300 h-6 w-24 rounded-md"></div>
                  <div className="flex gap-2 mt-2 justify-between">
                    <div className="flex bg-gray-300 rounded-md p-2 gap-2 justify-center items-center w-full">
                      <div className="h-4 w-4 bg-gray-400 rounded-md"></div>
                      <div className="bg-gray-400 h-4 w-16 rounded-md"></div>
                    </div>
                    <div className="flex bg-gray-300 rounded-md p-2 gap-2 justify-center items-center w-full">
                      <div className="h-4 w-4 bg-gray-400 rounded-md"></div>
                      <div className="bg-gray-400 h-4 w-16 rounded-md"></div>
                    </div>
                    <div className="flex bg-gray-300 rounded-md p-2 gap-2 justify-center items-center w-full">
                      <div className="h-4 w-4 bg-gray-400 rounded-md"></div>
                      <div className="bg-gray-400 h-4 w-16 rounded-md"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Listing;
