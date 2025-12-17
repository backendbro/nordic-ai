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
      {/* HEADER HERO */}
      <div className="bg-slate-900/90 backdrop-blur-md border-b border-slate-700/50 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
        <div className="max-w-4xl mx-auto text-center px-6 py-20 md:px-12 md:py-32">
          <h1 className="text-5xl md:text-6xl font-semibold text-slate-100 leading-tight mb-6">
            {page.data.title}
          </h1>

          <div className="flex flex-col items-center gap-4 text-base text-slate-400">
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

          <div className="mt-12 h-px w-24 bg-gradient-to-r from-yellow-400/50 via-transparent to-yellow-400/50 mx-auto" />
        </div>
      </div>

      {/* PROJECT CONTENT: JUMBOTRON CARD */}
      <Bounded as="section">
        <div className="max-w-5xl mx-auto px-6 md:px-12 -mt-16 relative z-10">
          <div className="bg-slate-800/90 backdrop-blur-lg rounded-3xl border border-slate-700/60 shadow-2xl p-8 md:p-16 space-y-12">
            <div className="project-content prose prose-invert max-w-none">
              <SliceZone slices={page.data.slices} components={components} />
            </div>
          </div>
        </div>
      </Bounded>
    </article>
  );
}
