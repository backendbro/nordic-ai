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
  console.log(page.data);

  return (
    <Bounded as="article">
      <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 px-4 py-10 md:px-8 md:py-20">
        <Heading as="h1">{page.data.title}</Heading>
        <div className="flex gap-4 text-yellow-400">
          {page.tags.map((tag, index) => (
            <span key={index} className="text-xl font-bold">
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-8 border-b border-slate-600 text-xl font-medium text-slate-300">
          {formattedDate}
        </p>

        <div className="body-wrapper">
          <div className="markdown-style">
            <SliceZone slices={page.data.slices} components={components} />
          </div>
        </div>
      </div>
    </Bounded>
  );
}
