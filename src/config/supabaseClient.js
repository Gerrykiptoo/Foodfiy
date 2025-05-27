import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase URL and anon key
// You should store these in environment variables in a production app
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://ytklyrjsowjotbdmldup.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0a2x5cmpzb3dqb3RiZG1sZHVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzMzM1NjgsImV4cCI6MjA2MzkwOTU2OH0.qDVakZSkqsvi75afH0zTi0iGcfbmBwINeYqsEtDngDo';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;