import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

const CASE_TYPE = ["crown", "veneer", "implant", "bridge", "denture", "aligner", "other"] as const;

export default defineTool({
  name: "create_case",
  title: "Create case",
  description:
    "Create a new draft dental case for the signed-in dentist, with patient initials, case type and optional details.",
  inputSchema: {
    patient_initials: z.string().trim().min(1).max(10).describe("Patient initials, e.g. 'A.M.'"),
    case_type: z.enum(CASE_TYPE).describe("Type of restoration."),
    material: z.string().trim().optional().describe("Material, e.g. Zirconia, E-max."),
    tooth_number: z.string().trim().optional().describe("Tooth number or range."),
    due_date: z.string().date().optional().describe("Requested due date (YYYY-MM-DD)."),
    lab_id: z.string().uuid().optional().describe("Lab to assign the case to."),
    notes: z.string().trim().max(2000).optional().describe("Clinical notes for the lab."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async (input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("cases")
      .insert({
        dentist_id: ctx.getUserId(),
        patient_initials: input.patient_initials,
        case_type: input.case_type,
        material: input.material ?? null,
        tooth_number: input.tooth_number ?? null,
        due_date: input.due_date ?? null,
        lab_id: input.lab_id ?? null,
        notes: input.notes ?? null,
        status: "draft",
      })
      .select()
      .maybeSingle();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
      structuredContent: { case: data },
    };
  },
});
