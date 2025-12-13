"use client";

import React, { useState } from "react";

import {
  useCompanyAppSelector,
  useCompanyAppDispatch,
} from "@/hooks/company/useCompanyAuth";
import {
  uploadFile,
  uploadText,
} from "@/store/company/slices/knowledgeBaseSlice";
import { Icons, IOSContentLoader } from "@/components/ui";
import Button from "@/components/ui/Button";
import DocumentList from "@/components/knowledge-base/DocumentList";
import UploadModal from "@/components/knowledge-base/UploadModal";

export default function KnowledgeBasePage() {
  const dispatch = useCompanyAppDispatch();
  const companyAuth = useCompanyAppSelector((state) => state.companyAuth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Check if page is loading
  if (companyAuth.loading) {
    return (
      <IOSContentLoader isLoading={true} message="Loading knowledge base..." />
    );
  }

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 30;
        });
      }, 300);

      await dispatch(uploadFile(file)).unwrap();

      clearInterval(progressInterval);
      setUploadProgress(100);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  const handleTextUpload = async (content: string, filename: string) => {
    setIsUploading(true);
    setUploadProgress(0);
    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 30;
        });
      }, 300);

      await dispatch(uploadText({ content, filename })).unwrap();

      clearInterval(progressInterval);
      setUploadProgress(100);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  // Only company accounts can access knowledge base management
  if (!companyAuth.isAuthenticated) {
    return (
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-8">
            {/* Icon */}
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-primary-100">
              <Icons.BookOpen className="h-10 w-10 text-primary-600" />
            </div>

            {/* Content */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-text-primary">
                Knowledge Base
              </h1>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                Access to knowledge base management is restricted to company
                accounts.
              </p>
            </div>

            {/* Access Restricted Card */}
            <div className="bg-bg-secondary border border-border-light rounded-xl p-8 max-w-md mx-auto">
              <div className="text-center space-y-4">
                <Icons.Shield className="mx-auto h-12 w-12 text-warning-500" />
                <h3 className="text-lg font-medium text-text-primary">
                  Access Restricted
                </h3>
                <p className="text-text-secondary">
                  Only company administrators can manage the knowledge base and
                  upload documents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section with Upload Button */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 rounded-lg bg-primary-100">
                <Icons.BookOpen className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-text-primary">
                  Knowledge Base
                </h1>
                <p className="text-text-secondary">
                  Manage your documents and content that powers your chatbot
                </p>
              </div>
            </div>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2"
          >
            <Icons.Plus className="h-5 w-5" />
            <span>Add Content</span>
          </Button>
        </div>

        {/* Documents List */}
        <DocumentList />
      </div>

      {/* Upload Modal */}
      <UploadModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setUploadProgress(0);
        }}
        onFileUpload={handleFileUpload}
        onTextUpload={handleTextUpload}
        loading={isUploading}
        uploadProgress={uploadProgress}
      />
    </div>
  );
}
