-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('dentist', 'lab', 'admin');

-- Create enum for case status
CREATE TYPE public.case_status AS ENUM (
  'draft',
  'pending_payment',
  'design',
  'production',
  'delivery',
  'final_production',
  'completed',
  'remake'
);

-- Create enum for case types
CREATE TYPE public.case_type AS ENUM (
  'crown',
  'veneer',
  'implant',
  'bridge',
  'denture',
  'aligner',
  'other'
);

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT,
  clinic_name TEXT,
  license_url TEXT,
  logo_url TEXT,
  specialty TEXT,
  preferred_materials TEXT[],
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE(user_id, role)
);

-- Create labs table
CREATE TABLE public.labs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  specialties TEXT[],
  certifications TEXT[],
  rating DECIMAL(3,2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  avg_turnaround_days INTEGER,
  base_price DECIMAL(10,2),
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create cases table
CREATE TABLE public.cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dentist_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  lab_id UUID REFERENCES public.labs(id),
  case_type case_type NOT NULL,
  patient_initials TEXT NOT NULL,
  tooth_number TEXT,
  material TEXT,
  notes TEXT,
  status case_status DEFAULT 'draft',
  progress INTEGER DEFAULT 0,
  due_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create case_files table
CREATE TABLE public.case_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID REFERENCES public.cases(id) ON DELETE CASCADE NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_name TEXT NOT NULL,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create case_updates table
CREATE TABLE public.case_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID REFERENCES public.cases(id) ON DELETE CASCADE NOT NULL,
  status case_status NOT NULL,
  message TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create payments table
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID REFERENCES public.cases(id) ON DELETE CASCADE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_type TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID REFERENCES public.cases(id) ON DELETE CASCADE NOT NULL,
  lab_id UUID REFERENCES public.labs(id) ON DELETE CASCADE NOT NULL,
  dentist_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.labs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
    AND role = _role
  )
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policies for labs
CREATE POLICY "Anyone can view verified labs"
  ON public.labs FOR SELECT
  USING (is_verified = true);

CREATE POLICY "Lab owners can update own lab"
  ON public.labs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Lab owners can insert own lab"
  ON public.labs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for cases
CREATE POLICY "Dentists can view own cases"
  ON public.cases FOR SELECT
  USING (auth.uid() = dentist_id);

CREATE POLICY "Dentists can create cases"
  ON public.cases FOR INSERT
  WITH CHECK (auth.uid() = dentist_id);

CREATE POLICY "Dentists can update own cases"
  ON public.cases FOR UPDATE
  USING (auth.uid() = dentist_id);

-- RLS Policies for case_files
CREATE POLICY "Case owners can view files"
  ON public.case_files FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.cases
      WHERE cases.id = case_files.case_id
      AND cases.dentist_id = auth.uid()
    )
  );

CREATE POLICY "Case owners can upload files"
  ON public.case_files FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.cases
      WHERE cases.id = case_files.case_id
      AND cases.dentist_id = auth.uid()
    )
  );

-- RLS Policies for case_updates
CREATE POLICY "Case owners can view updates"
  ON public.case_updates FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.cases
      WHERE cases.id = case_updates.case_id
      AND cases.dentist_id = auth.uid()
    )
  );

CREATE POLICY "Case owners can create updates"
  ON public.case_updates FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.cases
      WHERE cases.id = case_updates.case_id
      AND cases.dentist_id = auth.uid()
    )
  );

-- RLS Policies for payments
CREATE POLICY "Case owners can view payments"
  ON public.payments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.cases
      WHERE cases.id = payments.case_id
      AND cases.dentist_id = auth.uid()
    )
  );

-- RLS Policies for reviews
CREATE POLICY "Anyone can view reviews"
  ON public.reviews FOR SELECT
  USING (true);

CREATE POLICY "Dentists can create reviews for own cases"
  ON public.reviews FOR INSERT
  WITH CHECK (auth.uid() = dentist_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.labs
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.cases
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Insert sample labs
INSERT INTO public.labs (name, description, specialties, certifications, rating, total_reviews, avg_turnaround_days, base_price, is_verified) VALUES
('Precision Dental Lab', 'Premium quality dental restorations with cutting-edge technology', ARRAY['Crowns', 'Veneers', 'Implants'], ARRAY['ISO 13485', 'DAMAS Certified'], 4.8, 124, 10, 250.00, true),
('Elite Dental Solutions', 'Specialized in complex prosthetic cases', ARRAY['Bridges', 'Dentures', 'Implants'], ARRAY['ISO 13485'], 4.6, 89, 12, 220.00, true),
('Pro Lab Technologies', 'Fast turnaround with excellent quality control', ARRAY['Crowns', 'Veneers', 'Aligners'], ARRAY['DAMAS Certified'], 4.9, 156, 8, 280.00, true),
('Advanced Ceramics Lab', 'Expert in aesthetic restorations', ARRAY['Veneers', 'Crowns'], ARRAY['ISO 13485', 'DAMAS Certified'], 4.7, 102, 11, 240.00, true),
('Digital Dental Studio', 'Full digital workflow specialists', ARRAY['Implants', 'Aligners', 'Crowns'], ARRAY['ISO 13485'], 4.5, 78, 9, 260.00, true),
('Master Lab Group', 'Comprehensive dental solutions', ARRAY['All Types'], ARRAY['ISO 13485', 'DAMAS Certified'], 4.8, 198, 10, 235.00, true)