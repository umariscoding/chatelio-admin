"use client";

import React, { useState } from "react";

import Button from "@/components/ui/Button";
import MinimalInput from "@/components/ui/MinimalInput";
import { Icons } from "@/components/ui";
import type { TextUploadProps } from "@/interfaces/KnowledgeBase.interface";

const TextUpload: React.FC<TextUploadProps> = ({
  onUpload,
  loading = false,
  className = "",
}) => {
  const [filename, setFilename] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState<{ filename?: string; content?: string }>(
    {},
  );

  const validateForm = (): boolean => {
    const newErrors: { filename?: string; content?: string } = {};

    if (!filename.trim()) {
      newErrors.filename = "Filename is required";
    } else if (!filename.endsWith(".txt") && !filename.includes(".")) {
      // Auto-add .txt extension if no extension provided
      setFilename((prev) => prev + ".txt");
    }

    if (!content.trim()) {
      newErrors.content = "Content is required";
    } else if (content.trim().length < 10) {
      newErrors.content = "Content must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onUpload(content.trim(), filename.trim());
      // Reset form after successful upload
      setFilename("");
      setContent("");
      setErrors({});
    }
  };

  const handleFilenameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilename(e.target.value);
    if (errors.filename) {
      setErrors((prev) => ({ ...prev, filename: undefined }));
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (errors.content) {
      setErrors((prev) => ({ ...prev, content: undefined }));
    }
  };

  const wordCount = content
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
  const charCount = content.length;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Filename Input */}
        <div>
          <MinimalInput
            label="Filename"
            type="text"
            value={filename}
            onChange={handleFilenameChange}
            error={errors.filename}
            placeholder="e.g., company-policy.txt"
            required
            disabled={loading}
            variant="floating"
            theme="light"
          />
          <p className="mt-1.5 text-xs text-neutral-600">
            Give your content a descriptive name (e.g., company-guidelines.txt)
          </p>
        </div>

        {/* Content Textarea */}
        <div>
          <label className="block text-sm font-semibold text-neutral-900 mb-2">
            Content <span className="text-red-500">*</span>
          </label>
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="Paste or type your content here..."
            rows={10}
            className={`w-full rounded-lg border bg-white text-neutral-900 placeholder-neutral-500 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all ${
              errors.content
                ? "border-red-500 focus:ring-red-500"
                : "border-neutral-300 hover:border-neutral-400"
            }`}
            disabled={loading}
            required
          />
          {errors.content && (
            <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
              <Icons.Close className="h-4 w-4 flex-shrink-0" />
              <span>{errors.content}</span>
            </p>
          )}

          {/* Character and Word Count */}
          <div className="mt-3 flex justify-between text-xs text-neutral-600 px-1">
            <span className="font-medium">{wordCount} words</span>
            <span className="font-medium">{charCount} characters</span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            loading={loading}
            disabled={!filename.trim() || !content.trim() || loading}
          >
            Upload Content
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TextUpload;
