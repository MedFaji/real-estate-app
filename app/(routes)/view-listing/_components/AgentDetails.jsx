import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const AgentDetails = ({ listing }) => {
  return (
    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-5 items-center justify-between p-5 rounded-lg shadow-md border">
      <div className="w-20 h-20 flex gap-4 items-center ">
        <Image
          width={60}
          height={60}
          src={
            listing?.profileImage ? listing?.profileImage : "/placeholder.webp"
          }
          alt="profileImage"
          className="rounded-full"
        />
        <div className="flex flex-col">
          <h1 className="text-lg font-bold">{listing?.fullName}</h1>
          <h1>{listing?.createdBy}</h1>
        </div>
      </div>

      <div className="text-right">
        <Button>Send Message</Button>
      </div>
    </div>
  );
};

export default AgentDetails;
