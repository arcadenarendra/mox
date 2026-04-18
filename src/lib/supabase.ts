import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const publicAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, publicAnonKey);

export type Database = {
  contact_submissions: {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    created_at: string;
  };
  events: {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    image_url: string;
    category: string;
    status: 'upcoming' | 'past';
    price: number;
    max_attendees: number;
    created_at: string;
  };
  committee_members: {
    id: string;
    name: string;
    role: string;
    bio: string;
    image_url: string;
    order: number;
    created_at: string;
  };
};
