import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "get_case",
  title: "Get case details",
  description:
    "Get one dental case with its recent status updates and production stages, by case ID.",
  inputSchema: {
    case_id: z.string().uuid().describe("The case ID."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ case_id }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data: kase, error } = await supabase
      .from("cases")
      .select("*")
      .eq("id", case_id)
      .maybeSingle();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    if (!kase) {
      return { content: [{ type: "text", text: "Case not found or not accessible" }], isError: true };
    }
    const [{ data: updates }, { data: stages }] = await Promise.all([
      supabase
        .from("case_updates")
        .select("id, status, message, created_at")
        .eq("case_id", case_id)
        .order("created_at", { ascending: false })
        .limit(20),
      supabase
        .from("case_stages")
        .select("*")
        .eq("case_id", case_id),
    ]);
    const payload = { case: kase, updates: updates ?? [], stages: stages ?? [] };
    return {
      content: [{ type: "text", text: JSON.stringify(payload) }],
      structuredContent: payload,
    };
  },
});
