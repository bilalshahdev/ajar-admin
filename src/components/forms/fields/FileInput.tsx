"use client";

import { InputHTMLAttributes, useEffect, useState, useRef } from "react";
import { Control, useController } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MyImage from "@/components/custom/MyImage";
import { baseUrl } from "@/config/constants";
import { useTranslations } from "next-intl";

interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  control: Control<any>;
  name: string;
}

const FileInput = ({ label, control, name, ...props }: FileInputProps) => {
  const t = useTranslations();
  const {
    field: { onChange, ref, value },
    fieldState: { error },
  } = useController({ name, control });

  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
      setPreview(URL.createObjectURL(file));
      setFileName(file.name);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      {label && <Label className="capitalize">{t(`translation.${label}`)}</Label>}

      <div className="relative">
        <Input
          ref={(e) => {
            ref(e);
            (fileInputRef as any).current = e;
          }}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="hidden"
          {...props}
        />
        
        <div
          onClick={handleClick}
          className={`flex h-10 w-full rounded-md border border-input bg-secondary/50 px-3 py-2 text-sm cursor-pointer hover:bg-secondary/70 transition-colors ${
            error ? "border-red-500 focus:ring-red-500" : ""
          }`}
        >
          <span className="text-muted-foreground">
            {fileName || t("translation.noFileChosen")}
          </span>
        </div>
      </div>

      {(preview || value) && (
        <MyImage
          src={preview || `${baseUrl}/${value}`}
          alt="preview"
          width={20}
          height={20}
          className="h-20 w-20 object-cover rounded-md border"
        />
      )}

      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default FileInput;