import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/shared/JsonLd";
import { getAllServices, getServiceBySlug } from "@/lib/content/services";
import { buildMetadata, serviceSchema } from "@/lib/seo";

export function generateStaticParams() {
  return getAllServices().map((service) => ({ slug: service.slug }));
}

export async function generateMetadata(
  props: PageProps<"/services/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.title,
    description: service.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage(
  props: PageProps<"/services/[slug]">,
) {
  const { slug } = await props.params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-16 md:px-8 md:py-24">
      <JsonLd schema={serviceSchema(service)} />
      <h1 className="text-4xl font-semibold tracking-tight">{service.name}</h1>
      <p className="mt-4 max-w-2xl text-lg text-zinc-600">
        {service.description}
      </p>
    </main>
  );
}
