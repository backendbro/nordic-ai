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
    >
      {/* Section Heading */}
      <Heading as="h2" size="lg">
        {slice.primary.heading}
      </Heading>

      {/* Experience Cards */}
      {slice.primary.experience_details.map((item, index) => (
        <div
          key={index}
          className="
          mt-3
            w-full 
            max-w-xl 
            mx-auto
            mb-10
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
            md:ml-12
            md:mt-16
            md:p-6
          "
        >
          <Heading
            as="h3"
            size="sm"
            className="text-slate-100 text-xl font-bold leading-snug"
          >
            {item.title}
          </Heading>

          {/* Tags */}
          <div className="exp-tags">
            {item.college?.split("·").map((tag, i) => (
              <span key={i} className="exp-tag">
                {tag.trim()}
              </span>
            ))}
          </div>

          {/* Description */}
          <div className="exp-typography">
            <PrismicRichText field={item.description} />
          </div>
        </div>
      ))}
    </Bounded>
  );
};

export default Experience;
