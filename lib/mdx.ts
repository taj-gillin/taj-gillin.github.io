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
import { H1, H2, H3, H4, H5, H6, P, HR, UL, OL, LI, A } from '@/components/content/Typography';
import ScreenshotCarousel from '@/components/ScreenshotCarousel';

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
  ScreenshotCarousel,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: P,
  hr: HR,
  ul: UL,
  ol: OL,
  li: LI,
  a: A,
};
