"use client";
import BxTabs from "../BxTabs";
import DamageLiabilityTerms from "../DamageLiabilityTerms";
import RentalDurationLimits from "../RentalDurationLimits";
import SecurityDepositRules from "../SecurityDepositRules";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import { useGetZones } from "@/hooks/useZones";
import { limit } from "@/config/constants";
import { useTranslations } from "next-intl";

const RentalPolicies = () => {
  const t = useTranslations("translation");
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetZones({ page, limit });
  const [selectedZone, setSelectedZone] = useState<string | undefined>(
    undefined
  );

  const zones = data?.data?.zones;
  return (
    <div className="border rounded-md p-4 space-y-4">
      <div className="flex items-center justify-end gap-2">
        <Select value={selectedZone} onValueChange={setSelectedZone}>
          <SelectTrigger disabled={isLoading || !zones?.length}>
            <SelectValue
              placeholder={
                isLoading ? t("loading") : t("selectZone")
              }
            />
          </SelectTrigger>
          <SelectContent>
            {zones?.map((zone: any) => (
              <SelectItem key={zone._id} value={zone._id}>
                {zone.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>{" "}
      <p className="text-sm bg-amber-100 text-black p-2 rounded-md">
        ⚠️ {t("policyChangeNote")}
      </p>
      <>
        {selectedZone && (
          <BxTabs
            defaultValue="security-deposit"
            tabs={[
              {
                label: "securityDepositRules",
                value: "security-deposit",
                content: <SecurityDepositRules zone={selectedZone} />,
              },
              {
                label: "damageLiabilityTerms",
                value: "damage-liability",
                content: <DamageLiabilityTerms zone={selectedZone} />,
              },
              {
                label: "rentalDurationLimits",
                value: "rental-duration",
                content: <RentalDurationLimits zone={selectedZone} />,
              },
            ]}
          />
        )}
      </>
    </div>
  );
};

export default RentalPolicies;
