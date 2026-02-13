export interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

// Utility function to extract headings from MDX content
export function extractHeadingsFromMDX(content: string, maxLevel: number = 6): TableOfContentsItem[] {
  const headings: TableOfContentsItem[] = [];
  const lines = content.split('\n');

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Match markdown headings (## heading text)
    const headingMatch = trimmedLine.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;

      // Skip headings deeper than maxLevel
      if (level > maxLevel) continue;

      let text = headingMatch[2];

      // Clean up the text - remove markdown formatting
      text = text
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
        .replace(/\*(.*?)\*/g, '$1') // Remove italic
        .replace(/`(.*?)`/g, '$1') // Remove inline code
        .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links, keep text
        .trim();

      // Create URL-friendly ID
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single
        .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens

      // Only add if we have valid text and id
      if (text && id) {
        headings.push({ id, text, level });
      }
    }
  }

  return headings;
}

