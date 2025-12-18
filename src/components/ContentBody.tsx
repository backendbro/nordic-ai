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
    <article className="min-h-screen background-gradient">
      {/* Main content container with proper contrast */}
      <div className="pt-8 pb-24">
        {/* Jumbotron header card */}
        <div className="max-w-4xl mx-auto px-6 mb-12">
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 md:p-12 shadow-2xl">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-semibold text-slate-100 leading-tight mb-6">
              {page.data.title}
            </h1>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <time className="text-slate-300 text-lg">{formattedDate}</time>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {page.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gradient-to-r from-yellow-400/10 to-amber-400/10 border border-yellow-400/30 text-yellow-300 text-sm font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
          </div>
        </div>

        {/* Content card with proper contrast */}
        <Bounded>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-6 md:p-8 shadow-2xl">
              {/* Content area with readable width */}
              <div className="project-content">
                <SliceZone slices={page.data.slices} components={components} />
              </div>
            </div>
          </div>
        </Bounded>
      </div>
    </article>
  );
}
