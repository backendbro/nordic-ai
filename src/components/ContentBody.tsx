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
      {/* CARD CONTAINER WITH AESTHETIC FLAIR */}
      <Bounded as="section">
        <div className="max-w-4xl mx-auto px-8 md:px-16 py-16 md:py-24 bg-slate-900/90 border border-slate-700/50 rounded-3xl shadow-2xl backdrop-blur-lg space-y-12">
          {/* HEADER INSIDE CARD */}
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-100 leading-tight mb-4">
              {page.data.title}
            </h1>

            <time className="block text-lg text-slate-400 mb-4">
              {formattedDate}
            </time>

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

          {/* CONTENT BODY */}
          <div className="project-content prose prose-invert max-w-none space-y-16">
            <SliceZone slices={page.data.slices} components={components} />
          </div>
        </div>
      </Bounded>
    </article>
  );
}
