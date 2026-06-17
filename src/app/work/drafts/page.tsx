import Link from "next/link";
import ShowcasePageLayout from "@/components/ShowcasePageLayout";
import { getDraftCases } from "@/lib/cases";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nic Blunck — Drafts",
  robots: { index: false, follow: false },
};

export default function DraftCasesPage() {
  const drafts = getDraftCases();

  return (
    <ShowcasePageLayout eyebrow="Unlisted" title="Draft Case Studies">
      {drafts.length ? (
        <ul className="flex flex-col divide-y divide-[var(--semantic-border-default)]">
          {drafts.map((item) => (
            <li key={item.id} className="py-4">
              <Link href={`/work/${item.slug}`} className="flex flex-col gap-1 hover:opacity-70">
                <span className="text-body-xl">{item.title}</span>
                {item.client ? (
                  <span className="text-sm text-[var(--semantic-text-secondary)]">
                    {item.client}
                  </span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-[var(--semantic-text-secondary)]">No draft cases right now.</p>
      )}
    </ShowcasePageLayout>
  );
}
