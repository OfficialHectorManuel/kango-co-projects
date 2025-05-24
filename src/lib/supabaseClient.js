import { createClient } from '@supabase/supabase-js';

    const supabaseUrl = 'https://kmnzzxvdgdzuxxwlwahx.supabase.co';
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imttbnp6eHZkZ2R6dXh4d2x3YWh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwODY1NzEsImV4cCI6MjA2MzY2MjU3MX0.kBcEfG7Q6qi7xJiy-XjK6-MER_E6F8PqDSIKZSwAEkY';

    export const supabase = createClient(supabaseUrl, supabaseAnonKey);