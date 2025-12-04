import React from "react";
import "./Experience.css";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { JSX } from "react";

export type ExperienceProps = SliceComponentProps<Content.ExperienceSlice>;

const Experience = ({ slice }: ExperienceProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex flex-col items-center"
    >
      <Heading as="h2" size="lg" className="mb-10 text-center">
        {slice.primary.heading}
      </Heading>

      <div className="flex w-full max-w-4xl flex-col items-center gap-10">
        {slice.primary.experience_details.map((item, index) => (
          <div
            key={index}
            className="
              w-full 
              max-w-xl 
              rounded-xl 
              bg-slate-800/50 
              p-5 
              shadow-lg 
              ring-1 
              ring-slate-700 
              transition 
              duration-300 
              hover:ring-slate-500
              md:max-w-3xl
              md:p-7
            "
          >
            <Heading
              as="h3"
              size="sm"
              className="text-lg font-bold leading-snug text-slate-100 md:text-xl"
            >
              {item.title}
            </Heading>

            {/* TAGS */}
            <div className="exp-tags">
              {item.college?.split("·").map((tag, i) => (
                <span key={i} className="exp-tag">
                  {tag.trim()}
                </span>
              ))}
            </div>

            {/* DESCRIPTION */}
            <div className="exp-typography">
              <PrismicRichText field={item.description} />
            </div>
          </div>
        ))}
      </div>
    </Bounded>
  );
};

export default Experience;
