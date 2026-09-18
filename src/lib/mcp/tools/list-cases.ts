import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

const CASE_STATUS = [
  "draft",
  "pending_payment",
  "design",
  "production",
  "delivery",
  "final_production",
  "completed",
  "remake",
] as const;

export default defineTool({
  name: "list_cases",
  title: "List cases",
  description:
    "List dental cases visible to the signed-in user, optionally filtered by status, newest first.",
  inputSchema: {
    status: z.enum(CASE_STATUS).optional().describe("Filter by case status."),
    limit: z.number().int().min(1).max(50).default(20).describe("Maximum cases to return."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ status, limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    let query = supabase
      .from("cases")
      .select("id, patient_initials, case_type, material, tooth_number, status, current_stage, progress, due_date, lab_id, created_at")
      .order("created_at", { ascending: false })
      .limit(limit ?? 20);
    if (status) query = query.eq("status", status);
    const { data, error } = await query;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? []) }],
      structuredContent: { cases: data ?? [] },
    };
  },
});
