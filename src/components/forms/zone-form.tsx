"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Loader from "@/components/loader";
import { ZoneFormValues, ZoneSchema } from "@/validations/zone";
import TextInput from "./fields/text-input";
import { useAppSelector } from "@/lib/store/hooks";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { throttle } from "lodash";
const PolygonSearchMap = dynamic(() => import("../polygon-search-map"), {
  ssr: false,
});
const ZoneForm = ({ id }: { id?: string }) => {
  const zones = useAppSelector((state: any) => state.zones) || [];
  const zone = zones?.find((zone: any) => zone._id === id);
  const [latLng, setLatLng] = useState<{ lat: number; lng: number }[][]>(
    zone?.latLng || []
  );

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
    setValue,
  } = useForm<ZoneFormValues>({
    resolver: zodResolver(ZoneSchema),
    defaultValues: {
      name: zone?.name || "",
      currency: zone?.currency || "",
      // latLng: zone?.latLng || [],
    },
  });

  const onSubmit = async (data: Omit<ZoneFormValues, "latLng">) => {
    const finalData: ZoneFormValues = {
      ...data,
      latLng, // manually append polygon
    };

    console.log("Submitting Final Data:", {
      ...finalData,
      latLngSummary: `${latLng.length} shapes, ~${
        latLng[0]?.length ?? 0
      } points`,
    });

    if (id) {
      console.log("Update Zone Data:", finalData);
    } else {
      console.log("Create Zone Data:", finalData);
    }

    reset(); // resets name and currency, but not polygon anymore
    setLatLng([]); // manually clear polygon if needed
  };

  const throttledUpdateLatLng = useMemo(
    () =>
      throttle((latLngs: { lat: number; lng: number }[][]) => {
        setLatLng(latLngs);
      }, 500),
    []
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <TextInput
          control={control}
          name="name"
          label="Zone Name"
          placeholder="e.g. Gulf Zone"
        />
        <TextInput
          control={control}
          name="currency"
          label="Currency"
          placeholder="e.g. AED"
        />
      </div>

      <PolygonSearchMap
        onUserPolygonDrawn={(latLng) => {
          throttledUpdateLatLng(latLng);
        }}
      />

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
