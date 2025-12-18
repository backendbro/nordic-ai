import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicImage } from "@prismicio/react";

export type ImageBlockProps = SliceComponentProps<Content.ImageBlockSlice>;

const ImageBlock: FC<ImageBlockProps> = ({ slice }) => {
  return (
    <figure className="group relative w-full overflow-hidden rounded-2xl my-12 shadow-2xl">
      <div className="relative overflow-hidden rounded-2xl bg-slate-800">
        <PrismicImage
          field={slice.primary.image}
          className="w-full h-auto object-cover object-center transition-all duration-700 group-hover:scale-[1.03] block"
          imgixParams={{
            w: 1200,
            auto: ["format", "compress"],
            q: 85,
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
        />
        {/* Aesthetic overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Subtle border effect */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 ring-inset" />
      </div>

      {/* Optional caption support */}
    </figure>
  );
};

export default ImageBlock;
