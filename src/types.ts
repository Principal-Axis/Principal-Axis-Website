export type ProjectStatus = 'live' | 'alpha' | 'beta' | 'upcoming' | 'concept';

export interface Project {
  id: string;
  name: string;
  category: string;
  subtitle: string;
  summary: string;
  description: string;
  fullCaseStudy: string[];
  bannerImage: string;
  tags: string[];
  status: ProjectStatus;
  statusLabel: string;
  websiteUrl?: string;
  githubUrl?: string;
  stats?: {
    label: string;
    value: string;
  }[];
  stack: string[];
  launchDate: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
  featuredIn?: string;
  coreSkill: string;
  accentColor: string;
}

export interface Milestone {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  description: string;
  badge?: string;
  category: 'origin' | 'pivot' | 'breakthrough' | 'scale';
}
