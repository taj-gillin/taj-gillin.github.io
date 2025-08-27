import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface ResearchItem {
  institution: string;
  position: string;
  period: string;
  location: string;
  logoUrl?: string;
  responsibilities: string[];
  skillsUtilized?: string[];
}

const researchData: ResearchItem[] = [
  {
    institution: "CMS Experiment Research at CERN",
    position: "Undergraduate Researcher",
    period: "May 2025 - Present",
    location: "Providence, RI",
    responsibilities: [
      "Developing modern jet classification techniques using graph neural networks on e+e- LEP data",
      "Future application to the FCC project by demonstrating support for algorithms and collider physics on simulated data",
      "Collaborated with researchers at CERN to create reproducible and readable code and results"
    ],
    skillsUtilized: ["Graph Neural Networks", "Particle Physics", "Python", "Data Analysis", "CERN Technologies"],
  },
  {
    institution: "Singh Lab Research",
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
];

export function ResearchList() {
  if (!researchData || !researchData.length) {
    return <p>Research experience details will be listed here soon.</p>;
  }

  return (
    <div className="space-y-16">
      {researchData.map((item, index) => (
        <Card key={index} className="border border-white/10 bg-transparent backdrop-blur-sm hover:backdrop-blur-md hover:bg-white/5 hover:border-white/20 shadow-lg hover:shadow-xl rounded-xl transition-all duration-300 ease-in-out group">
          <CardHeader className="p-8 pb-6">
            <CardTitle className="text-2xl font-bold font-serif text-primary mb-3 group-hover:text-primary/90 transition-colors">{item.institution}</CardTitle>
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
