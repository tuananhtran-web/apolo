import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uwdtodghfijggutjchob.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3ZHRvZGdoZmlqZ2d1dGpjaG9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3NDQ2NDEsImV4cCI6MjA4NTMyMDY0MX0.4qQ9vTiKm8avmoh8PBdrKtw07I2UpFGNIktgh2PsLWc';

export const supabase = createClient(supabaseUrl, supabaseKey);
