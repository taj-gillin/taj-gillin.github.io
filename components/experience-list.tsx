import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface ExperienceItem {
  company: string;
  position: string;
  period: string;
  location: string;
  logoUrl?: string;
  responsibilities: string[];
  skillsUtilized?: string[];
}

const experienceData: ExperienceItem[] = [
  {
    company: "Five Rings",
    position: "Quantitative Trading Intern",
    period: "Jun 2025 - Aug 2025",
    location: "New York, NY",
    responsibilities: [
      "Used rigorous quantitative and data analysis skills to complete a research and development project",
      "Participated in mock trading to obtain familiarity with how the market operates at the level of individual orders",
      "Competed in an automated trading strategy and design competition",
      "Received classroom-style instruction on a wide range of financial concepts and daily mentorship from full-time traders"
    ],
  },
  {
    company: "Brown University Computer Science",
    position: "(Head) Teaching Assistant",
    period: "Jan 2024 - Present",
    location: "Providence, RI",
    responsibilities: [
      "Developed curriculum for a new course, Foundations in AI (CSCI0410/1411), alongside professors and TAs",
      "Taught and helped undergraduate and graduate students build a strong conceptual understanding of difficult topics in Foundations of AI, Deep Learning, and Prescriptive Analytics (HTA), and gained fluency in the taught content"
    ],
    skillsUtilized: ["AI", "Deep Learning", "Curriculum Development", "Teaching"],
  },
  {
    company: "Brown Design Workshop",
    position: "Monitor",
    period: "Jan 2024 - Present",
    location: "Providence, RI",
    responsibilities: [
      "Lead workshops on 3D printing, laser cutting, woodworking, and electronics while enforcing safety protocols and maintaining organized, collaborative makerspace environment",
      "Provide technical guidance and troubleshooting support to members on diverse fabrication projects, fostering creative problem-solving and skill development across multiple tools and materials",
      "Participate in monthly team meetings to develop policies and space improvements while documenting daily operations and maintenance in official logbook"
    ],
    skillsUtilized: ["3D Printing", "Laser Cutting", "Woodworking", "Electronics", "Safety Protocols", "Technical Support", "Project Management"],
  },
  {
    company: "Architect Therapeutics",
    position: "Software Engineer",
    period: "Jun 2024 - Nov 2024",
    location: "San Diego, CA, f.b. Remote",
    responsibilities: [
      "Drove computational research to accelerate compound discovery of new chemical space using sp3 CH activation",
      "Developed computational algorithms for hit discovery and lead optimization, leveraging computer-aided drug design (CADD) and statistical approaches for series data pattern detection and cross-sample anomaly detection",
      "Designed and implemented a web-based computational management platform that streamlines job scheduling, computation tracking, and results visualization, used as the central platform in the company by all chemists and biologists"
    ],
    skillsUtilized: ["Python", "React", "TypeScript", "MongoDB", "FastAPI", "Celery", "Docker", "CADD", "Algorithm Development"],
  },

  {
    company: "Artificial Teaching Assistant (ATA)",
    position: "Founder",
    period: "Jan 2024 - Dec 2024",
    location: "Providence, RI",
    responsibilities: [
      "Conceived and developed a course-specific LLM assistant for nuanced student guidance.",
      "Implemented the AI teaching tool across three Brown University courses.",
      "Recognized with Best Use of AI in Education award and Hazeltine Grant."
    ],
    skillsUtilized: ["LLMs", "AI Development", "Educational Technology", "Product Management", "HCI"],
  },
  {
    company: "Yeggs",
    position: "Founder",
    period: "Aug 2019 - Dec 2022",
    location: "International",
    responsibilities: [
      "Founded and scaled an international digital content production company (Minecraft Marketplace).",
      "Partnered with Microsoft, achieving six-figure net profitability and expanding to over 50 employees.",
      "Orchestrated comprehensive project management and led multiple development teams."
    ],
    skillsUtilized: ["Entrepreneurship", "Project Management", "Team Leadership", "Software Development Management", "Business Development"],
  },
];

export function ExperienceList() {
  if (!experienceData || !experienceData.length) {
    return <p>Work experience details will be listed here soon.</p>;
  }

  return (
    <Accordion type="multiple" className="w-full">
      {experienceData.map((item, index) => (
        <AccordionItem value={`exp-${index}`} key={index}>
          <AccordionTrigger className="py-4 text-lg font-sans hover:no-underline">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2 text-left">
              <span className="font-medium text-foreground">{item.company}</span>
              <span className="text-muted-foreground text-sm font-sans">— {item.position}</span>
            </div>
            <span className="text-muted-foreground text-base font-sans shrink-0 ml-auto mr-4 hidden sm:block">{item.period}</span>
          </AccordionTrigger>
          <AccordionContent className="pb-6">
            <div className="text-base text-muted-foreground font-sans mb-3 sm:hidden">{item.period} · {item.location}</div>
            <div className="text-base text-muted-foreground mb-3 hidden sm:block">{item.location}</div>
            <ul className="list-disc pl-5 space-y-2 text-base leading-relaxed text-foreground/80">
              {item.responsibilities.map((resp, i) => (
                <li key={i}>{resp}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}