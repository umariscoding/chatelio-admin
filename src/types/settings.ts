export interface SettingsFormData {
  // Profile
  name: string;
  email: string;
  slug: string;

  // Chatbot
  chatbotTitle: string;
  chatbotDescription: string;

  // Publishing
  isPublished: boolean;
}

export interface SettingsChanges {
  hasChanges: boolean;
  changedFields: Set<keyof SettingsFormData>;
}
