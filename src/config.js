import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://quekzqlxbmzahancabax.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1ZWt6cWx4Ym16YWhhbmNhYmF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5ODQ5MTksImV4cCI6MjA0NzU2MDkxOX0.ilhymE9Nrk03w9aRbd4ww-j7kjZxjmzl0ELDsOBcf_I"
);
