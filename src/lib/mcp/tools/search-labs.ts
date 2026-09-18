import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "search_labs",
  title: "Search labs",
  description:
    "Search the marketplace of dental labs by name or specialty, with rating, turnaround and base price.",
  inputSchema: {
    query: z.string().trim().optional().describe("Text to match against the lab name."),
    specialty: z.string().trim().optional().describe("Specialty the lab must offer, e.g. Zirconia."),
    verified_only: z.boolean().default(false).describe("Only return verified labs."),
    limit: z.number().int().min(1).max(50).default(20).describe("Maximum labs to return."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ query, specialty, verified_only, limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    let q = supabase
      .from("labs")
      .select("id, name, description, specialties, certifications, rating, total_reviews, avg_turnaround_days, base_price, is_verified")
      .order("rating", { ascending: false })
      .limit(limit ?? 20);
    if (query) q = q.ilike("name", `%${query}%`);
    if (specialty) q = q.contains("specialties", [specialty]);
    if (verified_only) q = q.eq("is_verified", true);
    const { data, error } = await q;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? []) }],
      structuredContent: { labs: data ?? [] },
    };
  },
});
