import { useRef } from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";

const Experience = () => {
  const containerRef = useRef(null);

  const experiences = [
    {
      title: "Azure DevOps Initiative",
      company: "Employability.life",
      period: "Aug 2025 – Sept 2025",
      location: "Remote",
      responsibilities: [
        "Completed an applied Azure DevOps program with hands-on experience in CI/CD pipelines, Git, Docker, and Jira-based Agile project management, along with professional readiness training through expert-led sessions."
      ]
    },
    {
      title: "Social Media Lead",
      company: "Teraforum",
      period: "May 2025 - May 2026",
      location: "Remote",
      responsibilities: [
        "Managing the club's complete digital presence by planning content, designing posts, and executing promotional campaigns for events and initiatives."
      ]
    },
    {
      title: "Director of Media & Content",
      company: "IEEE Student Branch, PES College of Engineering",
      period: "March 2026 – Present",
      location: "Mandya",
      responsibilities: [
        "Led the media and content team to create promotional content, manage social media, and oversee event coverage for IEEE activities.",
        "Coordinated with cross-functional teams to ensure consistent branding, increase engagement, and enhance the visibility of technical events and initiatives."
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 md:py-28 px-4 sm:px-6 bg-muted/30 relative overflow-x-clip" ref={containerRef}>
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">
            My Journey
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-10 rounded-full"></div>
        </div>

        {/* Experience Stack Container using React Bits ScrollStack */}
        <div className="relative w-full max-w-5xl mx-auto">
          <ScrollStack
            useWindowScroll={true}
            itemDistance={60}
            itemScale={0.03}
            itemStackDistance={24}
            baseScale={0.9}
            stackPosition="15%"
            scaleEndPosition="5%"
            rotationAmount={1}
            blurAmount={0.5}
          >
            {experiences.map((exp, index) => (
              <ScrollStackItem
                key={index}
                itemClassName="border border-primary/20 bg-background/90 dark:bg-card/95 backdrop-blur-md hover:border-primary/50 transition-all duration-300 rounded-[40px] shadow-2xl group overflow-hidden"
              >
                {/* Left indicator stripe */}
                <div className="absolute top-0 left-0 w-2.5 h-full bg-gradient-to-b from-primary to-secondary transition-all duration-300 group-hover:w-3.5" />

                <div className="flex flex-col h-full justify-between relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full mb-2">
                        <Briefcase className="w-3.5 h-3.5" />
                        Experience {index + 1} of {experiences.length}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-md sm:text-lg font-medium text-muted-foreground mt-1">
                        {exp.company}
                      </p>
                    </div>

                    <div className="flex flex-col sm:items-end gap-2 text-sm text-muted-foreground sm:text-right">
                      <span className="inline-flex items-center gap-1.5 font-medium text-foreground bg-secondary/10 dark:bg-secondary/20 px-3 py-1 rounded-md w-fit">
                        <Calendar className="w-4 h-4 text-primary" />
                        {exp.period}
                      </span>
                      <span className="inline-flex items-center gap-1.5 justify-start sm:justify-end">
                        <MapPin className="w-4 h-4 text-secondary" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-border/50 pt-4 flex-grow overflow-y-auto pr-2 scrollbar-thin">
                    <ul className="space-y-3">
                      {exp.responsibilities.map((responsibility, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-muted-foreground text-sm sm:text-base"
                        >
                          <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                          <span className="leading-relaxed">{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </div>
    </section>
  );
};

export default Experience;


