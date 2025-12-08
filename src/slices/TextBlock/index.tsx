import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";

export type TextBlockProps = SliceComponentProps<Content.TextBlockSlice>;

const TextBlock: FC<TextBlockProps> = ({ slice }) => {
  return (
    <section className="mx-auto my-16 max-w-3xl">
      <div
        className="
          prose 
          prose-invert 
          prose-slate 
          prose-lg 
          leading-[1.85]
          prose-p:my-6
          prose-h2:mt-16 prose-h2:mb-6
          prose-h3:mt-12 prose-h3:mb-4
          prose-blockquote:border-l-yellow-400
          prose-blockquote:bg-slate-800/50
          prose-blockquote:px-6
          prose-blockquote:py-4
          prose-img:rounded-2xl
          prose-img:shadow-xl
        "
      >
        <PrismicRichText field={slice.primary.text} />
      </div>
    </section>
  );
};

export default TextBlock;
