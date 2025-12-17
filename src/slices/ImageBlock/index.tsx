// slices/ImageBlock.tsx - Enhanced with more optimization
import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicImage } from "@prismicio/react";

export type ImageBlockProps = SliceComponentProps<Content.ImageBlockSlice>;

const ImageBlock: FC<ImageBlockProps> = ({ slice }) => {
  // For performance optimization
  const imageSizes =
    "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px";

  return (
    <figure className="my-12 group">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-500">
        <PrismicImage
          field={slice.primary.image}
          className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          imgixParams={{
            w: 1600,
            h: 900,
            q: 80,
            auto: ["format", "compress"], // Correct array format
            fit: "crop", // or "max" depending on your needs
            crop: ["focalpoint"], // Smart cropping
            fpX: 0.5,
            fpY: 0.5,
            // Add WebP format for better compression
            fm: "webp",
            // Blur placeholder for LQIP (Low Quality Image Placeholder)
            blur: 20,
            px: 16,
          }}
          // Add responsive image attributes
          sizes={imageSizes}
          // Optional: Add loading="lazy" for below-the-fold images
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Optional caption */}
      </div>
    </figure>
  );
};

export default ImageBlock;
