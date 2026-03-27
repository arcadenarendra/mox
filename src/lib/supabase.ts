import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '/utils/supabase/info';

const supabaseUrl = `https://${projectId}.supabase.co`;

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
  membership_applications: {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postal_code: string;
    country: string;
    membership_type: string;
    payment_status: string;
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
