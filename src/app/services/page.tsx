import type { Metadata } from "next";
import Link from "next/link";
import { getAllServices } from "@/lib/content/services";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Services — Driftpilot",
  description:
    "AI website development, headless WordPress, Next.js builds, and lead generation systems.",
  path: "/services",
});

export default function ServicesPage() {
  const services = getAllServices();
  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-16 md:px-8 md:py-24">
      <h1 className="text-4xl font-semibold tracking-tight">Services</h1>
      <ul className="mt-8 space-y-4">
        {services.map((service) => (
          <li key={service.slug}>
            <Link
              href={`/services/${service.slug}`}
              className="text-lg underline-offset-4 hover:underline"
            >
              {service.name}
            </Link>
            <p className="text-zinc-600">{service.excerpt}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
