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
    <section className="my-24">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-slate-700/50 shadow-2xl">
        <div
          className="relative aspect-video w-full [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:h-full [&_iframe]:w-full"
          dangerouslySetInnerHTML={{ __html: video.html }}
        />
      </div>
    </section>
  );
};

export default VideoBlock;
