"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, File, X, AlertCircle, Eye } from "lucide-react";
import {
    useDeleteBusinessSettings,
    useGetBusinessSettings,
    useSaveBusinessSettings,
} from "@/hooks/useBusinessSettings";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

interface TermsAndConditionsProps {
    onSuccess?: (data: any) => void;
    onError?: (error: string) => void;
}

const TermsAndConditions = ({ onSuccess, onError }: TermsAndConditionsProps) => {
    const t = useTranslations("translation");
    const { data, isLoading } = useGetBusinessSettings("termsAndConditions");
    const { mutate: save, isPending: isUploading } = useSaveBusinessSettings("termsAndConditions");
    const { mutate: deleteSettings, isPending: isDeleting } = useDeleteBusinessSettings("termsAndConditions");

    const savedUrl = data?.data?.pageSettings?.fileUrl ?? null;

    // local draft file (not yet saved)
    const [file, setFile] = React.useState<File | null>(null);
    const previewUrl = file ? URL.createObjectURL(file) : null;
    const displayUrl = previewUrl ?? savedUrl;

    const [error, setError] = React.useState<string | null>(null);

    const handleSubmit = () => {
        if (!file && !savedUrl) return setError(t("pleaseUploadAPdfFile"));
        if (!file) return;

        setError(null);
        const formData = new FormData();
        formData.append("fileUrl", file);

        save(formData, {
            onSuccess: (result) => {
                setFile(null);
                onSuccess?.(result.data);
            },
            onError: (err: any) => {
                const msg = err?.response?.data?.message || "Failed to save. Please try again.";
                setError(msg);
                onError?.(msg);
            },
        });
    };

    const handleRemove = () => {
        if (file) {
            // local draft — just clear, no API call
            setFile(null);
            setError(null);
            return;
        }
        // saved file — delete from server
        deleteSettings(undefined, {
            onError: (err: any) => {
                setError(err?.response?.data?.message || "Failed to delete. Please try again.");
            },
        });
    };

    const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
        if (rejectedFiles.length > 0) {
            const { code, message } = rejectedFiles[0].errors[0];
            setError(
                code === "file-too-large" ? t("fileSizeMustBeLessThan5mb")
                    : code === "file-invalid-type" ? t("onlyPdfFilesAreAllowed")
                        : message
            );
            return;
        }
        setFile(acceptedFiles[0] ?? null);
        setError(null);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "application/pdf": [".pdf"] },
        maxSize: 5 * 1024 * 1024,
        multiple: false,
    });

    if (isLoading) {
        return (
            <div className="space-y-4">
                <div className="animate-pulse">
                    <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {!displayUrl && (
                <div
                    {...getRootProps()}
                    className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 cursor-pointer
                        ${isDragActive ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-300 dark:border-gray-600 hover:border-blue-400"}
                        ${error ? "border-red-500 bg-red-50 dark:bg-red-900/20" : ""}`}
                >
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-blue-100 to-aqua/20 flex items-center justify-center">
                            <Upload className="w-8 h-8 text-blue-500" />
                        </div>
                        {isDragActive ? (
                            <p className="text-lg font-medium text-blue-500">{t("dropYourPdfHere")}</p>
                        ) : (
                            <>
                                <p className="text-base font-medium text-gray-700 dark:text-gray-300">
                                    {t("dragAndDropYourPdfFileHere")}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t("orClickToBrowse")}</p>
                            </>
                        )}
                        <div className="flex gap-2 mt-4">
                            <span className="text-xs text-gray-500">{t("pdfOnly")}</span>
                            <span className="text-xs text-gray-500">{t("max5mb")}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <p className="text-sm text-red-600">{error}</p>
                </div>
            )}

            {/* File card */}
            {displayUrl && (
                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
                    <div className="p-4 flex items-center gap-4">
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                                <File className="w-6 h-6 text-red-500" />
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {file ? file.name : t("termsAndConditionsDocument")}
                            </p>
                            {file && (
                                <p className="text-xs text-gray-500">
                                    {(file.size / 1024).toFixed(2)} KB • PDF
                                </p>
                            )}
                        </div>
                        <div className="flex items-center">
                            <Button
                                onClick={() => window.open(`${process.env.NEXT_PUBLIC_API_BASE_URL}${savedUrl}`, "_blank")}
                                variant="ghost"
                            >
                                <Eye className="w-5 h-5" />
                            </Button>
                            <Button
                                onClick={handleRemove}
                                disabled={isDeleting}
                                variant="ghost"
                            >
                                {isDeleting
                                    ? <div className="w-5 h-5 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                                    : <X className="w-5 h-5" />
                                }
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Save button */}
            <div className="pt-4">
                <Button
                    onClick={handleSubmit}
                    disabled={isUploading || (!file && !!savedUrl)}
                    variant="button"
                    className="w-full py-6"
                >
                    {isUploading ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>{t("saving")}</span>
                        </div>
                    ) : (
                        <span>{file ? t("save") : t("update")} {t("termsAndConditions")}</span>
                    )}
                </Button>
            </div>
        </div>
    );
};

export default TermsAndConditions;