import type { Metadata } from "next";
import Link from "next/link";
import { getAllCaseStudies } from "@/lib/content/case-studies";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Work — Driftpilot",
  description:
    "Case studies: measurable outcomes from AI-built websites and lead generation systems.",
  path: "/work",
});

export default async function WorkPage() {
  const studies = await getAllCaseStudies();
  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-16 md:px-8 md:py-24">
      <h1 className="text-4xl font-semibold tracking-tight">Work</h1>
      <ul className="mt-8 space-y-4">
        {studies.map((study) => (
          <li key={study.slug}>
            <Link
              href={`/work/${study.slug}`}
              className="text-lg underline-offset-4 hover:underline"
            >
              {study.headline}
            </Link>
            <p className="text-zinc-600">
              {study.industry} · {study.stat}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
