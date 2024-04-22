"use client";
import { UserButton, UserProfile } from "@clerk/nextjs";
import { Building2Icon } from "lucide-react";
import React from "react";
import UserListing from "./_components/UserListing";

const User = () => {
  return (
    <div className="my-6 md:px-10 lg:px-32">
      <h2
        className="
        text-3xl
        font-extrabold
        text-gray-800
        my-5
      
      "
      >
        User Profile
      </h2>
      <UserProfile>
        <UserButton.UserProfilePage
          label="My Listings"
          labelIcon={<Building2Icon className="h-6 w-6" />}
          url="my-listing"
        >
          <UserListing />
        </UserButton.UserProfilePage>
      </UserProfile>
    </div>
  );
};

export default User;
