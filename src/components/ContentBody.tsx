/* eslint-disable @next/next/no-img-element */
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
    <article className="relative">
      {/* FULL-WIDTH HERO HEADER */}
      <header className="relative w-full bg-gradient-to-b from-slate-900/95 via-slate-900/80 to-slate-900/80">
        {/* Optional hero image overlay */}
        {page.data.hover_image?.url && (
          // eslint-disable-next-line react/jsx-no-comment-textnodes
          <div className="absolute inset-0">
            <img
              src={page.data.hover_image.url}
              alt={page?.data?.title || ""}
              className="w-full h-full object-cover brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
          </div>
        )}

        {/* Hero content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center px-6 py-28 md:px-12 md:py-40">
          <h1 className="text-5xl md:text-6xl font-semibold text-slate-100 leading-tight mb-6">
            {page.data.title}
          </h1>

          <div className="flex flex-col items-center gap-4 text-base text-slate-300">
            <time className="text-lg">{formattedDate}</time>

            <div className="flex flex-wrap justify-center gap-3">
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

          <div className="mt-12 h-px w-28 bg-gradient-to-r from-yellow-400/50 via-transparent to-yellow-400/50 mx-auto rounded-full" />
        </div>
      </header>

      {/* PROJECT CONTENT */}
      <Bounded as="section">
        <div className="max-w-5xl mx-auto px-6 py-16 md:px-12 md:py-24">
          <div className="project-content prose prose-invert max-w-none">
            <SliceZone slices={page.data.slices} components={components} />
          </div>
        </div>
      </Bounded>
    </article>
  );
}
