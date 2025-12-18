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
      {/* CARD CONTAINER */}
      <Bounded as="section">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 bg-slate-900 border border-slate-700 shadow-lg">
          {/* HEADER INSIDE CARD */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-semibold text-slate-100 leading-tight mb-4">
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
          <div className="project-content prose prose-invert max-w-none space-y-12">
            <SliceZone slices={page.data.slices} components={components} />
          </div>
        </div>
      </Bounded>
    </article>
  );
}
