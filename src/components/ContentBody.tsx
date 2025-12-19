"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Content, DateField, isFilled } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import Bounded from "@/components/Bounded";
import { useEffect, useState } from "react";

export default function ContentBody({
  page,
}: {
  page: Content.BlogPostDocument | Content.ProjectDocument;
}) {
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const updateReadingProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress = Math.min((scrollTop / docHeight) * 100, 100);
      setReadingProgress(progress);
    };

    window.addEventListener("scroll", updateReadingProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateReadingProgress);
  }, []);

  function formatDate(date: DateField) {
    if (isFilled.date(date)) {
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(date));
    }
  }

  function calculateReadingTime() {
    let totalWords = 0;

    if (page.data.title) {
      totalWords += page.data.title.split(/\s+/).length;
    }

    if (page.data.slices) {
      page.data.slices.forEach((slice: any) => {
        if (
          slice.slice_type === "text_block" ||
          slice.slice_type === "rich_text"
        ) {
          if (slice.primary?.text) {
            const text = slice.primary.text
              .map((item: any) => item.text || "")
              .join(" ");
            totalWords += text.split(/\s+/).length;
          }
        }

        if (slice.slice_type === "code_block") totalWords += 50;
        if (
          slice.slice_type === "image_block" ||
          slice.slice_type === "video_block"
        )
          totalWords += 20;
      });
    }

    return Math.max(1, Math.ceil(totalWords / 220));
  }

  const formattedDate = formatDate(page.data.date);
  const estimatedReadTime = calculateReadingTime();

  return (
    <>
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 w-full h-[2px] bg-slate-800/80 z-50">
        <div
          className="h-full bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <article className="relative">
        <Bounded as="section">
          <div
            className="
              mx-auto max-w-6xl px-8 md:px-16 py-16 md:py-24
              bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95
              border border-slate-700/50 rounded-3xl shadow-2xl backdrop-blur-lg
              space-y-14 relative overflow-hidden
            "
          >
            {/* Header */}
            <header className="text-center">
              <div className="flex justify-center items-center gap-3 text-sm text-slate-300 mb-6">
                <span>{estimatedReadTime} min read</span>
                <span>•</span>
                <time>{formattedDate}</time>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-8 bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 bg-clip-text text-transparent">
                {page.data.title}
              </h1>

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
            </header>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="h-px bg-slate-700 flex-1" />
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              <div className="h-px bg-slate-700 flex-1" />
            </div>

            {/* Content body */}
            <div className="project-content prose prose-invert max-w-none">
              <SliceZone slices={page.data.slices} components={components} />
            </div>

            {/* Footer CTA */}
            <footer className="pt-10 border-t border-slate-700/50 text-center">
              <p className="text-slate-400">
                Want a system like this built for your business?
              </p>
              <button className="mt-3 text-yellow-400 font-medium hover:text-yellow-300 transition-colors">
                Message me →
              </button>
            </footer>
          </div>
        </Bounded>
      </article>
    </>
  );
}
