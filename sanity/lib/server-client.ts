import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, readToken } from "../env";

/**
 * Server-only Sanity client for fetching from private datasets using the read token.
 * Never import or use this client in client components.
 */
export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Always fetch fresh data on the server
  token: readToken,
  perspective: "published",
});
