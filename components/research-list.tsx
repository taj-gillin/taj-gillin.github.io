import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface ResearchItem {
  institution: string;
  position: string;
  advisor: string;
  period: string;
  location: string;
  responsibilities: string[];
}

const researchData: ResearchItem[] = [
  {
    institution: "Balestriero Lab Research",
    position: "",
    advisor: "Randall Balestriero",
    period: "August 2025 - Present",
    location: "Providence, RI",
    responsibilities: [
      "Completing honors thesis on continual learning with world models, focusing on benchmarks and architecture evaluation",
      "Integrating with existing lab repository on world models, developing readable, reliable code with docs and automated tests"
    ],
  },
  {
    institution: "CMS Experiment Research at CERN",
    position: "",
    advisor: "Loukas Gouskos",
    period: "May 2025 - Present",
    location: "Providence, RI",
    responsibilities: [
      "Developing modern jet classification techniques using graph neural networks on e+e- LEP data",
      "Future application to the FCC project by demonstrating support for algorithms and collider physics on simulated data",
      "Collaborated with researchers at CERN to create reproducible and readable code and results"
    ],
  },
  {
    institution: "Singh Lab Research",
    position: "",
    advisor: "Ritambhara Singh",
    period: "May 2024 - November 2024",
    location: "Providence, RI",
    responsibilities: [
      "Explored novel strategies for identifying drug-drug interactions using LLMs.",
      "Conducted systematic experiments with machine learning techniques (fine-tuning, RAG, knowledge graphs, graph network analysis).",
      "Developed robust data extraction and sanitization protocols, including web scraping with Puppeteer."
    ],
  }
];

export function ResearchList() {
  if (!researchData || !researchData.length) {
    return <p className="text-muted-foreground">Research experience details will be listed here soon.</p>;
  }

  return (
    <Accordion type="multiple" className="w-full">
      {researchData.map((item, index) => (
        <AccordionItem value={`res-${index}`} key={index}>
          <AccordionTrigger className="py-4 text-lg font-sans hover:no-underline">
            <span className="font-medium text-foreground text-left">{item.institution}</span>
            <span className="text-muted-foreground text-base font-sans shrink-0 ml-auto mr-4 hidden sm:block">{item.period}</span>
          </AccordionTrigger>
          <AccordionContent className="pb-6">
            <div className="text-base text-muted-foreground mb-1">Advisor: {item.advisor}</div>
            <div className="text-base text-muted-foreground mb-3">{item.period} · {item.location}</div>
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
