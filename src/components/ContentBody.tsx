/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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

    if (page.data.title) totalWords += page.data.title.split(/\s+/).length;

    if (page.data.slices) {
      page.data.slices.forEach((slice: any) => {
        if (
          slice.slice_type === "text_block" ||
          slice.slice_type === "rich_text"
        ) {
          if (slice.primary?.text) {
            const textContent = slice.primary.text
              .map((item: any) => item.text || "")
              .join(" ");
            totalWords += textContent
              .split(/\s+/)
              .filter((word: string) => word.length > 0).length;
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

    const readingSpeed = 220;
    const minutes = Math.ceil(totalWords / readingSpeed);
    return Math.max(1, minutes);
  }

  const formattedDate = formatDate(page.data.date);
  const estimatedReadTime = calculateReadingTime();

  return (
    <>
      {/* Subtle Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-800/50 backdrop-blur-sm z-50">
        <div
          className="h-full bg-gradient-to-r from-slate-600 via-slate-500 to-slate-400 transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <article className="relative">
        <Bounded as="section">
          {/* Enhanced Card Container */}
          <div
            className="mx-auto px-8 md:px-16 py-16 md:py-24 
                          bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 
                          border border-slate-700/50 rounded-3xl shadow-2xl backdrop-blur-lg space-y-12 relative overflow-hidden
                          max-w-5xl lg:max-w-6xl xl:max-w-7xl"
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/10 to-transparent rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/10 to-transparent rounded-full blur-xl" />

            {/* Header */}
            <div className="text-center relative z-10">
              <div className="inline-flex items-center gap-3 text-sm text-slate-200 font-semibold mb-6">
                <span className="flex items-center gap-2 font-semibold text-slate-100">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {estimatedReadTime} min read
                </span>
                <span>•</span>
                <time className="font-semibold text-slate-100">
                  {formattedDate}
                </time>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 bg-clip-text text-transparent leading-tight mb-8">
                {page.data.title}
              </h1>

              <div className="flex flex-wrap justify-center gap-3">
                {page.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="group relative rounded-full border border-yellow-400/40 bg-gradient-to-r from-yellow-400/10 to-yellow-500/10 px-4 py-2 text-sm font-medium text-yellow-300 transition-all duration-300 hover:border-yellow-400/60 hover:bg-yellow-400/20 hover:scale-105"
                  >
                    <span className="relative z-10">{tag}</span>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/0 via-yellow-400/10 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </span>
                ))}
              </div>
            </div>

            {/* Separator */}
            <div className="flex items-center justify-center space-x-4">
              <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent flex-1" />
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent flex-1" />
            </div>

            {/* Content Body */}
            <div className="project-content prose prose-invert max-w-none space-y-16 relative z-10">
              <SliceZone slices={page.data.slices} components={components} />
            </div>

            {/* Footer CTA */}
            <div className="pt-12 border-t border-slate-700/50 text-center">
              <div className="inline-flex items-center gap-3 text-slate-400 text-sm">
                <span>Enjoyed this project?</span>
                <button className="text-yellow-400 hover:text-yellow-300 transition-colors duration-200 font-medium">
                  Share it →
                </button>
              </div>
            </div>
          </div>
        </Bounded>
      </article>
    </>
  );
}
