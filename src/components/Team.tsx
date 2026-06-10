"use client";

import { useInView } from "@/lib/utils";

const TEAM_MEMBERS = [
  {
    name: "Alex Chen",
    role: "Lead Strategist",
    initials: "AC",
    gradient: "from-purple-500 to-purple-700",
    description: "Visionary leader driving AI-powered web solutions.",
  },
  {
    name: "Maya Rodriguez",
    role: "Market Researcher",
    initials: "MR",
    gradient: "from-teal-400 to-teal-600",
    description: "Identifies opportunities and understands client needs.",
  },
  {
    name: "James Wilson",
    role: "Sales Executive",
    initials: "JW",
    gradient: "from-purple-400 to-teal-500",
    description: "Connects businesses with the perfect web solution.",
  },
  {
    name: "Sarah Kim",
    role: "Web Developer",
    initials: "SK",
    gradient: "from-teal-500 to-purple-600",
    description: "Builds stunning, high-performance websites using AI.",
  },
];

export default function Team() {
  const [ref, inView] = useInView();

  return (
    <section id="team" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          ref={ref}
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-purple-400">
            Our Team
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Meet the <span className="gradient-text">Crankson</span> Crew
          </h2>
          <p className="mt-4 text-gray-400 text-lg">
            A dedicated team combining AI expertise with web development
            excellence.
          </p>
        </div>

        {/* Team grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM_MEMBERS.map((member, i) => {
            const [cardRef, cardInView] = useInView();
            return (
              <div
                key={member.name}
                ref={cardRef}
                className={`group rounded-2xl glass-light p-6 text-center transition-all duration-700 hover:glass hover:border-purple-500/20 hover:-translate-y-1 ${
                  cardInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Avatar */}
                <div
                  className={`mx-auto h-20 w-20 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center text-2xl font-bold text-white shadow-lg`}
                >
                  {member.initials}
                </div>

                <h3 className="mt-4 text-lg font-bold text-white">
                  {member.name}
                </h3>
                <p className="text-sm gradient-text font-medium">
                  {member.role}
                </p>
                <p className="mt-3 text-gray-500 text-xs leading-relaxed">
                  {member.description}
                </p>

                {/* Social links placeholder */}
                <div className="mt-4 flex justify-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-gray-500 hover:bg-purple-500/20 hover:text-purple-400 transition-all duration-200 cursor-pointer">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-gray-500 hover:bg-teal-500/20 hover:text-teal-400 transition-all duration-200 cursor-pointer">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}