/**
 * WPGraphQL queries — Phase 2 (handoff doc §12).
 * Draft shapes only; finalize against the staging WP schema once the
 * case_study CPT + ACF field groups exist. ACF field names mirror
 * types/content.ts 1:1 so adapters stay boring.
 */

export const CASE_STUDIES_QUERY = /* GraphQL */ `
  query CaseStudies {
    caseStudies(first: 100) {
      nodes {
        slug
        caseStudyFields {
          industry
          service
          headline
          methodology
          technologies
          stat
          problem
          build
          result
          timeframe
        }
        date
      }
    }
  }
`;
