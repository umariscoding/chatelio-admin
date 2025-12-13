"use client";

import React from "react";
import { Icons } from "@/components/ui";

interface ChatbotSectionProps {
  chatbotTitle: string;
  chatbotDescription: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

export default function ChatbotSection({
  chatbotTitle,
  chatbotDescription,
  onTitleChange,
  onDescriptionChange,
}: ChatbotSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">
          Chatbot Configuration
        </h2>
        <p className="text-neutral-600">
          Customize your chatbot's public appearance
        </p>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-6">
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
              <Icons.Edit className="h-4 w-4 text-primary-600" />
            </div>
            <label className="text-sm font-semibold text-neutral-700">
              Chatbot Title
            </label>
          </div>
          <input
            type="text"
            value={chatbotTitle}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Customer Support Assistant"
            className="w-full rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder-neutral-400 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
          />
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
              <Icons.Edit className="h-4 w-4 text-primary-600" />
            </div>
            <label className="text-sm font-semibold text-neutral-700">
              Description
            </label>
          </div>
          <textarea
            value={chatbotDescription}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Brief description of what your chatbot can help with..."
            rows={4}
            className="w-full rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder-neutral-400 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none transition-all"
          />
        </div>
      </div>
    </div>
  );
}
