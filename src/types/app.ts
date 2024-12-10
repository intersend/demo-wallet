// src/types/app.ts
export interface App {
    id: string;
    name: string;
    slug: string;
    logo: string;
    banner: string;
    description: string;
    category: string[];
    privacy_policy: string;
    terms: string;
    screenshots: string[];
    about: string;
    features: string[];
    developer: string;
    link: string;
    developer_website: string;
    createdAt: string;
    kyc: boolean;
    url: string;
  }