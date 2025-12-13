"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

import { Icons } from "@/components/ui";
import IOSLoader from "@/components/ui/IOSLoader";
import FileUpload from "@/components/knowledge-base/FileUpload";
import TextUpload from "@/components/knowledge-base/TextUpload";
import type { UploadModalProps } from "@/interfaces/KnowledgeBase.interface";

type UploadMode = "file" | "text";
type UploadState = "idle" | "uploading" | "success";

const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onFileUpload,
  onTextUpload,
  loading = false,
  uploadProgress = 0,
}) => {
  const [uploadMode, setUploadMode] = useState<UploadMode>("file");
  const [uploadState, setUploadState] = useState<UploadState>("idle");

  // Update upload state based on loading and progress
  useEffect(() => {
    if (loading && uploadProgress > 0) {
      setUploadState("uploading");
    } else if (!loading && uploadProgress === 100) {
      setUploadState("success");
    } else {
      setUploadState("idle");
    }
  }, [loading, uploadProgress]);

  // Auto-close modal when upload completes
  useEffect(() => {
    if (uploadState === "success") {
      const timer = setTimeout(() => {
        onClose();
        setUploadState("idle");
      }, 1200); // Show success state briefly
      return () => clearTimeout(timer);
    }
  }, [uploadState, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col border border-neutral-200/50">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-b from-white to-neutral-50/50 border-b border-neutral-200/80 px-8 py-6 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 shadow-sm">
                <Icons.CloudUpload className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-neutral-900">
                  Add to Knowledge Base
                </h2>
                <p className="text-sm text-neutral-600 mt-1">
                  Upload files or add text content to enhance your knowledge
                  base
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              disabled={uploadState === "uploading"}
              className="ml-4 p-2.5 hover:bg-neutral-100 rounded-xl transition-all hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              aria-label="Close modal"
            >
              <Icons.Close className="h-5 w-5 text-neutral-600" />
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-8 flex flex-col bg-neutral-50/30">
            {uploadState === "idle" && (
              <>
                {/* Upload Mode Switch */}
                <div className="mb-10 flex justify-center w-full">
                  <div className="inline-flex items-center gap-2 bg-white rounded-2xl p-2 shadow-md border border-neutral-200/50">
                    <button
                      onClick={() => setUploadMode("file")}
                      disabled={loading}
                      className={`flex items-center gap-2.5 px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                        uploadMode === "file"
                          ? "bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-200"
                          : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50"
                      }`}
                    >
                      <Icons.CloudUpload className="h-5 w-5" />
                      <span>Upload Files</span>
                    </button>
                    <button
                      onClick={() => setUploadMode("text")}
                      disabled={loading}
                      className={`flex items-center gap-2.5 px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                        uploadMode === "text"
                          ? "bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-200"
                          : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50"
                      }`}
                    >
                      <Icons.Document className="h-5 w-5" />
                      <span>Add Text</span>
                    </button>
                  </div>
                </div>

                {/* Upload Interface */}
                {uploadMode === "file" && (
                  <FileUpload
                    onUpload={onFileUpload}
                    loading={loading}
                    multiple={false}
                    maxSize={10 * 1024 * 1024}
                    accept=".txt,.pdf,.doc,.docx,.md"
                  />
                )}

                {uploadMode === "text" && (
                  <TextUpload onUpload={onTextUpload} loading={loading} />
                )}
              </>
            )}

            {uploadState === "uploading" && (
              <div className="flex-1 flex flex-col items-center justify-center space-y-8 min-h-[450px] bg-white rounded-2xl p-8 mx-4 shadow-sm">
                <div className="space-y-6 text-center">
                  <div className="flex justify-center">
                    <div className="p-6 bg-primary-50 rounded-full">
                      <IOSLoader size="lg" color="primary" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-neutral-900">
                      {uploadProgress < 50
                        ? "Reading file..."
                        : uploadProgress < 90
                          ? "Processing..."
                          : "Finalizing..."}
                    </p>
                    <p className="text-base text-neutral-600 mt-2">
                      Please wait while we process your content
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full max-w-md space-y-3">
                  <div className="h-3 bg-neutral-200 rounded-full overflow-hidden shadow-inner">
                    <div
                      className="h-full bg-gradient-to-r from-primary-500 via-primary-600 to-primary-500 transition-all duration-500 ease-out rounded-full shadow-sm"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-neutral-700">
                      {Math.round(uploadProgress)}% complete
                    </p>
                    <p className="text-sm text-neutral-500">
                      {uploadProgress === 100
                        ? "Upload complete"
                        : "Do not close this window"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {uploadState === "success" && (
              <div className="flex-1 flex flex-col items-center justify-center space-y-6 animate-in fade-in duration-300 min-h-[450px]">
                <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-full p-6 shadow-lg shadow-green-200/50">
                  <Icons.Check className="h-12 w-12 text-green-600" />
                </div>
                <div className="text-center space-y-2">
                  <p className="text-2xl font-bold text-neutral-900">
                    Upload successful!
                  </p>
                  <p className="text-base text-neutral-600 max-w-md">
                    Your content has been added to the knowledge base
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
};

export default UploadModal;
