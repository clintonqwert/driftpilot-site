import Link from "next/link";
import { SERVICES_NAV } from "@/lib/content/navigation";

// Custom 404 per sitemap §2.6 — service links + CTA, never a dead end.
export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-16 md:px-8 md:py-24">
      <h1 className="text-4xl font-semibold tracking-tight">
        Page not found
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-zinc-600">
        That page drifted off course. Here&apos;s where to go instead:
      </p>
      <ul className="mt-8 space-y-2">
        {SERVICES_NAV.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="underline underline-offset-4">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/contact"
        className="mt-8 inline-block font-medium underline underline-offset-4"
      >
        Book a Scope Call
      </Link>
    </main>
  );
}
