import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listCasesTool from "./tools/list-cases";
import getCaseTool from "./tools/get-case";
import createCaseTool from "./tools/create-case";
import addCaseUpdateTool from "./tools/add-case-update";
import searchLabsTool from "./tools/search-labs";
import getMyProfileTool from "./tools/get-my-profile";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "dentaleem-labconnect",
  title: "dentaleem-labconnect",
  version: "0.1.0",
  instructions:
    "Tools for Dentaleem LabConnect, a dental clinic and lab case platform. Use `list_cases` and `get_case` to review cases, `create_case` to open a new draft case, `add_case_update` to post a status update, `search_labs` to browse the lab marketplace, and `get_my_profile` for the signed-in user's account details. All tools act as the signed-in user and only return data that user may access.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [
    listCasesTool,
    getCaseTool,
    createCaseTool,
    addCaseUpdateTool,
    searchLabsTool,
    getMyProfileTool,
  ],
});
