// slices/VideoBlock.tsx - Updated
import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

export type VideoBlockProps = SliceComponentProps<Content.VideoBlockSlice>;

const VideoBlock: FC<VideoBlockProps> = ({ slice }) => {
  const video = slice.primary.video;

  if (!video || !("html" in video) || !video.html) {
    return null;
  }

  return (
    <div className="my-12 group">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-500">
        <div
          className="relative aspect-video w-full overflow-hidden [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:h-full [&_iframe]:w-full"
          dangerouslySetInnerHTML={{ __html: video.html }}
        />

        {/* Play overlay for visual feedback */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoBlock;
