"use client";

import React from "react";
import { Icons } from "@/components/ui";

interface ProfileSectionProps {
  name: string;
  email: string;
  slug: string;
  onSlugChange: (value: string) => void;
}

export default function ProfileSection({
  name,
  email,
  slug,
  onSlugChange,
}: ProfileSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Profile</h2>
        <p className="text-neutral-600">
          Manage your company profile and public URL
        </p>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-6">
        {/* Read-only fields */}
        <div className="space-y-5">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                <Icons.User className="h-4 w-4 text-primary-600" />
              </div>
              <label className="text-sm font-semibold text-neutral-700">
                Company Name
              </label>
            </div>
            <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
              <p className="text-neutral-900 font-medium">{name}</p>
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                <Icons.Globe className="h-4 w-4 text-primary-600" />
              </div>
              <label className="text-sm font-semibold text-neutral-700">
                Email Address
              </label>
            </div>
            <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
              <p className="text-neutral-900 font-medium">{email}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-200 pt-6">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
              <Icons.Globe className="h-4 w-4 text-primary-600" />
            </div>
            <label className="text-sm font-semibold text-neutral-700">
              Company Slug
            </label>
          </div>
          <input
            type="text"
            value={slug}
            onChange={(e) => onSlugChange(e.target.value)}
            placeholder="Your company slug"
            className="w-full rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder-neutral-400 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
          />
          <p className="text-sm text-neutral-500 mt-2 flex items-center space-x-2">
            <Icons.AlertCircle className="h-4 w-4 text-primary-500" />
            <span>Lowercase letters, numbers, and hyphens only</span>
          </p>
        </div>
      </div>
    </div>
  );
}
