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
  name: "add_case_update",
  title: "Add case update",
  description:
    "Post a status update with an optional message to a case the signed-in user can access.",
  inputSchema: {
    case_id: z.string().uuid().describe("The case ID."),
    status: z.enum(CASE_STATUS).describe("Status reported by this update."),
    message: z.string().trim().max(1000).optional().describe("Note to show on the case timeline."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async ({ case_id, status, message }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("case_updates")
      .insert({ case_id, status, message: message ?? null, created_by: ctx.getUserId() })
      .select()
      .maybeSingle();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
      structuredContent: { update: data },
    };
  },
});
