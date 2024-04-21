import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bath, BedDouble, CarFront, Home } from "lucide-react";

const FilterSection = ({
  setBedroom,
  setBathroom,
  setParking,
  setPropertyType,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div>
        <Select onValueChange={setBedroom}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Bed" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2">
              <h2 className="flex gap-3 font-semibold items-center justify-center">
                <BedDouble className="text-primary" /> 2+
              </h2>
            </SelectItem>
            <SelectItem value="3">
              <h2 className="flex gap-3 font-semibold items-center justify-center">
                <BedDouble className="text-primary" /> 3+
              </h2>
            </SelectItem>
            <SelectItem value="4">
              <h2 className="flex gap-3 font-semibold items-center justify-center">
                <BedDouble className="text-primary" /> 4+
              </h2>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Select onValueChange={setBathroom}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Bathroom" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2">
              <h2 className="flex gap-3 font-semibold items-center justify-center">
                <Bath className="text-primary" /> 2+
              </h2>
            </SelectItem>
            <SelectItem value="3">
              <h2 className="flex gap-3 font-semibold items-center justify-center">
                <Bath className="text-primary" /> 3+
              </h2>
            </SelectItem>
            <SelectItem value="4">
              <h2 className="flex gap-3 font-semibold items-center justify-center">
                <Bath className="text-primary" /> 4+
              </h2>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Select onValueChange={setParking}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Parking" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2">
              <h2 className="flex gap-3 font-semibold items-center justify-center">
                <CarFront className="text-primary" /> 2+
              </h2>
            </SelectItem>
            <SelectItem value="3">
              <h2 className="flex gap-3 font-semibold items-center justify-center">
                <CarFront className="text-primary" /> 3+
              </h2>
            </SelectItem>
            <SelectItem value="4">
              <h2 className="flex gap-3 font-semibold items-center justify-center">
                <CarFront className="text-primary" /> 4+
              </h2>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Select onValueChange={setPropertyType}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Property Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="single-family-house">
              <h2 className="flex gap-3 font-semibold items-center justify-center">
                <Home className="text-primary" /> Single Family House
              </h2>
            </SelectItem>
            <SelectItem value="town-house">
              <h2 className="flex gap-3 font-semibold items-center justify-center">
                <Home className="text-primary" /> Town House
              </h2>
            </SelectItem>
            <SelectItem value="condo">
              <h2 className="flex gap-3 font-semibold items-center justify-center">
                <Home className="text-primary" /> Condo
              </h2>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterSection;
