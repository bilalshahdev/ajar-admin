"use client";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { useAddZone, useGetZone, useUpdateZone } from "@/hooks/useZones";
import { ZoneFormValues, ZoneSchema } from "@/validations/zone";
import { zodResolver } from "@hookform/resolvers/zod";
import { throttle } from "lodash";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { PolygonSearchMapRef } from "../PolygonSearchMap";
import TextInput from "./fields/TextInput";
import SelectInput from "./fields/SelectInput";
import { currencies } from "@/config/data";

const PolygonSearchMap = dynamic(() => import("../PolygonSearchMap"), {
  ssr: false,
});

const ZoneForm = ({
  id,
  closeDialog,
}: {
  id?: string;
  closeDialog?: () => void;
}) => {
  const isEditMode = Boolean(id);

  const { data, isLoading } = useGetZone(id as string, isEditMode);
  const zone = data?.data;

  const [polygons, setPolygons] = useState<{ lat: number; lng: number }[][]>(
    zone?.polygons || []
  );

  const mapRef = useRef<PolygonSearchMapRef>(null);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors, isSubmitted },
    reset,
    setValue,
  } = useForm<ZoneFormValues>({
    resolver: zodResolver(ZoneSchema),
    defaultValues: {
      name: "",
      currency: "",
      polygons: [],
    },
  });

  // Populate form on edit
  useEffect(() => {
    if (zone) {
      reset({
        name: zone.name,
        currency: zone.currency,
        polygons: zone.polygons,
      });
      setPolygons(zone.polygons || []);
    }
  }, [zone, reset]);

  // Sync polygons with form
  useEffect(() => {
    setValue("polygons", polygons);
  }, [polygons, setValue]);

  const addZoneMutation = useAddZone();
  const updateZoneMutation = useUpdateZone();

  const onSubmit = async (data: ZoneFormValues) => {
    const finalData: ZoneFormValues = {
      ...data,
      polygons,
    };

    try {
      if (id) {
        await updateZoneMutation.mutateAsync({ id, data: finalData });
      } else {
        await addZoneMutation.mutateAsync(finalData);
      }

      reset();
      setPolygons([]);
      mapRef.current?.clearMap();
      closeDialog?.();
    } catch (error) {
      console.error("Zone mutation error:", error);
    }
  };

  const throttledUpdateLatLng = useMemo(
    () =>
      throttle((polygons: { lat: number; lng: number }[][]) => {
        setPolygons(polygons);
      }, 500),
    []
  );

  if (isEditMode && !zone && !isLoading) {
    toast.error("Zone not found");
    return null;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 gap-4">
        <TextInput
          control={control}
          name="name"
          label="Zone Name"
          placeholder="e.g. Gulf Zone"
        />

        <SelectInput
          control={control}
          name="currency"
          label="Currency"
          options={currencies}
          labelKey="name"
          valueKey="value"
        />
      </div>

      {/* Polygon Map */}
      <PolygonSearchMap
        ref={mapRef}
        polygons={polygons}
        onUserPolygonDrawn={throttledUpdateLatLng}
      />

      {/* ✅ Polygon Error (ONLY AFTER SUBMIT) */}
      {isSubmitted && errors.polygons && (
        <p className="text-sm text-red-500 mt-1">
          {errors.polygons.message}
        </p>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
        variant="button"
      >
        {isSubmitting ? (
          <Loader className="border-foreground" />
        ) : id ? (
          "Update Zone"
        ) : (
          "Create Zone"
        )}
      </Button>
    </form>
  );
};

export default ZoneForm;
