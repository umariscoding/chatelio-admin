"use client";

import React from "react";
import { Icons, Toggle } from "@/components/ui";

interface PublishingSectionProps {
  isPublished: boolean;
  slug: string | null;
  onPublishToggle: (checked: boolean) => void;
}

export default function PublishingSection({
  isPublished,
  slug,
  onPublishToggle,
}: PublishingSectionProps) {
  const handleVisitPublicChatbot = () => {
    if (slug && typeof window !== "undefined") {
      const publicChatbotUrl = `${window.location.origin}/${slug}`;
      window.open(publicChatbotUrl, "_blank");
    }
  };

  const handleVisitSubdomain = () => {
    if (typeof window !== "undefined" && slug) {
      const hostname = window.location.hostname;
      const port = window.location.port ? `:${window.location.port}` : "";
      const protocol = window.location.protocol;

      let subdomainUrl;
      if (hostname === "localhost" || hostname === "127.0.0.1") {
        subdomainUrl = `${protocol}//${slug}.localhost${port}`;
      } else {
        const domainParts = hostname.split(".");
        const baseDomain =
          domainParts.length >= 2 ? domainParts.slice(-2).join(".") : hostname;
        subdomainUrl = `${protocol}//${slug}.${baseDomain}${port}`;
      }
      window.open(subdomainUrl, "_blank");
    }
  };

  const getSubdomainUrl = () => {
    if (typeof window === "undefined" || !slug) return "Loading...";
    const hostname = window.location.hostname;
    const port = window.location.port ? `:${window.location.port}` : "";

    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return `${slug}.localhost${port}`;
    } else {
      const domainParts = hostname.split(".");
      const baseDomain =
        domainParts.length >= 2 ? domainParts.slice(-2).join(".") : hostname;
      return `${slug}.${baseDomain}${port}`;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Publishing</h2>
        <p className="text-neutral-600">
          Control your chatbot's public accessibility
        </p>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-6">
        <div className="flex items-center justify-between pb-6 border-b border-neutral-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-success-100 rounded-xl">
              <Icons.Settings className="h-5 w-5 text-success-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-900">
                Publishing Status
              </h3>
              <p className="text-sm text-neutral-600 mt-1">
                {isPublished ? "Your chatbot is live" : "Chatbot is private"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-neutral-900">
                {isPublished ? "Live" : "Private"}
              </p>
              <p className="text-xs text-neutral-500">
                {isPublished ? "Publicly accessible" : "Not accessible"}
              </p>
            </div>
            <Toggle
              checked={isPublished}
              onChange={onPublishToggle}
              disabled={!slug}
              variant="success"
              size="lg"
              label=""
              description=""
            />
          </div>
        </div>

        {!slug && (
          <div className="bg-warning-50 p-5 rounded-xl border border-warning-200">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-warning-200 rounded-lg">
                <Icons.AlertCircle className="h-5 w-5 text-warning-700" />
              </div>
              <div>
                <h4 className="font-semibold text-warning-800 mb-1">
                  Slug Required
                </h4>
                <p className="text-sm text-warning-700">
                  Set a company slug in the Profile section before publishing
                </p>
              </div>
            </div>
          </div>
        )}

        {slug && isPublished && (
          <div className="bg-neutral-50 p-5 rounded-lg border border-neutral-200 space-y-4">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-2 h-2 bg-success-500 rounded-full"></div>
              <span className="text-sm font-semibold text-neutral-900">
                Your Chatbot is Live
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <span className="text-xs font-medium text-neutral-600 uppercase tracking-wide">
                  Path URL
                </span>
                <div
                  className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg border border-neutral-300 text-neutral-900 hover:text-primary-600 hover:border-primary-300 cursor-pointer transition-all group"
                  onClick={handleVisitPublicChatbot}
                >
                  <span className="font-medium text-sm">
                    {typeof window !== "undefined"
                      ? window.location.origin
                      : "https://yoursite.com"}
                    /{slug}
                  </span>
                  <Icons.Eye className="h-4 w-4 group-hover:scale-110 transition-transform" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <span className="text-xs font-medium text-neutral-600 uppercase tracking-wide">
                  Subdomain URL
                </span>
                <div
                  className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg border border-neutral-300 text-neutral-900 hover:text-primary-600 hover:border-primary-300 cursor-pointer transition-all group"
                  onClick={handleVisitSubdomain}
                >
                  <span className="font-medium text-sm">
                    {getSubdomainUrl()}
                  </span>
                  <Icons.Eye className="h-4 w-4 group-hover:scale-110 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        )}

        {slug && !isPublished && (
          <div className="bg-neutral-50 p-5 rounded-xl border border-neutral-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-neutral-200 rounded-lg">
                <Icons.Eye className="h-5 w-5 text-neutral-600" />
              </div>
              <div>
                <h4 className="font-semibold text-neutral-800 mb-1">
                  Chatbot is Private
                </h4>
                <p className="text-sm text-neutral-600">
                  Toggle the switch above to make your chatbot publicly
                  accessible
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
