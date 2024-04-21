"use client";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Formik } from "formik";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { supabase } from "@/utils/supabase/client";
import { useUser } from "@clerk/nextjs";
import FileUpload from "../_components/FileUpload";
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

const EditListing = () => {
  const { listingId } = useParams();
  const { isSignedIn, user, isLoaded } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [listing, setListing] = useState();
  const [images, setImages] = useState([]);

  useEffect(() => {
    console.log(listingId);
    if (user && isLoaded) {
      verifyUser();
    }
  }, [isLoaded]);

  const fetchListing = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*, listingImages(listing_id, url)")
      .eq("id", listingId);

    if (error) {
      toast.error("Error Fetching Listing");
    }

    if (data) {
      console.log(data[0]);
      setListing(data[0]);
    }
  };

  const uploadImages = async () => {
    let index = 0;
    for (const image of images) {
      const file = image;
      const fileExt = file.name.split(".").pop();
      const fileName = `${
        file.name.split(".")[0]
      }-${Date.now().toString()}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from("listingImages")
        .upload(`${fileName}`, file, {
          contentType: `image/${fileExt}`,
          upsert: false,
        });

      if (error) {
        toast.error("Error Uploading Images");
        setLoading(false);
      }

      if (data) {
        toast.success(
          "Image Uploaded Successfully " + (index + 1 + "/" + images.length)
        );
        const imageUrl =
          process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL + fileName;

        const { data, error } = await supabase
          .from("listingImages")
          .insert([{ url: imageUrl, listing_id: listingId }])
          .select();
      }
      index++;
    }
  };

  const onSubmitHandler = async (values) => {
    setLoading(true);

    const { data, error } = await supabase
      .from("listing")
      .update(values)
      .eq("id", listingId)
      .select();

    if (error) {
      toast.error("Error Updating Listing");
      setLoading(false);
    }
    if (data) {
      toast.success("Listing Updated Successfully and Published");
      uploadImages();
      setLoading(false);
    }
  };

  const publichHandler = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("listing")
      .update({ active: true })
      .eq("id", listingId)
      .select();

    if (error) {
      toast.error("Error Publishing Listing");
      setLoading(false);
    }

    if (data) {
      toast.success("Listing Published Successfully");
      setLoading(false);
    }
  };

  const verifyUser = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*")
      .eq("createdBy", user?.primaryEmailAddress.emailAddress)
      .eq("id", listingId);

    if (data?.length < 0) {
      toast.error("You are not authorized to edit this listing");
      router.push("/");
    }

    fetchListing();
  };

  return (
    <div className="px-10 md:px-36 my-10">
      <h2 className="font-bold text-2xl">
        Enter some more details about the listing
      </h2>
      <Formik
        onSubmit={(values) => {
          onSubmitHandler(values);
        }}
        initialValues={{
          type: "",
          propertyType: "",
          profileImage: user?.imageUrl,
          fullName: user?.fullName,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.type) {
            errors.type = "Required";
          }
          if (!values.propertyType) {
            errors.propertyType = "Required";
          }
          if (!values.bedroom) {
            errors.bedroom = "Required";
          }
          if (!values.bathroom) {
            errors.bathroom = "Required";
          }
          if (!values.builtIn) {
            errors.builtIn = "Required";
          }
          if (!values.parking) {
            errors.parking = "Required";
          }
          if (!values.lotSize) {
            errors.lotSize = "Required";
          }
          if (!values.area) {
            errors.area = "Required";
          }
          if (!values.price) {
            errors.price = "Required";
          }
          if (!values.hoa) {
            errors.hoa = "Required";
          }
          if (!values.description) {
            errors.description = "Required";
          }
          return errors;
        }}
      >
        {({ values, handleChange, handleSubmit, isSubmitting, errors }) => (
          <form onSubmit={handleSubmit}>
            <div className="p-8 rounded-lg shadow-md mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 mb-9">
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold text-slate-500">
                    Rent or Sell?
                  </h2>
                  <RadioGroup
                    defaultValue={listing?.type}
                    name="type"
                    onValueChange={(value) => {
                      handleChange({ target: { name: "type", value } });
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="rent" id="rent" />
                      <Label htmlFor="rent">Rent</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sell" id="sell" />
                      <Label htmlFor="sell">Sell</Label>
                    </div>
                  </RadioGroup>
                  {errors.type && <p className="text-red-500">{errors.type}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold text-slate-500">
                    Property Type
                  </h2>
                  <Select
                    name="propertyType"
                    onChange={handleChange}
                    onValueChange={(value) => {
                      console.log(value);
                      handleChange({ target: { name: "propertyType", value } });
                    }}
                    defaultValue={listing?.propertyType}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Property Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single-family-house">
                        Single Family House
                      </SelectItem>
                      <SelectItem value="town-house">Town House</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.propertyType && (
                    <p className="text-red-500">{errors.propertyType}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 mb-9">
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold text-slate-500">Bedroom</h2>
                  <Input
                    type="number"
                    placeholder="Ex. 2"
                    name="bedroom"
                    onChange={handleChange}
                    defaultValue={listing?.bedroom}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold text-slate-500">Bathroom</h2>
                  <Input
                    type="number"
                    placeholder="Ex. 2"
                    name="bathroom"
                    onChange={handleChange}
                    defaultValue={listing?.bathroom}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold text-slate-500">Built In</h2>
                  <Input
                    type="number"
                    placeholder="Ex. 1900 Sq.ft"
                    name="builtIn"
                    onChange={handleChange}
                    defaultValue={listing?.builtIn}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 mb-9">
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold text-slate-500">Parking</h2>
                  <Input
                    type="number"
                    placeholder="Ex. 2"
                    name="parking"
                    onChange={handleChange}
                    defaultValue={listing?.parking}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold text-slate-500">
                    Lot Size (Sq.Ft)
                  </h2>
                  <Input
                    type="number"
                    placeholder="Ex. 2"
                    name="lotSize"
                    onChange={handleChange}
                    defaultValue={listing?.lotSize}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold text-slate-500">Area (Sq.Ft)</h2>
                  <Input
                    type="number"
                    placeholder="Ex. 1900 Sq.ft"
                    name="area"
                    onChange={handleChange}
                    defaultValue={listing?.area}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 mb-9">
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold text-slate-500">
                    Selling Price ($)
                  </h2>
                  <Input
                    type="number"
                    placeholder="400000"
                    name="price"
                    onChange={handleChange}
                    defaultValue={listing?.price}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold text-slate-500">
                    HOA (Per Month) ($)
                  </h2>
                  <Input
                    type="number"
                    placeholder="100"
                    name="hoa"
                    onChange={handleChange}
                    defaultValue={listing?.hoa}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-9 mb-9">
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold text-slate-500">Description</h2>
                  <Textarea
                    placeholder=""
                    name="description"
                    onChange={handleChange}
                    defaultValue={listing?.description}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 mb-9">
                <h2 className="font-semibold text-slate-500">
                  Upload Property Imagess
                </h2>

                <FileUpload
                  setImages={(images) => setImages(images)}
                  listingImages={listing?.listingImages}
                />
              </div>
              <div className="flex gap-5 justify-end">
                {!loading && (
                  <Button
                    type="submit"
                    variant="outline"
                    className="text-primary"
                    onClick={() => {
                      console.log("Save");
                    }}
                  >
                    Save
                  </Button>
                )}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      disabled={loading}
                      type="button"
                      onClick={() => {
                        console.log("Save & Publish");
                      }}
                    >
                      {loading ? (
                        <Loader className="mx-auto animate-spin" />
                      ) : (
                        "Publish"
                      )}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Ready to Publish your listing?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        By clicking continue, your listing will be published and
                        visible to everyone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      {loading ? (
                        ""
                      ) : (
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                      )}

                      <AlertDialogAction onClick={publichHandler}>
                        {loading ? (
                          <Loader className="mx-auto animate-spin" />
                        ) : (
                          "Continue"
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default EditListing;
