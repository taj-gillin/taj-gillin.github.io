import { ExternalLink } from "lucide-react";
import {
    Card,
    CardContent,
} from "@/components/ui/card";

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
        <div className="space-y-4">
            {publicationsData.map((pub, index) => (
                <Card key={index} className="border border-white/10 bg-transparent hover:bg-white/5 shadow-none rounded-lg transition-all duration-300 ease-in-out group py-0 gap-0">
                    <CardContent className="p-4 px-5">
                        <div className="flex flex-col gap-1">
                            <h3 className="text-base font-semibold font-serif text-foreground/90 group-hover:text-primary transition-colors">
                                {pub.title}
                            </h3>

                            <p className="text-sm text-muted-foreground">
                                {pub.authors.join(", ")}
                            </p>

                            <div className="flex items-center gap-3 text-xs text-muted-foreground/60 mt-1">
                                {pub.venue && (
                                    <span>
                                        {pub.venue} {pub.year}
                                    </span>
                                )}
                                {!pub.venue && (
                                    <span>
                                        {pub.year}
                                    </span>
                                )}
                                <span>•</span>
                                <span className="capitalize">
                                    {pub.type}
                                </span>
                                {pub.pdfUrl && (
                                    <>
                                        <span>•</span>
                                        <a
                                            href={pub.pdfUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                                        >
                                            PDF
                                            <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </>
                                )}
                                {pub.externalUrl && (
                                    <>
                                        <span>•</span>
                                        <a
                                            href={pub.externalUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                                        >
                                            Link
                                            <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
