-- Create the nutrition_content table in Supabase
CREATE TABLE IF NOT EXISTS public.nutrition_content (
  id BIGINT PRIMARY KEY DEFAULT 1,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add a constraint to ensure only one row exists (id = 1)
ALTER TABLE public.nutrition_content 
ADD CONSTRAINT nutrition_content_id_check 
CHECK (id = 1);

-- Enable Row Level Security (RLS)
ALTER TABLE public.nutrition_content ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous users to read content
CREATE POLICY "Allow public read access" 
ON public.nutrition_content 
FOR SELECT 
USING (true);

-- Create policy to allow anonymous users to insert/update content
-- Note: In production, you should replace this with authenticated user policies
CREATE POLICY "Allow public write access" 
ON public.nutrition_content 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Enable realtime for this table
ALTER PUBLICATION supabase_realtime ADD TABLE public.nutrition_content;

-- Insert initial empty row
INSERT INTO public.nutrition_content (id, content) 
VALUES (1, '') 
ON CONFLICT (id) DO NOTHING;
