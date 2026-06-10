"use client";

import { useInView } from "@/lib/utils";
import Image from "next/image";

const SERVICES = [
  {
    title: "New Website Creation",
    description:
      "From scratch to launch — we build modern, responsive websites that capture your brand and convert visitors into customers. Powered by AI for speed and quality.",
    image: "/images/service-design.jpg",
    features: [
      "Custom design tailored to your brand",
      "Mobile-first responsive layout",
      "SEO-optimized structure",
      "Fast loading & performance tuned",
    ],
  },
  {
    title: "Website Modernization",
    description:
      "Have an old or outdated site? We transform it into a sleek, modern experience with the latest tech — without losing your existing content or SEO rankings.",
    image: "/images/service-modern.jpg",
    features: [
      "Modern UI/UX redesign",
      "Performance optimization",
      "Mobile responsiveness upgrade",
      "Content migration & SEO preservation",
    ],
  },
  {
    title: "AI Voice Agents",
    description:
      "Deploy intelligent AI voice agents that handle customer calls 24/7. From appointment booking to FAQs, your business never misses an opportunity — even after hours.",
    image: "/images/service-voice.jpg",
    features: [
      "24/7 automated call handling",
      "Natural conversational AI voice",
      "Appointment scheduling & booking",
      "Smart routing & escalation",
    ],
  },
  {
    title: "Lead Generation as a Service",
    description:
      "AI-powered lead generation that identifies, researches, and qualifies potential clients at scale. Stop cold-calling — start converting warm, AI-qualified leads.",
    image: "/images/service-leads.jpg",
    features: [
      "Automated prospect research",
      "Smart lead scoring & ranking",
      "Personalized outreach sequences",
      "Real-time dashboard & analytics",
    ],
  },
  {
    title: "Ongoing Maintenance",
    description:
      "Keep your site secure, fast, and up-to-date with our affordable maintenance plans. We handle updates, backups, and minor changes so you can focus on business.",
    image: null,
    features: [
      "Regular security updates",
      "Automated backups",
      "Content updates & tweaks",
      "24/7 monitoring & support",
    ],
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const [cardRef, cardInView] = useInView();

  return (
    <div
      ref={cardRef}
      className={`group rounded-2xl glass-light overflow-hidden transition-all duration-700 hover:glass hover:border-purple-500/20 ${
        cardInView
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Image */}
      {service.image ? (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-transparent to-transparent" />
        </div>
      ) : (
        <div className="relative h-48 bg-gradient-to-br from-purple-900/30 to-teal-900/30 flex items-center justify-center">
          <div className="text-6xl opacity-30">🛡️</div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-transparent to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="p-6 sm:p-8">
        <h3 className="text-xl font-bold text-white group-hover:gradient-text transition-all duration-300">
          {service.title}
        </h3>
        <p className="mt-3 text-gray-400 text-sm leading-relaxed">
          {service.description}
        </p>

        {/* Features */}
        <ul className="mt-6 space-y-2.5">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm text-gray-400">
              <svg
                className="mt-0.5 h-4 w-4 shrink-0 text-teal-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        {/* Price indicator */}
        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="text-xs text-gray-500">Starting at</span>
          <span className="text-sm font-semibold gradient-text">
            {service.title === "New Website Creation"
              ? "$999"
              : service.title === "Website Modernization"
              ? "$599"
              : service.title === "AI Voice Agents"
              ? "$499 setup + $99/mo"
              : service.title === "Lead Generation as a Service"
              ? "$149/mo"
              : "$99/mo"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const [ref, inView] = useInView();

  return (
    <section id="services" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />
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
            What We Do
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            AI-Powered{" "}
            <span className="gradient-text">Business Solutions</span>
          </h2>
          <p className="mt-4 text-gray-400 text-lg">
            From websites and AI voice agents to automated lead generation — we
            deliver end-to-end AI solutions that grow your business.
          </p>
        </div>

        {/* Service cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}