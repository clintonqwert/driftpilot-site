import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllCaseStudies,
  getCaseStudyBySlug,
} from "@/lib/content/case-studies";
import { buildMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const studies = await getAllCaseStudies();
  return studies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata(
  props: PageProps<"/work/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) return {};
  return buildMetadata({
    title: `${study.headline} — Driftpilot Work`,
    description: `${study.stat} for a ${study.industry} client — ${study.methodology}.`,
    path: `/work/${study.slug}`,
  });
}

export default async function CaseStudyPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) notFound();

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-16 md:px-8 md:py-24">
      <h1 className="text-4xl font-semibold tracking-tight">
        {study.headline}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-zinc-600">{study.problem}</p>
    </main>
  );
}
