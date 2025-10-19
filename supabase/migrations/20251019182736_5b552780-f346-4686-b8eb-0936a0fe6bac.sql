-- Create enum for case stages
CREATE TYPE case_stage AS ENUM ('new', 'design', 'production', 'qc', 'delivery');

-- Create enum for staff roles
CREATE TYPE lab_staff_role AS ENUM ('designer', 'ceramist', 'qc_manager', 'courier_manager', 'admin');

-- Create enum for QC status
CREATE TYPE qc_status AS ENUM ('pending', 'passed', 'failed');

-- Create lab_staff table for managing lab employees
CREATE TABLE public.lab_staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lab_id UUID NOT NULL REFERENCES public.labs(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  role lab_staff_role NOT NULL,
  email TEXT,
  phone TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create case_assignments table
CREATE TABLE public.case_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  staff_id UUID NOT NULL REFERENCES public.lab_staff(id) ON DELETE CASCADE,
  task_type TEXT NOT NULL,
  assigned_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  notes TEXT
);

-- Create case_stages table to track stage progression
CREATE TABLE public.case_stages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  stage case_stage NOT NULL,
  started_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  notes TEXT,
  completed_by UUID REFERENCES public.lab_staff(id)
);

-- Create qc_records table
CREATE TABLE public.qc_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  inspector_id UUID REFERENCES public.lab_staff(id),
  status qc_status NOT NULL DEFAULT 'pending',
  margins_checked BOOLEAN DEFAULT false,
  shade_match BOOLEAN DEFAULT false,
  fit_accuracy BOOLEAN DEFAULT false,
  surface_finish BOOLEAN DEFAULT false,
  photo_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create delivery_tracking table
CREATE TABLE public.delivery_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  courier_name TEXT,
  tracking_number TEXT,
  airway_bill_url TEXT,
  proof_of_shipment_url TEXT,
  status TEXT DEFAULT 'pending',
  shipped_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create remakes table
CREATE TABLE public.remakes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  original_case_id UUID NOT NULL REFERENCES public.cases(id),
  remake_case_id UUID REFERENCES public.cases(id),
  reason TEXT NOT NULL,
  fault_party TEXT, -- 'dentist', 'lab', 'material', 'other'
  resolution_notes TEXT,
  approved_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  resolved_at TIMESTAMPTZ
);

-- Create lab_financials table
CREATE TABLE public.lab_financials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lab_id UUID NOT NULL REFERENCES public.labs(id) ON DELETE CASCADE,
  case_id UUID REFERENCES public.cases(id),
  amount DECIMAL(10,2) NOT NULL,
  transaction_type TEXT NOT NULL, -- 'revenue', 'expense', 'refund'
  payment_method TEXT,
  status TEXT DEFAULT 'pending',
  invoice_url TEXT,
  notes TEXT,
  transaction_date TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Add current_stage to cases table
ALTER TABLE public.cases ADD COLUMN IF NOT EXISTS current_stage case_stage DEFAULT 'new';

-- Enable RLS
ALTER TABLE public.lab_staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qc_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.remakes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lab_financials ENABLE ROW LEVEL SECURITY;

-- RLS Policies for lab_staff
CREATE POLICY "Lab owners can manage staff"
ON public.lab_staff FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.labs
    WHERE labs.id = lab_staff.lab_id
    AND labs.user_id = auth.uid()
  )
);

CREATE POLICY "Staff can view own record"
ON public.lab_staff FOR SELECT
USING (user_id = auth.uid());

-- RLS Policies for case_assignments
CREATE POLICY "Lab staff can view assignments"
ON public.case_assignments FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.lab_staff
    WHERE lab_staff.id = case_assignments.staff_id
    AND (lab_staff.user_id = auth.uid() OR EXISTS (
      SELECT 1 FROM public.labs
      WHERE labs.id = lab_staff.lab_id
      AND labs.user_id = auth.uid()
    ))
  )
);

CREATE POLICY "Lab owners can manage assignments"
ON public.case_assignments FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.cases
    JOIN public.labs ON labs.id = cases.lab_id
    WHERE cases.id = case_assignments.case_id
    AND labs.user_id = auth.uid()
  )
);

-- RLS Policies for case_stages
CREATE POLICY "Lab can manage case stages"
ON public.case_stages FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.cases
    JOIN public.labs ON labs.id = cases.lab_id
    WHERE cases.id = case_stages.case_id
    AND labs.user_id = auth.uid()
  )
);

CREATE POLICY "Dentists can view case stages"
ON public.case_stages FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.cases
    WHERE cases.id = case_stages.case_id
    AND cases.dentist_id = auth.uid()
  )
);

-- RLS Policies for qc_records
CREATE POLICY "Lab can manage QC records"
ON public.qc_records FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.cases
    JOIN public.labs ON labs.id = cases.lab_id
    WHERE cases.id = qc_records.case_id
    AND labs.user_id = auth.uid()
  )
);

-- RLS Policies for delivery_tracking
CREATE POLICY "Lab can manage delivery tracking"
ON public.delivery_tracking FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.cases
    JOIN public.labs ON labs.id = cases.lab_id
    WHERE cases.id = delivery_tracking.case_id
    AND labs.user_id = auth.uid()
  )
);

CREATE POLICY "Dentists can view delivery tracking"
ON public.delivery_tracking FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.cases
    WHERE cases.id = delivery_tracking.case_id
    AND cases.dentist_id = auth.uid()
  )
);

-- RLS Policies for remakes
CREATE POLICY "Lab and dentist can view remakes"
ON public.remakes FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.cases
    WHERE (cases.id = remakes.original_case_id OR cases.id = remakes.remake_case_id)
    AND (cases.dentist_id = auth.uid() OR EXISTS (
      SELECT 1 FROM public.labs
      WHERE labs.id = cases.lab_id
      AND labs.user_id = auth.uid()
    ))
  )
);

CREATE POLICY "Lab and dentist can create remakes"
ON public.remakes FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.cases
    WHERE cases.id = remakes.original_case_id
    AND (cases.dentist_id = auth.uid() OR EXISTS (
      SELECT 1 FROM public.labs
      WHERE labs.id = cases.lab_id
      AND labs.user_id = auth.uid()
    ))
  )
);

-- RLS Policies for lab_financials
CREATE POLICY "Lab owners can manage financials"
ON public.lab_financials FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.labs
    WHERE labs.id = lab_financials.lab_id
    AND labs.user_id = auth.uid()
  )
);

-- Create triggers for updated_at
CREATE TRIGGER update_lab_staff_updated_at
  BEFORE UPDATE ON public.lab_staff
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_qc_records_updated_at
  BEFORE UPDATE ON public.qc_records
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_delivery_tracking_updated_at
  BEFORE UPDATE ON public.delivery_tracking
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();