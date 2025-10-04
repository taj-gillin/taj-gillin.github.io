import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import Image from 'next/image';

export interface Project {
  slug: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  repoUrl?: string;
  demoUrl?: string;
  award?: string;
  date: string;
  team?: string[];
  details?: {
    problemStatement: string;
    approach: string;
    results: string;
    keyFeatures?: string[];
    futurePlans?: string;
    images?: {
      url: string;
      alt: string;
      caption?: string;
    }[];
  };
}

export const projectData: Project[] = [
  {
    slug: "parallel-ising",
    title: "3D Ising Model with Parallel Computing",
    description: "Massively parallel Monte Carlo simulations using MPI and GPU acceleration",
    technologies: ["MPI", "CUDA", "cuRAND", "OpenMP", "C++"],
    imageUrl: "/projects/parallel-ising/images/ising_model.png",
    repoUrl: "https://github.com/taj-gillin/Parallel-Ising",
    demoUrl: "https://tajgillin.neocities.org/redblack/rb",
    date: "December 2024",
    details: {
      problemStatement: "Ferromagnetism and phase transitions are fundamental concepts in statistical mechanics. The challenge was to implement high-performance parallel computing approaches for 3D Ising model simulations using MPI and GPU acceleration.",
      approach: "Implemented domain decomposition with MPI for distributed memory systems and GPU acceleration with CUDA. Applied red-black update schemes, shared memory optimizations, GPU-aware MPI, and cuRAND for parallel random number generation.",
      results: "Achieved a 129x speedup over serial implementation while maintaining excellent scaling behavior. The optimized GPU implementation reduced runtime from 36.2s to 0.28s for 64³ lattice simulations.",
      keyFeatures: [
        "MPI domain decomposition with 6-way halo exchange",
        "GPU acceleration with CUDA kernels and shared memory optimization",
        "Red-black update scheme preventing pattern formation",
        "GPU-aware MPI for direct GPU-to-GPU communication",
        "cuRAND parallel random number generation"
      ],
      futurePlans: "Future optimizations include pinned memory implementation, asynchronous CUDA streams for overlapping computation and communication, and temperature scaling studies for phase transition analysis.",
      images: [
        {
          url: "/projects/parallel-ising/images/lattice.png",
          alt: "3D Ising lattice visualization",
          caption: "3D lattice showing spin configurations with interactive demo"
        },
        {
          url: "/projects/parallel-ising/images/roofline_comparison.png",
          alt: "Roofline model analysis",
          caption: "Performance analysis showing memory-bound behavior across implementations"
        },
        {
          url: "/projects/parallel-ising/images/energy_vs_steps.png",
          alt: "Energy convergence",
          caption: "Energy vs iteration showing system equilibration"
        },
        {
          url: "/projects/parallel-ising/images/magnetization_vs_steps.png",
          alt: "Magnetization evolution",
          caption: "Magnetization vs iteration demonstrating convergence"
        }
      ]
    }
  },
  {
    slug: "architect-internal-website",
    title: "Internal Platform for Architect Therapeutics",
    description: "Full-stack website for data management and task distribution on a computing cluster, enhancing research workflow.",
    technologies: ["React", "TypeScript", "MongoDB", "FastAPI", "Celery", "Docker", "Shell"],
    date: "Jun 2024 - Present",
    // imageUrl: "/images/projects/architect-thumb.png",
    // repoUrl: "https://github.com/your-repo/architect-platform"
  },
  {
    slug: "ligand-crispr",
    title: "LIGAND: gRNA Design with GANs",
    description: "A generative adversarial network (GAN) for optimizing gRNA design in CRISPR gene-editing applications.",
    technologies: ["TensorFlow", "Python", "Machine Learning"],
    date: "May 2024 - Nov 2024",
    // imageUrl: "/images/projects/ligand-thumb.png",
  },
  {
    slug: "illuminate-hackathon",
    title: "Illuminate",
    description: "Hack@Brown winning project that generates animated educational videos from any text input using GenAI. Transforms complex topics into engaging, animated explanations.",
    technologies: ["React", "FastAPI", "LangChain", "Manim", "AWS", "Python", "TypeScript"],
    imageUrl: "/projects/illuminate/cover.png",
    repoUrl: "https://github.com/taj-gillin/illuminate",
    demoUrl: "https://devpost.com/software/illuminated-qf09ik",
    award: "Best Use of Gen AI at Hack@Brown",
    date: "Feb 2025",
    team: ["Taj Gillin", "Danielle Whisnant", "Sami Nourji", "Andrew Kim"],
    details: {
      problemStatement: "Traditional educational content can often be static and disengaging. The goal was to explore how Generative AI could be leveraged to quickly transform textual information into dynamic, animated educational videos, making learning more accessible and engaging.",
      approach: "Illuminate was developed as a full-stack application using LangChain to orchestrate LLM calls for script generation and visual element identification. The Manim animation engine was used to programmatically generate video scenes, while a React frontend provided an intuitive user interface. AWS was utilized for hosting and scaling the backend processes.",
      results: "The project successfully demonstrated the feasibility of using GenAI to automate educational video creation. It was recognized with the Best Use of Gen AI award at Hack@Brown, highlighting its innovative approach and potential impact on educational technology.",
      keyFeatures: [
        "AI-powered script generation for educational content",
        "Automated animation creation using Manim",
        "Interactive quiz generation to test understanding",
        "Real-time video preview and editing capabilities"
      ],
      futurePlans: "Future plans include implementing a chat feature for follow-up questions, refining animations, and experimenting with other LLMs like Claude and Deepseek. The team also aims to make the platform available in multiple languages and target it towards teachers and students.",
      images: [
        {
          url: "/projects/illuminate/main_page.png",
          alt: "Main page of Illuminate",
          caption: "The main interface where users can input their topics"
        },
        {
          url: "/projects/illuminate/pipeline.png",
          alt: "Pipeline architecture",
          caption: "System architecture showing the flow from input to video generation"
        },
        {
          url: "/projects/illuminate/quiz.png",
          alt: "Interactive quiz feature",
          caption: "AI-generated quizzes to test understanding"
        },
        {
          url: "/projects/illuminate/cover.png",
          alt: "Project cover image",
          caption: "Project overview"
        }
      ]
    }
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex flex-col h-full border border-white/10 bg-transparent backdrop-blur-sm hover:backdrop-blur-md hover:bg-white/5 hover:border-white/20 shadow-none hover:shadow-md rounded-lg overflow-hidden transition-all duration-300 ease-in-out">
      {project.imageUrl && (
        <div className="relative w-full h-48">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <CardHeader className="p-5">
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl font-semibold font-serif text-primary mb-1">{project.title}</CardTitle>
          {project.award && (
            <Badge variant="default" className="ml-2">🏆 {project.award}</Badge>
          )}
        </div>
        <CardDescription className="text-base leading-relaxed text-muted-foreground line-clamp-3">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-5 pt-0">
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary">{tech}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0 mt-auto">
        <p className="text-sm text-muted-foreground">{project.date}</p>
      </CardFooter>
    </Card>
  );
}

export function ProjectList() {
  if (!projectData || !projectData.length) {
    return <p>No projects to display at the moment. Please check back later.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projectData.map((project) => (
        <Link href={`/projects/${project.slug}`} key={project.slug} className="block focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg h-full">
          <ProjectCard project={project} />
        </Link>
      ))}
    </div>
  );
} 