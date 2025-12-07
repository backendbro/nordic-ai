import { FC } from "react";
import { SliceComponentProps } from "@prismicio/react";
import { Content } from "@prismicio/client";

/**
 * Props for "VideoBlock" Slices.
 * Ensures TypeScript knows that slice.primary.video.url exists.
 */
export type VideoBlockProps = SliceComponentProps<
  Content.VideoBlockSlice & {
    primary: {
      video: {
        url: string;
      };
    };
  }
>;

/**
 * Component for "VideoBlock" Slices.
 */
const VideoBlock: FC<VideoBlockProps> = ({ slice }) => {
  // safely extract video URL
  const videoUrl = slice.primary?.video?.url;

  if (!videoUrl) return null; // don't render if URL is missing

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative w-full h-0 my-8"
      style={{ paddingBottom: "56.25%" }} // 16:9 aspect ratio
    >
      <iframe
        src={videoUrl}
        title="Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full rounded-md shadow-md"
      />
    </section>
  );
};

export default VideoBlock;
