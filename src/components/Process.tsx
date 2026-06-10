"use client";

import { useInView } from "@/lib/utils";

const STEPS = [
  {
    number: "01",
    title: "Discovery Call",
    description:
      "We learn about your business, goals, and vision. No technical jargon — just a conversation about what you need.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "AI-Powered Design",
    description:
      "Our AI tools generate a stunning, custom design tailored to your brand. You review and provide feedback — we iterate fast.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Build & Launch",
    description:
      "We develop your site using modern frameworks, optimize for speed and SEO, and launch it live. You get a beautiful site in days, not months.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
  },
];

export default function Process() {
  const [ref, inView] = useInView();

  return (
    <section id="process" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-purple-950/10 to-[#0a0a1a]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          ref={ref}
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-teal-400">
            How It Works
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            From Idea to{" "}
            <span className="gradient-text">Launch</span>
          </h2>
          <p className="mt-4 text-gray-400 text-lg">
            Our streamlined process delivers results fast without sacrificing
            quality.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-20">
          {/* Connecting line (desktop) */}
          <div className="absolute top-12 left-0 right-0 hidden md:block">
            <div className="h-0.5 bg-gradient-to-r from-purple-500/20 via-teal-500/40 to-purple-500/20 mx-16" />
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {STEPS.map((step, i) => {
              const [stepRef, stepInView] = useInView();
              return (
                <div
                  key={step.number}
                  ref={stepRef}
                  className={`relative flex flex-col items-center text-center transition-all duration-700 ${
                    stepInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${i * 200}ms` }}
                >
                  {/* Number circle */}
                  <div className="relative mb-6">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full glass-light border border-white/5 group hover:border-purple-500/30 transition-all duration-300">
                      <div className="text-purple-400 group-hover:gradient-text transition-all duration-300">
                        {step.icon}
                      </div>
                    </div>
                    {/* Step number badge */}
                    <div className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-teal-500 text-[10px] font-bold text-white">
                      {step.number}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white">{step.title}</h3>
                  <p className="mt-3 text-gray-400 text-sm leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Trust indicator */}
        <div
          className={`mx-auto mt-20 max-w-3xl rounded-2xl glass-light p-8 text-center transition-all duration-1000 ${
            inView ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="text-3xl mb-2">⚡</div>
          <p className="text-gray-300 text-lg font-medium">
            Typical delivery time:{" "}
            <span className="gradient-text font-bold">under 48 hours</span> from
            design approval to launch
          </p>
          <p className="mt-2 text-gray-500 text-sm">
            No lengthy contracts. No hidden fees. Just results.
          </p>
        </div>
      </div>
    </section>
  );
}