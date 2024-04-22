import { Button } from "@/components/ui/button";
import { Bath, BedDouble, CircleX, MapPin, Ruler } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MarkerListing = ({ item, close }) => {
  return (
    <div className="p-2 rounded-md flex flex-col justify-between bg-white w-[220px] ">
      <div className="mb-2 flex justify-end">
        <CircleX className="w-6 h-6 text-primary " onClick={close} />
      </div>
      <Image
        src={item.listingImages[0]?.url}
        alt={item.title}
        width={800}
        height={150}
        className="rounded-lg object-cover h-[120px] w-[200px]"
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
        <Link href={`/view-listing/${item.id}`}>
          <Button className="w-full mt-2">View Details</Button>
        </Link>
      </div>
    </div>
  );
};

export default MarkerListing;
