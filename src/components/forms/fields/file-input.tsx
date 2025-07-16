// components/fields/file-input.tsx
"use client";

import { InputHTMLAttributes, useState } from "react";
import { Control, useController } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MyImage from "@/components/custom/my-image";

interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  control: Control<any>;
  name: string;
}

const FileInput = ({ label, control, name, ...props }: FileInputProps) => {
  const {
    field: { onChange, ref, value },
    fieldState: { error },
  } = useController({ name, control });

  const [preview, setPreview] = useState<string | null>(
    typeof value === "string" ? value : null
  );

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file); // store File in RHF state
      setPreview(URL.createObjectURL(file)); // local preview
    }
  };

  return (
    <div className="space-y-2">
      {label && <Label className="capitalize">{label}</Label>}

      <Input
        ref={ref}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className={`bg-secondary/50 cursor-pointer ${
          error ? "border-red-500 focus:ring-red-500" : ""
        }`}
        {...props}
      />

      {preview && (
        <MyImage
          src={preview}
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
