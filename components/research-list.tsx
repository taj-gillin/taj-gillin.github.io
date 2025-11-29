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
];

export function ResearchList() {
  if (!researchData || !researchData.length) {
    return <p className="text-muted-foreground">Research experience details will be listed here soon.</p>;
  }

  return (
    <div className="space-y-4">
      {researchData.map((item, index) => (
        <Card key={index} className="border border-white/10 bg-transparent backdrop-blur-sm hover:backdrop-blur-md hover:bg-white/5 hover:border-white/20 shadow-lg hover:shadow-xl rounded-xl transition-all duration-300 ease-in-out group py-0 gap-0">
          <CardHeader className="p-5 pb-3">
            <CardTitle className="text-2xl font-bold font-serif text-primary mb-3 group-hover:text-primary/90 transition-colors">{item.institution}</CardTitle>
            <CardDescription className="text-lg text-muted-foreground leading-relaxed">
              <div className="flex flex-col gap-2">
                {item.position && <span className="font-medium text-foreground/80">{item.position}</span>}
                <span className="text-muted-foreground">Advisor: {item.advisor}</span>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <span className="text-muted-foreground">{item.period}</span>
                  <span className="hidden sm:inline text-muted-foreground">•</span>
                  <span className="text-muted-foreground/80">{item.location}</span>
                </div>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="p-5 pt-0">
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
