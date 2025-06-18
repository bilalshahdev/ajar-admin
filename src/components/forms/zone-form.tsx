"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Loader from "@/components/loader";
import { ZoneFormValues, ZoneSchema } from "@/validations/zone";
import TextInput from "./fields/text-input";
import { useAppSelector } from "@/lib/store/hooks";

const ZoneForm = ({ id }: { id?: string }) => {
  const zones = useAppSelector((state: any) => state.zones) || [];
  const zone = zones?.find((zone: any) => zone._id === id);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<ZoneFormValues>({
    resolver: zodResolver(ZoneSchema),
    defaultValues: {
      name: zone?.name || "",
      country: zone?.country || "",
      currency: zone?.currency || "",
      timeZone: zone?.timeZone || "",
      language: zone?.language || "",
      radius: zone?.radius || 5,
      lat: zone?.latlong[0] || 0,
      long: zone?.latlong[1] || 0,
      thumbnail: zone?.thumbnail || "",
      adminNotes: zone?.adminNotes || "",
    },
  });

  const onSubmit = async (data: ZoneFormValues) => {
    if (id) {
      console.log("Update Zone Data: ", data);
    } else {
      console.log("Create Zone Data: ", data);
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextInput
          control={control}
          name="name"
          label="Zone Name"
          placeholder="e.g. Gulf Zone"
        />
        <TextInput
          control={control}
          name="country"
          label="Country"
          placeholder="e.g. UAE"
        />
        <TextInput
          control={control}
          name="currency"
          label="Currency"
          placeholder="e.g. AED"
        />
        <TextInput
          control={control}
          name="timeZone"
          label="Time Zone"
          placeholder="e.g. Asia/Dubai"
        />
        <TextInput
          control={control}
          name="language"
          label="Language"
          placeholder="e.g. Arabic"
        />
        <TextInput
          control={control}
          name="radius"
          label="Radius (km)"
          type="number"
          placeholder="50"
        />
        <TextInput
          control={control}
          name="lat"
          label="Latitude"
          type="number"
          placeholder="25.2"
        />
        <TextInput
          control={control}
          name="long"
          label="Longitude"
          type="number"
          placeholder="55.3"
        />
        <TextInput
          control={control}
          name="thumbnail"
          label="Thumbnail URL"
          placeholder="https://..."
        />
        <TextInput
          control={control}
          name="adminNotes"
          label="Admin Notes"
          placeholder="Internal notes..."
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
        variant={"button"}
      >
        {isSubmitting ? <Loader /> : id ? "Update Zone" : "Create Zone"}
      </Button>
    </form>
  );
};

export default ZoneForm;
