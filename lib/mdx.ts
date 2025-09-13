import { 
  Equation, 
  BlockEquation, 
  CodeBlock, 
  TwoColumnLayout, 
  LeftColumn, 
  RightColumn,
  ExpandableSection,
  ProjectImage,
  PerformanceTable,
  Algorithm,
  AlgorithmLine,
  AlgorithmFor,
  AlgorithmIf,
  AlgorithmBlock
} from '@/components/content';
import { H2, H3, P, HR, UL, OL, LI, A } from '@/components/content/Typography';

// MDX components mapping
export const mdxComponents = {
  Equation,
  BlockEquation,
  CodeBlock,
  TwoColumnLayout,
  LeftColumn,
  RightColumn,
  ExpandableSection,
  ProjectImage,
  PerformanceTable,
  Algorithm,
  AlgorithmLine,
  AlgorithmFor,
  AlgorithmIf,
  AlgorithmBlock,
  h2: H2,
  h3: H3,
  p: P,
  hr: HR,
  ul: UL,
  ol: OL,
  li: LI,
  a: A,
};
