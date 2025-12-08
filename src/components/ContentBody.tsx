import { Content, DateField, isFilled } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { components } from "@/slices";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";

export default function ContentBody({
  page,
}: {
  page: Content.BlogPostDocument | Content.ProjectDocument;
}) {
  function formatDate(date: DateField) {
    if (isFilled.date(date)) {
      const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };

      return new Intl.DateTimeFormat("en-US", dateOptions).format(
        new Date(date)
      );
    }
  }

  const formattedDate = formatDate(page.data.date);

  return (
    <Bounded as="article">
      <article className="relative px-4 py-12 md:px-10 md:py-20">
        {/* ================= HEADER ================= */}
        <header className="mx-auto max-w-4xl text-center">
          <span className="mb-4 inline-block rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-yellow-300">
            Case Study / Insight
          </span>

          <Heading
            as="h1"
            className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight"
          >
            {page.data.title}
          </Heading>

          {/* ========== TAGS (PILLS UNTOUCHED) ========== */}
          {page.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {page.tags.map((tag, index) => (
                <span
                  key={index}
                  className="rounded-full border border-slate-600 bg-slate-800/50 px-4 py-1 text-sm font-semibold text-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* ========== DATE (PLAIN TEXT, NO PILL) ========== */}
          {formattedDate && (
            <p className="mt-6 text-sm font-medium uppercase tracking-widest text-slate-400">
              {formattedDate}
            </p>
          )}

          {/* Divider */}
          <div className="mx-auto mt-12 h-px w-40 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-70" />
        </header>

        {/* ================= CONTENT (NO JUMBOTRON, NO CARD) ================= */}
        <section className="mt-20">
          <div className="mx-auto max-w-4xl">
            <SliceZone slices={page.data.slices} components={components} />
          </div>
        </section>
      </article>
    </Bounded>
  );
}
