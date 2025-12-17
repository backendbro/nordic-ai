// components/ProjectHero.tsx
import Heading from "@/components/Heading";

interface ProjectHeroProps {
  title: string;
  tags: string[];
  date: string;
  readingTime?: string;
}

const ProjectHero: React.FC<ProjectHeroProps> = ({
  title,
  tags,
  date,
  readingTime,
}) => {
  return (
    <div className="relative mb-16 md:mb-24">
      {/* Jumbotron with gradient overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-purple-900/20 to-slate-900/90 rounded-3xl -z-10" />

      <div className="relative px-6 py-12 md:px-12 md:py-20 rounded-3xl border border-slate-700/50 backdrop-blur-sm bg-slate-900/40 shadow-2xl">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <Heading
            as="h1"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            {title}
          </Heading>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mb-8">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-300 text-sm font-semibold rounded-full border border-purple-500/30 hover:border-purple-400/50 transition-colors duration-300 cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Meta information */}
          <div className="flex flex-wrap items-center gap-6 text-slate-300">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <time className="font-medium">{date}</time>
            </div>

            {readingTime && (
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-medium">{readingTime} min read</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <span className="font-medium">Project Showcase</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHero;
