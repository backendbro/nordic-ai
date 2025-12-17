import { Content, DateField, isFilled } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import Bounded from "@/components/Bounded";

export default function ContentBody({
  page,
}: {
  page: Content.BlogPostDocument | Content.ProjectDocument;
}) {
  function formatDate(date: DateField) {
    if (isFilled.date(date)) {
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(date));
    }
  }

  const formattedDate = formatDate(page.data.date);

  return (
    <Bounded as="article">
      {/* WIDE, CONFIDENT CARD */}
      <div className="relative mx-auto max-w-6xl rounded-3xl border border-slate-700/50 bg-slate-900/90 backdrop-blur-xl shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]">
        <div className="px-8 py-16 md:px-16 md:py-24">
          {/* TITLE */}
          <h1 className="max-w-5xl text-4xl font-semibold leading-tight tracking-tight text-slate-100 md:text-5xl">
            {page.data.title}
          </h1>

          {/* META (STACKED, CALM) */}
          <div className="mt-6 flex flex-col gap-4">
            <time className="text-lg text-slate-400">{formattedDate}</time>

            <div className="flex flex-wrap gap-3">
              {page.tags.map((tag, index) => (
                <span
                  key={index}
                  className="rounded-full border border-yellow-400/40 bg-yellow-400/10 px-4 py-1.5 text-sm font-medium text-yellow-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* DIVIDER */}
          <div className="my-16 h-px w-full bg-gradient-to-r from-transparent via-slate-600 to-transparent" />

          {/* CONTENT BODY */}
          <div className="project-content prose prose-invert max-w-none">
            <SliceZone slices={page.data.slices} components={components} />
          </div>
        </div>
      </div>
    </Bounded>
  );
}
