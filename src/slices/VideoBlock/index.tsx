"use client";

import { FC, useRef, useEffect } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

export type VideoBlockProps = SliceComponentProps<Content.VideoBlockSlice>;

const VideoBlock: FC<VideoBlockProps> = ({ slice }) => {
  const video = slice.primary.video;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure iframe stays stable during scroll
    if (containerRef.current) {
      const iframe = containerRef.current.querySelector("iframe");
      if (iframe) {
        iframe.style.pointerEvents = "auto";
        iframe.style.transform = "translateZ(0)"; // Force hardware acceleration
      }
    }
  }, []);

  if (!video || !("html" in video) || !video.html) {
    return null;
  }

  return (
    <div className="group relative w-full overflow-hidden rounded-2xl my-12 shadow-2xl">
      <div className="relative overflow-hidden rounded-2xl bg-slate-800">
        <div className="relative aspect-video w-full">
          <div
            ref={containerRef}
            className="absolute inset-0 w-full h-full will-change-transform"
            style={{
              contain: "layout style paint",
              transform: "translateZ(0)", // Force GPU acceleration
            }}
            dangerouslySetInnerHTML={{
              __html: video.html.replace(
                "<iframe",
                '<iframe style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;border-radius:1rem;will-change:transform;transform:translateZ(0)"'
              ),
            }}
          />
        </div>

        {/* Subtle border effect */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 ring-inset pointer-events-none" />
      </div>
    </div>
  );
};

export default VideoBlock;
