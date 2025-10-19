export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      case_assignments: {
        Row: {
          assigned_at: string | null
          case_id: string
          completed_at: string | null
          id: string
          notes: string | null
          staff_id: string
          task_type: string
        }
        Insert: {
          assigned_at?: string | null
          case_id: string
          completed_at?: string | null
          id?: string
          notes?: string | null
          staff_id: string
          task_type: string
        }
        Update: {
          assigned_at?: string | null
          case_id?: string
          completed_at?: string | null
          id?: string
          notes?: string | null
          staff_id?: string
          task_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_assignments_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "case_assignments_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "lab_staff"
            referencedColumns: ["id"]
          },
        ]
      }
      case_files: {
        Row: {
          case_id: string
          created_at: string | null
          file_name: string
          file_type: string
          file_url: string
          id: string
          uploaded_by: string | null
        }
        Insert: {
          case_id: string
          created_at?: string | null
          file_name: string
          file_type: string
          file_url: string
          id?: string
          uploaded_by?: string | null
        }
        Update: {
          case_id?: string
          created_at?: string | null
          file_name?: string
          file_type?: string
          file_url?: string
          id?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "case_files_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
        ]
      }
      case_stages: {
        Row: {
          case_id: string
          completed_at: string | null
          completed_by: string | null
          id: string
          notes: string | null
          stage: Database["public"]["Enums"]["case_stage"]
          started_at: string | null
        }
        Insert: {
          case_id: string
          completed_at?: string | null
          completed_by?: string | null
          id?: string
          notes?: string | null
          stage: Database["public"]["Enums"]["case_stage"]
          started_at?: string | null
        }
        Update: {
          case_id?: string
          completed_at?: string | null
          completed_by?: string | null
          id?: string
          notes?: string | null
          stage?: Database["public"]["Enums"]["case_stage"]
          started_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "case_stages_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "case_stages_completed_by_fkey"
            columns: ["completed_by"]
            isOneToOne: false
            referencedRelation: "lab_staff"
            referencedColumns: ["id"]
          },
        ]
      }
      case_updates: {
        Row: {
          case_id: string
          created_at: string | null
          created_by: string | null
          id: string
          message: string | null
          status: Database["public"]["Enums"]["case_status"]
        }
        Insert: {
          case_id: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          message?: string | null
          status: Database["public"]["Enums"]["case_status"]
        }
        Update: {
          case_id?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          message?: string | null
          status?: Database["public"]["Enums"]["case_status"]
        }
        Relationships: [
          {
            foreignKeyName: "case_updates_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
        ]
      }
      cases: {
        Row: {
          case_type: Database["public"]["Enums"]["case_type"]
          created_at: string | null
          current_stage: Database["public"]["Enums"]["case_stage"] | null
          dentist_id: string
          due_date: string | null
          id: string
          lab_id: string | null
          material: string | null
          notes: string | null
          patient_initials: string
          progress: number | null
          status: Database["public"]["Enums"]["case_status"] | null
          tooth_number: string | null
          updated_at: string | null
        }
        Insert: {
          case_type: Database["public"]["Enums"]["case_type"]
          created_at?: string | null
          current_stage?: Database["public"]["Enums"]["case_stage"] | null
          dentist_id: string
          due_date?: string | null
          id?: string
          lab_id?: string | null
          material?: string | null
          notes?: string | null
          patient_initials: string
          progress?: number | null
          status?: Database["public"]["Enums"]["case_status"] | null
          tooth_number?: string | null
          updated_at?: string | null
        }
        Update: {
          case_type?: Database["public"]["Enums"]["case_type"]
          created_at?: string | null
          current_stage?: Database["public"]["Enums"]["case_stage"] | null
          dentist_id?: string
          due_date?: string | null
          id?: string
          lab_id?: string | null
          material?: string | null
          notes?: string | null
          patient_initials?: string
          progress?: number | null
          status?: Database["public"]["Enums"]["case_status"] | null
          tooth_number?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cases_lab_id_fkey"
            columns: ["lab_id"]
            isOneToOne: false
            referencedRelation: "labs"
            referencedColumns: ["id"]
          },
        ]
      }
      delivery_tracking: {
        Row: {
          airway_bill_url: string | null
          case_id: string
          courier_name: string | null
          created_at: string | null
          delivered_at: string | null
          id: string
          notes: string | null
          proof_of_shipment_url: string | null
          shipped_at: string | null
          status: string | null
          tracking_number: string | null
          updated_at: string | null
        }
        Insert: {
          airway_bill_url?: string | null
          case_id: string
          courier_name?: string | null
          created_at?: string | null
          delivered_at?: string | null
          id?: string
          notes?: string | null
          proof_of_shipment_url?: string | null
          shipped_at?: string | null
          status?: string | null
          tracking_number?: string | null
          updated_at?: string | null
        }
        Update: {
          airway_bill_url?: string | null
          case_id?: string
          courier_name?: string | null
          created_at?: string | null
          delivered_at?: string | null
          id?: string
          notes?: string | null
          proof_of_shipment_url?: string | null
          shipped_at?: string | null
          status?: string | null
          tracking_number?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "delivery_tracking_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
        ]
      }
      lab_financials: {
        Row: {
          amount: number
          case_id: string | null
          created_at: string | null
          id: string
          invoice_url: string | null
          lab_id: string
          notes: string | null
          payment_method: string | null
          status: string | null
          transaction_date: string | null
          transaction_type: string
        }
        Insert: {
          amount: number
          case_id?: string | null
          created_at?: string | null
          id?: string
          invoice_url?: string | null
          lab_id: string
          notes?: string | null
          payment_method?: string | null
          status?: string | null
          transaction_date?: string | null
          transaction_type: string
        }
        Update: {
          amount?: number
          case_id?: string | null
          created_at?: string | null
          id?: string
          invoice_url?: string | null
          lab_id?: string
          notes?: string | null
          payment_method?: string | null
          status?: string | null
          transaction_date?: string | null
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "lab_financials_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lab_financials_lab_id_fkey"
            columns: ["lab_id"]
            isOneToOne: false
            referencedRelation: "labs"
            referencedColumns: ["id"]
          },
        ]
      }
      lab_staff: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          is_active: boolean | null
          lab_id: string
          name: string
          phone: string | null
          role: Database["public"]["Enums"]["lab_staff_role"]
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          lab_id: string
          name: string
          phone?: string | null
          role: Database["public"]["Enums"]["lab_staff_role"]
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          lab_id?: string
          name?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["lab_staff_role"]
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lab_staff_lab_id_fkey"
            columns: ["lab_id"]
            isOneToOne: false
            referencedRelation: "labs"
            referencedColumns: ["id"]
          },
        ]
      }
      labs: {
        Row: {
          avg_turnaround_days: number | null
          base_price: number | null
          certifications: string[] | null
          created_at: string | null
          description: string | null
          id: string
          is_verified: boolean | null
          logo_url: string | null
          name: string
          rating: number | null
          specialties: string[] | null
          total_reviews: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          avg_turnaround_days?: number | null
          base_price?: number | null
          certifications?: string[] | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_verified?: boolean | null
          logo_url?: string | null
          name: string
          rating?: number | null
          specialties?: string[] | null
          total_reviews?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          avg_turnaround_days?: number | null
          base_price?: number | null
          certifications?: string[] | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_verified?: boolean | null
          logo_url?: string | null
          name?: string
          rating?: number | null
          specialties?: string[] | null
          total_reviews?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          case_id: string
          created_at: string | null
          id: string
          paid_at: string | null
          payment_type: string
          status: string | null
        }
        Insert: {
          amount: number
          case_id: string
          created_at?: string | null
          id?: string
          paid_at?: string | null
          payment_type: string
          status?: string | null
        }
        Update: {
          amount?: number
          case_id?: string
          created_at?: string | null
          id?: string
          paid_at?: string | null
          payment_type?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          clinic_name: string | null
          country: string | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          is_verified: boolean | null
          license_url: string | null
          logo_url: string | null
          phone: string | null
          preferred_materials: string[] | null
          specialty: string | null
          updated_at: string | null
        }
        Insert: {
          clinic_name?: string | null
          country?: string | null
          created_at?: string | null
          email: string
          full_name: string
          id: string
          is_verified?: boolean | null
          license_url?: string | null
          logo_url?: string | null
          phone?: string | null
          preferred_materials?: string[] | null
          specialty?: string | null
          updated_at?: string | null
        }
        Update: {
          clinic_name?: string | null
          country?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          is_verified?: boolean | null
          license_url?: string | null
          logo_url?: string | null
          phone?: string | null
          preferred_materials?: string[] | null
          specialty?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      qc_records: {
        Row: {
          case_id: string
          created_at: string | null
          fit_accuracy: boolean | null
          id: string
          inspector_id: string | null
          margins_checked: boolean | null
          notes: string | null
          photo_url: string | null
          shade_match: boolean | null
          status: Database["public"]["Enums"]["qc_status"]
          surface_finish: boolean | null
          updated_at: string | null
        }
        Insert: {
          case_id: string
          created_at?: string | null
          fit_accuracy?: boolean | null
          id?: string
          inspector_id?: string | null
          margins_checked?: boolean | null
          notes?: string | null
          photo_url?: string | null
          shade_match?: boolean | null
          status?: Database["public"]["Enums"]["qc_status"]
          surface_finish?: boolean | null
          updated_at?: string | null
        }
        Update: {
          case_id?: string
          created_at?: string | null
          fit_accuracy?: boolean | null
          id?: string
          inspector_id?: string | null
          margins_checked?: boolean | null
          notes?: string | null
          photo_url?: string | null
          shade_match?: boolean | null
          status?: Database["public"]["Enums"]["qc_status"]
          surface_finish?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "qc_records_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qc_records_inspector_id_fkey"
            columns: ["inspector_id"]
            isOneToOne: false
            referencedRelation: "lab_staff"
            referencedColumns: ["id"]
          },
        ]
      }
      remakes: {
        Row: {
          approved_by: string | null
          created_at: string | null
          fault_party: string | null
          id: string
          original_case_id: string
          reason: string
          remake_case_id: string | null
          resolution_notes: string | null
          resolved_at: string | null
        }
        Insert: {
          approved_by?: string | null
          created_at?: string | null
          fault_party?: string | null
          id?: string
          original_case_id: string
          reason: string
          remake_case_id?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
        }
        Update: {
          approved_by?: string | null
          created_at?: string | null
          fault_party?: string | null
          id?: string
          original_case_id?: string
          reason?: string
          remake_case_id?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "remakes_original_case_id_fkey"
            columns: ["original_case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "remakes_remake_case_id_fkey"
            columns: ["remake_case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          case_id: string
          comment: string | null
          created_at: string | null
          dentist_id: string
          id: string
          lab_id: string
          rating: number
          tags: string[] | null
        }
        Insert: {
          case_id: string
          comment?: string | null
          created_at?: string | null
          dentist_id: string
          id?: string
          lab_id: string
          rating: number
          tags?: string[] | null
        }
        Update: {
          case_id?: string
          comment?: string | null
          created_at?: string | null
          dentist_id?: string
          id?: string
          lab_id?: string
          rating?: number
          tags?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_lab_id_fkey"
            columns: ["lab_id"]
            isOneToOne: false
            referencedRelation: "labs"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "dentist" | "lab" | "admin"
      case_stage: "new" | "design" | "production" | "qc" | "delivery"
      case_status:
        | "draft"
        | "pending_payment"
        | "design"
        | "production"
        | "delivery"
        | "final_production"
        | "completed"
        | "remake"
      case_type:
        | "crown"
        | "veneer"
        | "implant"
        | "bridge"
        | "denture"
        | "aligner"
        | "other"
      lab_staff_role:
        | "designer"
        | "ceramist"
        | "qc_manager"
        | "courier_manager"
        | "admin"
      qc_status: "pending" | "passed" | "failed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["dentist", "lab", "admin"],
      case_stage: ["new", "design", "production", "qc", "delivery"],
      case_status: [
        "draft",
        "pending_payment",
        "design",
        "production",
        "delivery",
        "final_production",
        "completed",
        "remake",
      ],
      case_type: [
        "crown",
        "veneer",
        "implant",
        "bridge",
        "denture",
        "aligner",
        "other",
      ],
      lab_staff_role: [
        "designer",
        "ceramist",
        "qc_manager",
        "courier_manager",
        "admin",
      ],
      qc_status: ["pending", "passed", "failed"],
    },
  },
} as const
