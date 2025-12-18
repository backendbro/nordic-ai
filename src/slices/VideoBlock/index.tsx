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
    <div className="group relative w-full overflow-hidden rounded-2xl my-12 shadow-2xl">
      <div className="relative overflow-hidden rounded-2xl bg-slate-800">
        <div className="relative aspect-video w-full">
          <div
            className="absolute inset-0 w-full h-full [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:border-0 [&_iframe]:rounded-2xl"
            dangerouslySetInnerHTML={{ __html: video.html }}
          />
        </div>

        {/* Subtle border effect */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 ring-inset" />
      </div>
    </div>
  );
};

export default VideoBlock;
