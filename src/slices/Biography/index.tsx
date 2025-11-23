import clsx from "clsx";
import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";

import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { JSX } from "react";
// import Avatar from "./Avatar";

/**
 * Props for `Biography`.
 */
export type BiographyProps = SliceComponentProps<Content.BiographySlice>;

/**
 * Component for "Biography" Slices.
 */
const Biography = ({ slice }: BiographyProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid gap-x-5 gap-y-6 md:grid-cols-[2fr,1fr]">
        <Heading size="xl" className="col-start-1">
          About Nordic AI
        </Heading>

        <div
          className={clsx(
            "col-start-1",
            // larger, more inviting text
            "text-slate-100 text-lg md:text-xl font-medium",
            // better line spacing for comfortable reading
            "leading-relaxed tracking-wide",
            // more space between paragraphs
            "space-y-6",
            // list styling
            "[&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2",
            "[&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2",
            // link styling
            "[&>a]:underline [&>a]:decoration-slate-400 [&>a]:hover:decoration-slate-200",
            // strong + blockquote
            "[&>strong]:font-semibold",
            "[&>blockquote]:pl-5 [&>blockquote]:border-l-4 [&>blockquote]:border-slate-600 [&>blockquote]:italic",
            // Optional soft fade-in animation if your setup allows
            "animate-fadeIn"
          )}
        >
          <PrismicRichText field={slice.primary.description} />
        </div>

        <Button
          className="text-slate-900"
          linkField={slice.primary.button_link}
          label={slice.primary.button_text}
        />
        {/* <Avatar
          image={slice.primary.avatar}
          alt="Primary avatar"
          className="row-start-1 max-w-sm md:col-start-2 md:row-end-3"
        /> */}
      </div>
    </Bounded>
  );
};

export default Biography;
