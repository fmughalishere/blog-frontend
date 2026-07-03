// This constant identifies which site this frontend deployment belongs to.
// The shared backend uses it to keep each site's blogs completely separate —
// this frontend will only ever fetch and create "general" blogs.
export const SITE_TYPE = "general" as const;
