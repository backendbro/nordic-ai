"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

export type VideoBlockProps =
  SliceComponentProps<Content.VideoBlockSlice>;

const VideoBlock: FC<VideoBlockProps> = ({ slice }) => {
  const video = slice.primary.video;

  if (!video || !("html" in video) || !video.html) {
    return null;
  }

  return (
    <div className="relative w-full my-12 rounded-2xl shadow-2xl overflow-hidden">
      <div className="relative aspect-video bg-slate-800">
        <div
          className="absolute inset-0"
          dangerouslySetInnerHTML={{
            __html: video.html.replace(
              "<iframe",
              '<iframe style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;border-radius:1rem"'
            ),
          }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10 ring-inset" />
    </div>
  );
};

export default VideoBlock;
