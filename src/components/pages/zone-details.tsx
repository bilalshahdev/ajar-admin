"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/lib/store/hooks";
import { Zone } from "@/types";
import MapImg from "../../../public/images/map.jpg";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  FiMapPin,
  FiClock,
  FiGlobe,
  FiDollarSign,
  FiRss,
  FiFileText,
} from "react-icons/fi";
import MyImage from "../my-image";
import Link from "next/link";
import { Button } from "../ui/button";

const ZoneDetails = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  const zones = useAppSelector((state: any) => state.zones) || [];
  const zone: Zone | undefined = zones.find((z: any) => z._id === id);

  if (!zone)
    return (
      <p className="mt-10 text-center text-muted-foreground text-sm">
        Zone not found.
      </p>
    );

  const categories = useAppSelector((state: any) => state.categories) || [];
  // display categories also below zone as a zone can have multiple categories
  return (
    <Card className="mx-auto w-full max-w-4xl overflow-hidden py-0">
      {/* Banner */}
      <div className="relative h-52 w-full">
        <MyImage
          // src={zone.thumbnail || "/images/zone-placeholder.jpg"}
          src={MapImg}
          alt={zone.name}
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, 50vw"
        />

        {/* Status label instead of badge */}
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium text-white bg-black/50 backdrop-blur-sm">
          {zone.status === "active" ? "Active" : "Inactive"}
        </div>
      </div>

      {/* Header */}
      <CardHeader>
        <CardTitle className="text-2xl">{zone.name}</CardTitle>
        <CardDescription className="flex items-center gap-2 text-muted-foreground">
          <FiMapPin className="shrink-0" />
          {zone.country}
        </CardDescription>
      </CardHeader>

      {/* Content */}
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <Detail icon={FiDollarSign} label="Currency" value={zone.currency} />
          <Detail icon={FiClock} label="Time Zone" value={zone.timeZone} />
          <Detail icon={FiGlobe} label="Language" value={zone.language} />
          <Detail icon={FiRss} label="Radius" value={`${zone.radius} km`} />
          <Detail
            icon={FiMapPin}
            label="Latitude"
            value={zone.latlong?.[0]?.toString()}
          />
          <Detail
            icon={FiMapPin}
            label="Longitude"
            value={zone.latlong?.[1]?.toString()}
          />
        </div>{" "}
        <Link href={`/admin/dashboard/zones/${zone._id}/edit`}>
          <Button variant="button" className="block ml-auto mt-4">
            Edit Zone
          </Button>
        </Link>
      </CardContent>
      {/* should also add link to edit */}

      {/* Admin Notes */}
      {zone.adminNotes && (
        <CardFooter className="bg-muted/50 border-t py-4 px-6">
          <div className="flex items-start gap-2 text-muted-foreground text-sm">
            <FiFileText className="shrink-0 mt-0.5" />
            <p className="line-clamp-4">{zone.adminNotes}</p>
          </div>
          
        </CardFooter>
      )}
    </Card>
  );
};

/* ---------- Reusable Detail Item ---------- */
interface DetailProps {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  value?: string;
}
const Detail = ({ icon: Icon, label, value }: DetailProps) => (
  <div className="flex items-center gap-2">
    <Icon size={16} />
    <span className="font-medium">{label}:</span>
    <span className="truncate text-muted-foreground">{value || "—"}</span>
  </div>
);

export default ZoneDetails;
