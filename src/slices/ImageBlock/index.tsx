import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicImage } from "@prismicio/react";

export type ImageBlockProps = SliceComponentProps<Content.ImageBlockSlice>;

const ImageBlock: FC<ImageBlockProps> = ({ slice }) => {
  return (
    <figure className="relative w-full overflow-hidden rounded-2xl my-8">
      <PrismicImage
        field={slice.primary.image}
        className="w-full h-auto object-cover object-center transition-transform duration-700 hover:scale-[1.02] block"
        imgixParams={{
          w: 1200,
          h: 800,
          fit: "crop",
          auto: ["format", "compress"],
        }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
      />
      {/* Optional overlay for aesthetic effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
    </figure>
  );
};

export default ImageBlock;
