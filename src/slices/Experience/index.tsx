import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { JSX } from "react";

/**
 * Props for `Experience`.
 */
export type ExperienceProps = SliceComponentProps<Content.ExperienceSlice>;

/**
 * Component for "Experience" Slices.
 */
const Experience = ({ slice }: ExperienceProps): JSX.Element => {
  console.log(slice);
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Heading as="h2" size="lg">
        {slice.primary.heading}
      </Heading>
      {slice.primary.experience_details.map((item, index) => (
        <div
          key={index}
          className="ml-6 mt-10 max-w-3xl rounded-xl bg-slate-800/50 p-6 shadow-lg ring-1 ring-slate-700 transition duration-300 hover:ring-slate-500 md:ml-12 md:mt-16"
        >
          <Heading
            as="h3"
            size="sm"
            className="text-slate-100 text-xl font-bold tracking-wide leading-relaxed"
          >
            {item.title}
          </Heading>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 text-lg font-medium text-slate-400 leading-relaxed">
            <span>{item.time_period}</span>
            <span className="text-2xl font-thin text-slate-500">/</span>
            <span>{item.college}</span>
          </div>

          <div className="prose prose-lg prose-invert mt-5 text-slate-200 leading-loose">
            <PrismicRichText field={item.description} />
          </div>
        </div>
      ))}
    </Bounded>
  );
};

export default Experience;
