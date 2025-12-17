import { Content, DateField, isFilled } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { components } from "@/slices";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";

interface ReadingTimeProps {
  minutes: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ReadingTime: React.FC<ReadingTimeProps> = ({ minutes }) => (
  <span className="text-gray-500 text-sm blog-reading-time">
    {minutes} min read
  </span>
);

export default function ContentBody({
  page,
}: {
  page: Content.BlogPostDocument | Content.ProjectDocument;
}) {
  function formatDate(date: DateField) {
    if (isFilled.date(date)) {
      return new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(date));
    }
  }

  const formattedDate = formatDate(page.data.date);

  return (
    <Bounded as="article">
      {/* JUMBOTRON CARD */}
      <div className="relative mx-auto max-w-4xl rounded-3xl border border-slate-700/60 bg-slate-900/80 backdrop-blur-xl shadow-[0_0_80px_-20px_rgba(0,0,0,0.8)]">
        <div className="px-6 py-12 md:px-12 md:py-20">
          {/* HEADER */}
          <header className="space-y-6">
            <Heading as="h1" size="xl">
              {page.data.title}
            </Heading>

            {/* META */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
              <time>{formattedDate}</time>

              <span className="h-1 w-1 rounded-full bg-slate-500" />

              <div className="flex gap-2">
                {page.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs font-medium text-yellow-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {/* DIVIDER */}
          <div className="my-12 h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

          {/* BODY */}
          <div className="prose prose-invert prose-lg max-w-none prose-headings:scroll-mt-32 prose-a:text-yellow-400 hover:prose-a:text-yellow-300">
            <SliceZone slices={page.data.slices} components={components} />
          </div>
        </div>
      </div>
    </Bounded>
  );
}
