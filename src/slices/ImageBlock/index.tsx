import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicImage } from "@prismicio/react";

export type ImageBlockProps = SliceComponentProps<Content.ImageBlockSlice>;

const ImageBlock: FC<ImageBlockProps> = ({ slice }) => {
  return (
    <section className="my-24">
      <figure className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-800 shadow-2xl">
        <PrismicImage
          field={slice.primary.image}
          className="w-full object-cover transition-transform duration-700 hover:scale-[1.015]"
          imgixParams={{ w: 1800 }}
        />

        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </figure>
    </section>
  );
};

export default ImageBlock;
