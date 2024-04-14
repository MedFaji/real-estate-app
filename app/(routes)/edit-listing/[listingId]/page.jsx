"use client";
import React, { use, useEffect, useState } from "react";
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

const EditListing = () => {
  const { listingId } = useParams();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [listing, setListing] = useState();

  useEffect(() => {
    console.log(listingId);
    console.log("Haha");
    verifyUser();
  }, []);

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
      toast.success("Listing Updated Successfully");
      setLoading(false);
    }
  };

  const verifyUser = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*")
      .eq("createdBy", user?.primaryEmailAddress.emailAddress)
      .eq("id", listingId);

    if (data) {
      setListing(data[0]);
      console.log(data[0]);
    }

    if (data.length <= 0) {
      console.log(data[0]);
      router.replace("/");
    }
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
        {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
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
                  {errors.type && (
                    <p className="text-red-500 text-sm">{errors.type}</p>
                  )}
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
                  {errors.bathroom && (
                    <p className="text-red-500 text-sm">{errors.bathroom}</p>
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
                    defaultValue={listing?.bedroom}
                    onChange={handleChange}
                  />
                  {errors.bedroom && (
                    <p className="text-red-500 text-sm">{errors.bedroom}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold text-slate-500">Bathroom</h2>
                  <Input
                    type="number"
                    placeholder="Ex. 2"
                    name="bathroom"
                    onChange={handleChange}
                  />
                  {errors.bathroom && (
                    <p className="text-red-500 text-sm">{errors.bathroom}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold text-slate-500">Built In</h2>
                  <Input
                    type="number"
                    placeholder="Ex. 1900 Sq.ft"
                    name="builtIn"
                    onChange={handleChange}
                  />
                  {errors.builtIn && (
                    <p className="text-red-500 text-sm">{errors.builtIn}</p>
                  )}
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
                  {errors.parking && (
                    <p className="text-red-500 text-sm">{errors.parking}</p>
                  )}
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
                  {errors.lotSize && (
                    <p className="text-red-500 text-sm">{errors.lotSize}</p>
                  )}
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
                  {errors.area && (
                    <p className="text-red-500 text-sm">{errors.area}</p>
                  )}
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
                  {errors.price && (
                    <p className="text-red-500 text-sm">{errors.price}</p>
                  )}
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
                  {errors.hoa && (
                    <p className="text-red-500 text-sm">{errors.hoa}</p>
                  )}
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
                  {errors.description && (
                    <p className="text-red-500 text-sm">{errors.description}</p>
                  )}
                </div>
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
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  onClick={() => {
                    console.log("Save & Publish");
                  }}
                >
                  {loading ? (
                    <Loader className="mx-auto animate-spin" />
                  ) : (
                    "Save & Publish"
                  )}
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default EditListing;
