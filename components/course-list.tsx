import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Course {
  id: string;
  name: string;
  semester?: string;
  professor?: string;
  description: string;
  projectLink?: string;
}

interface CourseCategory {
  title: string;
  courses: Course[];
}

const courseData: CourseCategory[] = [
  {
    title: "Computer Science",
    courses: [
      {
        id: "CSCI 0190",
        name: "Accelerated Introduction to Computer Science",
        semester: "Fall 2022",
        description: "Provided a comprehensive introduction to computer science covering data structures, algorithms, recursion, graph theory, and programming paradigms. Included practical implementation of sorting algorithms, binary search trees, and graph traversal techniques.",
      },
      {
        id: "CSCI 1470",
        name: "Deep Learning",
        semester: "Spring 2023",
        description: "Provided an overview of deep learning techniques and their applications in computer vision, natural language processing, and other domains. Covered convolutional neural networks, recurrent neural networks, autoencoders, GANs, RL, and more with hands-on implementation in Python.",
      },
      {
        id: "CSCI 0330",
        name: "Introduction to Computer Systems",
        semester: "Fall 2023",
        description: "Explored computer architecture and systems programming, covering assembly language, C programming, and multi-threaded programming. Focused on understanding computer organization, storage units, caches, and operating system functions.",
      },
      {
        id: "CSCI 2952G",
        name: "Deep Learning in Genomics",
        semester: "Fall 2023",
        description: "Examined how deep learning models like CNNs, RNNs, GCNs, and GANs were applied to solve problems in genomics. Discussed the unique challenges and opportunities in applying deep learning to biological data.",
      },
      {
        id: "CSCI 1680",
        name: "Computer Networks",
        semester: "Fall 2024",
        description: "Studied Internet technologies and protocols, from Ethernet and WiFi to routing protocols and web technologies. Included hands-on projects building IP and TCP protocols from scratch.",
      },
      {
        id: "APMA 2822B",
        name: "Parallel Computing on Heterogeneous (CPU+GPU) Systems",
        semester: "Fall 2024",
        description: "Covered parallel computing on systems with CPUs and GPUs, including shared/distributed memory programming, OpenMP, MPI, and CUDA. Focused on memory management and performance optimization strategies.",
      },
      {
        id: "CSCI 1520",
        name: "Algorithmic Aspects of Machine Learning",
        semester: "Spring 2025",
        description: "Explored theoretical foundations of machine learning, covering linear algebra, optimization, and algorithm design with provable guarantees. Included topics like matrix decomposition, sparse coding, and deep learning theory.",
      },
      {
        id: "CSCI 2951X",
        name: "Reintegrating AI",
        semester: "Spring 2025",
        description: "Investigated approaches to integrating various AI subfields into a unified agent architecture. My team worked on a project and wrote a papertesting the effectiveness ang generalizability of LLMs as policies for RL problems.",
      },
      {
        id: "CSCI 2951O",
        name: "Foundations of Prescriptive Analytics",
        semester: "Spring 2025",
        description: "Covered optimization techniques for prescriptive analytics, including Boolean Satisfiability, Constraint Programming, Linear/Integer Programming, and Meta-Heuristics. Had hands-on, competitive, open-ended projects for each topic.",
      },
      {
        id: "CSCI 2952X",
        name: "Research Topics in Self Supervised Learning",
        semester: "Fall 2025",
        description: "Covered state-of-the-art Self Supervised Learning (SSL) pipelines from the basics, including computer vision, multimodal, and world models. Included coding exercises and research group projects to implement alternative solutions, with guest lectures from top SSL researchers.",
      },
    ],
  },
  {
    title: "Mathematics",
    courses: [
      {
        id: "APMA 0350",
        name: "Applied Ordinary Differential Equations",
        semester: "Fall 2022",
        description: "Studied ordinary differential equations and their applications in modeling real-world problems. Covered analytical, numerical, and qualitative solution methods.",
      },
      {
        id: "MATH 0540",
        name: "Linear Algebra With Theory",
        semester: "Fall 2022",
        description: "Provided a rigorous introduction to linear algebra theory, covering vector spaces, linear transformations, eigenvalues, and matrix theory. Emphasized proof-writing and theoretical foundations.",
      },
      {
        id: "APMA 1655",
        name: "Honors Statistical Inference I",
        semester: "Spring 2023",
        description: "Covered probability theory, statistical inference, and their applications. Included topics on random variables, estimation, hypothesis testing, and linear regression.",
      },
      {
        id: "CSCI 0220",
        name: "Introduction to Discrete Structures and Probability",
        semester: "Spring 2024",
        description: "Introduced fundamental discrete structures in computer science, including Boolean algebras, logic, set theory, graph theory, combinatorics, and probability theory.",
      },
      {
        id: "APMA 0360",
        name: "Applied Partial Differential Equations I",
        semester: "Fall 2024",
        description: "Studied partial differential equations and their applications, focusing on transport, wave, heat, and Laplace equations. Covered solution techniques including Fourier transforms and separation of variables.",
      },
      {
        id: "APMA 1930X",
        name: "Probability, Optimization, and Stochastic Calculus",
        semester: "Fall 2024",
        description: "Explored probability theory, stochastic processes, optimization, and stochastic calculus. Covered Brownian motion and its applications to partial differential equations.",
      },
      {
        id: "APMA 1200",
        name: "Operations Research: Probabilistic Models",
        semester: "Spring 2025",
        description: "Covered stochastic processes and optimization, including Markov chains, queueing theory, martingales, and dynamic programming. Focused on probabilistic models and their applications.",
      },
    ],
  },
  {
    title: "Biophysics",
    courses: [
      {
        id: "CHEM 1140",
        name: "Physical Chemistry: Quantum Chemistry",
        semester: "Fall 2022",
        description: "Introduced quantum mechanics and its application to chemical systems. Covered electronic structure of atoms and molecules, spectroscopy, and chemical bonding.",
      },
      {
        id: "CHEM 0350",
        name: "Organic Chemistry I",
        semester: "Spring 2023",
        description: "Studied organic compounds, their structures, and reaction mechanisms. Covered acid/base chemistry, stereochemistry, and fundamental organic reactions.",
      },
      {
        id: "CHEM 0360",
        name: "Organic Chemistry II",
        semester: "Fall 2023",
        description: "Provided advanced study of organic chemistry, focusing on physical organic chemistry, bioorganic chemistry, and synthetic methods. Included modern instrumental analysis techniques.",
      },
      {
        id: "PHYS 0500",
        name: "Advanced Classical Mechanics",
        semester: "Spring 2023",
        description: "Provided advanced study of classical mechanics, covering particle dynamics, rigid bodies, and elastic continua. Included Lagrangian and Hamiltonian formulations.",
      },
      {
        id: "PHYS 1510",
        name: "Advanced Electromagentic Theory",
        semester: "Fall 2023",
        description: "Provided advanced study of electromagnetic theory, covering Maxwell's equations, electromagnetic waves, radiation, and special relativity.",
      },
      {
        id: "BIOL 0280",
        name: "Biochemistry",
        semester: "Spring 2024",
        description: "Studied macromolecular structure and function, metabolic pathways, and gene expression. Focused on biochemical mechanisms and cellular processes.",
      },
      {
        id: "BIOL 0500",
        name: "Cell and Molecular Biology",
        semester: "Spring 2024",
        description: "Examined cell structure and function, covering gene transcription, cell division, protein secretion, and signal transduction. Used experimental approaches to study cellular processes.",
      },
      {
        id: "PHYS 1530",
        name: "Thermodynamics and Statistical Mechanics",
        semester: "Fall 2024",
        description: "Studied thermodynamics and statistical mechanics, covering heat transfer, kinetic theory, and their applications to physical systems.",
      },
      {
        id: "PHYS 2050",
        name: "Quantum Mechanics",
        semester: "Fall 2025",
        description: "Provided advanced study of quantum mechanics, covering fundamental principles, formalism of quantum mechanics, theory of angular momentum, and approximation methods.",
      },
      {
        id: "PHYS 2630",
        name: "Biological Physics",
        semester: "Fall 2025",
        description: "Covered biological physics at the graduate level, including structure of cells and biological molecules, diffusion and random motion, flow and friction in fluids, entropy and energy, chemical reactions and self-assembly, solution electrostatics, and action potential and nerve impulses.",
      },
    ],
  },
  {
    title: "Other",
    courses: [
      {
        id: "ECON 1130",
        name: "Intermediate Microeconomics (Mathematical)",
        semester: "Spring 2023",
        description: "Provided mathematical treatment of microeconomic theory, covering consumer and firm behavior, market equilibrium, game theory, and welfare economics.",
      },
      {
        id: "CLPS 0010",
        name: "Mind, Brain and Behavior",
        semester: "Fall 2023",
        description: "Provided interdisciplinary study of the mind through psychology, cognitive science, neuroscience, and linguistics. Covered perception, communication, development, decision-making, and social cognition.",
      },
      {
        id: "IAPA 0310",
        name: "Reimagining Human Security",
        semester: "Spring 2025",
        description: "Examined human security challenges including climate change, pandemics, AI, and migration. Explored the intersection of social, economic, environmental, and political factors in security policy.",
      },
      {
        id: "ENGL 0930",
        name: "Introduction to Creative Nonfiction",
        semester: "Fall 2025",
        description: "Learned the techniques and narrative structures of creative nonfiction. Reading and writing focused on personal essays, memoir, science writing, travel writing, and other related subgenres.",
      },
    ],
  },
];

export function CourseList() {
  if (!courseData || !courseData.length) {
    return <p>No course data available at the moment. Please check back later.</p>;
  }

  return (
    <Accordion type="multiple" className="w-full">
      {courseData.map((category) => (
        <AccordionItem value={category.title} key={category.title} className="border-b border-foreground/10">
          <AccordionTrigger className="text-lg font-sans font-medium hover:no-underline py-4">
            {category.title}
          </AccordionTrigger>
          <AccordionContent className="pb-2">
            {category.courses.length > 0 ? (
              <Accordion type="multiple" className="w-full pl-4">
                {[...category.courses].reverse().map((course) => (
                  <AccordionItem value={course.id} key={course.id} className="border-b border-foreground/5 last:border-b-0">
                    <AccordionTrigger className="py-3 text-base font-sans hover:no-underline">
                      <div className="flex items-baseline gap-2 text-left">
                        <span className="text-muted-foreground font-mono text-sm">{course.id}</span>
                        <span className="text-foreground/90">{course.name}</span>
                      </div>
                      <span className="text-muted-foreground text-sm shrink-0 ml-auto mr-4 hidden sm:block">{course.semester}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-3">
                      <p className="text-base leading-relaxed text-foreground/70 pl-0">{course.description}</p>
                      {course.projectLink && (
                        <a
                          href={course.projectLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-foreground/60 hover:text-foreground transition-colors mt-2 inline-block"
                        >
                          View Project →
                        </a>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <p className="text-muted-foreground pl-4 text-sm">Courses for this category will be listed soon.</p>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}