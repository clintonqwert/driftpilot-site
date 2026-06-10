import "server-only";

/**
 * WPGraphQL fetch wrapper — Phase 2 (handoff doc §12).
 * Stub now; nothing imports this until the CMS integration lands.
 * Uses Next.js tag-based caching so a WP publish webhook can
 * revalidateTag() without redeploys.
 */

interface CmsFetchOptions {
  variables?: Record<string, unknown>;
  /** Cache tags for revalidateTag()-driven ISR */
  tags?: string[];
}

export async function cmsFetch<T>(
  query: string,
  { variables, tags }: CmsFetchOptions = {},
): Promise<T> {
  const endpoint = process.env.WPGRAPHQL_ENDPOINT;
  if (!endpoint) {
    throw new Error(
      "WPGRAPHQL_ENDPOINT is not set. lib/cms is a Phase 2 integration — see driftpilot-developer-handoff.md §12.",
    );
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.WPGRAPHQL_AUTH_TOKEN && {
        Authorization: `Bearer ${process.env.WPGRAPHQL_AUTH_TOKEN}`,
      }),
    },
    body: JSON.stringify({ query, variables }),
    next: { tags },
  });

  if (!res.ok) {
    throw new Error(`[cms] GraphQL request failed: ${res.status}`);
  }

  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(`[cms] GraphQL errors: ${JSON.stringify(json.errors)}`);
  }
  return json.data as T;
}
