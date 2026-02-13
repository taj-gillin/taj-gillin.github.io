import { ExternalLink } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export interface Publication {
    title: string;
    authors: string[];
    venue?: string;
    year: number;
    type: "poster" | "paper" | "presentation";
    pdfUrl?: string;
    externalUrl?: string;
}

const publicationsData: Publication[] = [
    {
        title: "World Modeling Without Resets",
        authors: ["Taj Gillin", "Lucas Maes", "Randall Balestriero"],
        venue: "NECV",
        year: 2025,
        type: "poster",
        pdfUrl: "/research/[NECV 2025] Taj Gillin Poster.pdf",
    },
    {
        title: "BERT-JEPA: Reorganizing CLS Embeddings for Language-Invariant Semantics",
        authors: ["Taj Gillin", "Adam Lalani", "Kenneth Zhang", "Marcel Mateos Salles"],
        year: 2026,
        type: "paper",
        pdfUrl: "https://arxiv.org/abs/2601.00366",
    }
];

export function PublicationsList() {
    if (!publicationsData || !publicationsData.length) {
        return <p className="text-muted-foreground">Publications will be listed here soon.</p>;
    }

    return (
        <Accordion type="multiple" className="w-full">
            {publicationsData.map((pub, index) => (
                <AccordionItem value={`pub-${index}`} key={index}>
                    <AccordionTrigger className="py-4 text-base hover:no-underline">
                        <span className="font-medium text-foreground text-left">{pub.title}</span>
                        <span className="text-muted-foreground text-sm shrink-0 ml-auto mr-4 hidden sm:block">
                            {pub.year} · <span className="capitalize">{pub.type}</span>
                        </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                        <p className="text-sm text-muted-foreground mb-1">
                            {pub.authors.join(", ")}
                        </p>
                        {pub.venue && (
                            <p className="text-sm text-muted-foreground mb-1">
                                {pub.venue} {pub.year}
                            </p>
                        )}
                        <div className="flex items-center gap-4 mt-2">
                            {pub.pdfUrl && (
                                <a
                                    href={pub.pdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-foreground/70 hover:text-foreground transition-colors flex items-center gap-1"
                                >
                                    PDF
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            )}
                            {pub.externalUrl && (
                                <a
                                    href={pub.externalUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-foreground/70 hover:text-foreground transition-colors flex items-center gap-1"
                                >
                                    Link
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            )}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}
