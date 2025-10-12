import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface Skill {
  name: string;
  proficiency?: "Advanced" | "Intermediate" | "Basic";
  description?: string;
  // relatedProjectSlugs?: string[]; // To link to projects later
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

// Placeholder data based on resume
const skillData: SkillCategory[] = [
  {
    title: "Programming Languages",
    skills: [
      { name: "Python", proficiency: "Advanced" },
      { name: "JavaScript/TypeScript", proficiency: "Intermediate" },
      { name: "C++", proficiency: "Intermediate" },
      { name: "C", proficiency: "Intermediate" },
      { name: "Java", proficiency: "Intermediate" },
      { name: "Go", proficiency: "Intermediate" },
      { name: "Pyret", proficiency: "Basic" },
      { name: "Racket", proficiency: "Basic" },
    ],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "TensorFlow", proficiency: "Advanced" },
      { name: "PyTorch", proficiency: "Advanced" },
      { name: "JAX", proficiency: "Basic" },
      { name: "React", proficiency: "Intermediate" },
      { name: "Next.js", proficiency: "Intermediate" },
      { name: "FastAPI", proficiency: "Intermediate" },
      { name: "Django", proficiency: "Intermediate" },
      { name: "Flask", proficiency: "Intermediate" },
      { name: "Three.js", proficiency: "Intermediate" },
      { name: "LangChain", proficiency: "Basic" },
    ],
  },
  {
    title: "DevOps & Databases",
    skills: [
      { name: "Docker", proficiency: "Intermediate" },
      { name: "Unix/Shell Scripting", proficiency: "Intermediate" },
      { name: "MongoDB", proficiency: "Intermediate" },
      { name: "Redis", proficiency: "Intermediate" },
      { name: "SQL", proficiency: "Intermediate" },
      { name: "AWS", proficiency: "Basic" }, // Assuming from Illuminate project
    ],
  },
  {
    title: "Fields of Knowledge",
    skills: [
      { name: "Deep Learning", proficiency: "Advanced" },
      { name: "Machine Learning", proficiency: "Advanced" },
      { name: "Reinforcement Learning", proficiency: "Intermediate" },
      { name: "Parallel Computing", proficiency: "Intermediate" },
      { name: "Constraint, Linear, and Integer Programming", proficiency: "Intermediate" },
    ],
  },
  {
    title: "Certifications & Other",
    skills: [
      { name: "Nationally Certified EMT-B" },
      { name: "OSHA Certified" },
      { name: "HIPAA Certified" },
      { name: "BLS Certified" },
      { name: "ACLS Certified" },
    ],
  },
];

export function SkillList() {
  if (!skillData || !skillData.length) {
    return <p>Skills will be listed here soon.</p>;
  }

  return (
    <Accordion type="multiple" className="w-full space-y-3">
      {skillData.map((category) => (
        <AccordionItem value={category.title} key={category.title} className="border border-white/15 hover:border-primary/40 rounded-lg px-4 py-2 bg-white/8 hover:bg-primary/10 transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-md">
          <AccordionTrigger className="text-lg font-semibold hover:no-underline text-foreground hover:text-primary py-3 [&>svg]:text-primary [&>svg]:w-5 [&>svg]:h-5 [&>svg]:border [&>svg]:border-primary/30 [&>svg]:rounded-full [&>svg]:p-1 [&>svg]:bg-primary/10 hover:[&>svg]:bg-primary/20 hover:[&>svg]:border-primary/50">
            {category.title}
          </AccordionTrigger>
          <AccordionContent className="pt-3 pb-4">
            {category.skills.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="p-3 border border-white/10 rounded-md bg-transparent backdrop-blur-sm hover:backdrop-blur-md hover:bg-white/5 hover:border-white/20 min-w-[150px] flex-grow transition-all duration-300">
                    <p className="font-medium text-base text-primary">{skill.name}</p>
                    {skill.proficiency && (
                      <p className="text-xs text-muted-foreground">{skill.proficiency}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground pl-4">Skills for this category will be listed soon.</p>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
} 