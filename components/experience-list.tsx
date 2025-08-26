import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface ExperienceItem {
  company: string;
  position: string;
  period: string;
  location: string;
  logoUrl?: string;
  responsibilities: string[];
  skillsUtilized?: string[];
  // projectsCompleted?: string[]; // Can be added later
}

const experienceData: ExperienceItem[] = [
  {
    company: "Five Rings",
    position: "Quantitative Trading Intern",
    period: "Jun 2025 - Aug 2025",
    location: "New York, NY",
    responsibilities: [
      "Used rigorous quantitative and data analysis skills to complete research and development project",
      "Participated in mock trading to obtain familiarity with how the market operates at the level of individual orders",
      "Competed in automated trading strategy and design competition",
      "Received classroom-style instruction on a wide range of financial concepts",
      "Received daily mentorship from full-time Quantitative Traders"
    ],
  },
  {
    company: "Brown University Computer Science",
    position: "Teaching Assistant",
    period: "Jan 2024 - Dec 2024",
    location: "Providence, RI",
    responsibilities: [
      "Developed curriculum and assignments for a new course, Foundations in AI (CSCI0410/1411).",
      "Taught and helped undergraduate and graduate students with difficult topics in Foundations of AI and Deep Learning (1470/2470).",
      "Gained fluency and a strong understanding of taught content."
    ],
    skillsUtilized: ["AI", "Deep Learning", "Curriculum Development", "Teaching"],
  },
  {
    company: "Architect Therapeutics",
    position: "Software Engineer",
    period: "Jun 2024 - Present",
    location: "San Diego, CA; Remote",
    responsibilities: [
      "Drove computational research to accelerate chemical compound discovery and optimization.",
      "Developed sophisticated computational algorithms for hit discovery and lead optimization using CADD and advanced statistical methodologies.",
      "Designed and implemented a web-based computational management platform for job scheduling, tracking, and results visualization."
    ],
    skillsUtilized: ["Python", "React", "TypeScript", "MongoDB", "FastAPI", "Celery", "Docker", "CADD", "Algorithm Development"],
  },
  {
    company: "Singh Lab Research",
    position: "Undergraduate Researcher",
    period: "May 2024 - Nov 2024",
    location: "Providence, RI",
    responsibilities: [
      "Explored novel strategies for identifying drug-drug interactions using LLMs.",
      "Conducted systematic experiments with machine learning techniques (fine-tuning, RAG, knowledge graphs, graph network analysis).",
      "Developed robust data extraction and sanitization protocols, including web scraping with Puppeteer."
    ],
    skillsUtilized: ["LLMs", "Machine Learning", "RAG", "Knowledge Graphs", "Puppeteer", "Data Extraction"],
  },
  {
    company: "Artificial Teaching Assistant (ATA)",
    position: "Founder",
    period: "Jan 2024 - Present",
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
    <div className="space-y-16">
      {experienceData.map((item, index) => (
        <Card key={index} className="border border-white/10 bg-transparent backdrop-blur-sm hover:backdrop-blur-md hover:bg-white/5 hover:border-white/20 shadow-lg hover:shadow-xl rounded-xl transition-all duration-300 ease-in-out group">
          <CardHeader className="p-8 pb-6">
            <CardTitle className="text-2xl font-bold font-serif text-primary mb-3 group-hover:text-primary/90 transition-colors">{item.company}</CardTitle>
            <CardDescription className="text-lg text-muted-foreground leading-relaxed">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <span className="font-medium text-foreground/80">{item.position}</span>
                <span className="hidden sm:inline text-muted-foreground">•</span>
                <span className="text-muted-foreground">{item.period}</span>
                <span className="hidden sm:inline text-muted-foreground">•</span>
                <span className="text-muted-foreground/80">{item.location}</span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <ul className="list-disc pl-6 space-y-4 text-base leading-relaxed text-foreground/90">
              {item.responsibilities.map((resp, i) => (
                <li key={i} className="marker:text-primary/60">{resp}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 