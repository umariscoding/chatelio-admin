"use client";

import React, { useState, useRef, useCallback } from "react";

import Button from "@/components/ui/Button";
import { Icons } from "@/components/ui";
import type { FileUploadProps } from "@/interfaces/KnowledgeBase.interface";

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const FileUpload: React.FC<FileUploadProps> = ({
  onUpload,
  loading = false,
  className = "",
  accept = ".txt,.pdf,.doc,.docx,.md",
  maxSize = 10 * 1024 * 1024, // 10MB default
  multiple = false,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxSize) {
      return `File "${file.name}" is too large. Maximum size is ${formatFileSize(maxSize)}.`;
    }

    // Check file type if accept is specified
    if (accept) {
      const allowedTypes = accept.split(",").map((type) => type.trim());
      const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
      const isValidType = allowedTypes.some((type) => {
        if (type.startsWith(".")) {
          return type.toLowerCase() === fileExtension;
        }
        return file.type.includes(type);
      });

      if (!isValidType) {
        return `File "${file.name}" has an invalid type. Allowed types: ${accept}`;
      }
    }

    return null;
  };

  const handleFiles = useCallback(
    (files: FileList | File[]) => {
      const fileArray = Array.from(files);
      const newErrors: string[] = [];
      const validFiles: File[] = [];

      fileArray.forEach((file) => {
        const error = validateFile(file);
        if (error) {
          newErrors.push(error);
        } else {
          validFiles.push(file);
        }
      });

      setErrors(newErrors);

      if (validFiles.length > 0) {
        if (multiple) {
          setSelectedFiles((prev) => [...prev, ...validFiles]);
        } else {
          setSelectedFiles(validFiles.slice(0, 1));
        }
      }
    },
    [maxSize, accept, multiple],
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles],
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFiles(e.target.files);
      }
    },
    [handleFiles],
  );

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      selectedFiles.forEach((file) => {
        onUpload(file);
      });
      setSelectedFiles([]);
      setErrors([]);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-5 ${className}`}>
      {/* Drag & Drop Area */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-10 text-center transition-all duration-200 ${
          dragActive
            ? "border-primary-400 bg-primary-50 shadow-lg shadow-primary-100"
            : "border-neutral-300 hover:border-neutral-400 hover:shadow-md"
        } ${loading ? "opacity-50 pointer-events-none" : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Icons.CloudUpload
          className={`mx-auto h-14 w-14 transition-colors ${
            dragActive ? "text-primary-400" : "text-neutral-400"
          }`}
        />
        <div className="mt-5">
          <p className="text-base font-semibold text-neutral-900">
            Drop files here to upload
          </p>
          <p className="mt-2 text-sm text-neutral-600">
            or{" "}
            <button
              type="button"
              onClick={openFileDialog}
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
              disabled={loading}
            >
              browse your files
            </button>
          </p>
        </div>
        <div className="mt-5 text-xs text-neutral-500 space-y-1">
          <p>
            Supported formats: <span className="font-medium">{accept}</span>
          </p>
          <p>
            Maximum file size:{" "}
            <span className="font-medium">{formatFileSize(maxSize)}</span>
          </p>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileSelect}
        className="hidden"
        disabled={loading}
      />

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="space-y-2">
          {errors.map((error, index) => (
            <div
              key={index}
              className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3"
            >
              <Icons.Close className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          ))}
        </div>
      )}

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Icons.Document className="h-5 w-5 text-neutral-400" />
            <h4 className="text-sm font-semibold text-neutral-900">
              {selectedFiles.length}{" "}
              {selectedFiles.length === 1 ? "file" : "files"} selected
            </h4>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {selectedFiles.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-4 bg-neutral-50 border border-neutral-200 rounded-lg hover:bg-neutral-100 transition-colors"
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <Icons.Document className="h-5 w-5 text-neutral-400 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-neutral-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="p-1.5 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-200 rounded-md transition-colors flex-shrink-0 ml-2"
                  disabled={loading}
                  aria-label="Remove file"
                >
                  <Icons.Close className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Upload Button */}
          <div className="flex justify-end pt-4 border-t border-neutral-200">
            <Button
              onClick={handleUpload}
              loading={loading}
              disabled={selectedFiles.length === 0 || loading}
            >
              Upload {selectedFiles.length}{" "}
              {selectedFiles.length === 1 ? "File" : "Files"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
