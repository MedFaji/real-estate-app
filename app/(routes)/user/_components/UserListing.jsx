import { supabase } from "@/utils/supabase/client";
import { useUser } from "@clerk/nextjs";
import { Edit, MapPin, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const UserListing = () => {
  const { user } = useUser();
  const [userListings, setUserListings] = React.useState([]);

  const getUserListings = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*, listingImages(url, listing_id)")
      .eq("createdBy", user?.primaryEmailAddress.emailAddress);

    if (error) {
      toast.error("Error fetching user listings");
    }

    if (data) {
      console.log(data);
      setUserListings(data);
    }
  };

  const deleteListingImages = async (listingId) => {
    const { data: images, error: fetchError } = await supabase
      .from("listingImages")
      .select()
      .eq("listing_id", listingId);

    if (fetchError) {
      toast.error("Error fetching listing images");
      return;
    }

    if (images && images.length > 0) {
      const { error: deleteError } = await supabase
        .from("listingImages")
        .delete()
        .eq("listing_id", listingId);

      if (deleteError) {
        toast.error("Error deleting listing images");
        return;
      }
      toast.success("Listing images deleted successfully");
    }
  };

  const deleteListing = async (id) => {
    await deleteListingImages(id);

    const { error: deleteError } = await supabase
      .from("listing")
      .delete()
      .eq("id", id);

    if (deleteError) {
      toast.error("Error deleting listing");
      return;
    }

    toast.success("Listing deleted successfully");
    getUserListings();
  };

  useEffect(() => {
    user && getUserListings();
  }, [user]);

  return (
    <div>
      <h2
        className="text-xl
    font-bold
    text-gray-800
    "
      >
        Manage your listings
      </h2>
      {userListings.map((listing) => (
        <div key={listing.id}>
          <div className="flex gap-4 my-6 ">
            <Link href={`/view-listing/${listing.id}`}>
              <Image
                width={100}
                height={100}
                src={
                  listing.listingImages[0]
                    ? listing.listingImages[0]?.url
                    : "/placeholder.webp"
                }
                alt={"Image"}
                className="w-24 h-24 object-cover rounded-md hover:border hover:p-2 ease-in-out transition-all duration-300"
              />
            </Link>

            <div>
              <h2 className="text-gray-400 flex gap-3 items-center">
                <MapPin className="w-4 h-4 text-primary" />
                {listing.address}
              </h2>
              <h2 className="text-gray-400">$ {listing?.price}</h2>
              <div className="flex gap-4 mt-3">
                <Link href={`/edit-listing/${listing.id}`}>
                  <button className="text-sm text-blue-500 flex items-center gap-2">
                    <Edit /> Edit
                  </button>
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="text-sm text-red-500  flex items-center gap-2">
                      <Trash /> Delete
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to delete this listing?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteListing(listing.id)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <div
                  className={`${
                    listing.active ? "bg-blue-500" : "bg-yellow-500"
                  } text-white px-2 py-1 rounded-md`}
                >
                  {listing.active ? "Active" : "Inactive"}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserListing;
