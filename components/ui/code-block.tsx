"use client";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

type CodeBlockProps = {
  language: string;
  filename?: string;
  highlightLines?: number[];
  className?: string;
} & (
  | {
      code: string;
      tabs?: never;
    }
  | {
      code?: never;
      tabs: Array<{
        name: string;
        code: string;
        language?: string;
        highlightLines?: number[];
      }>;
    }
);

export const CodeBlock = ({
  language,
  filename,
  code,
  highlightLines = [],
  tabs = [],
  className,
}: CodeBlockProps) => {
  const [copied, setCopied] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);

  const tabsExist = tabs.length > 0;

  const copyToClipboard = async () => {
    const textToCopy = tabsExist ? tabs[activeTab].code : code;
    if (textToCopy) {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const activeCode = tabsExist ? tabs[activeTab].code : code;
  const activeLanguage = tabsExist
    ? tabs[activeTab].language || language
    : language;
  const activeHighlightLines = tabsExist
    ? tabs[activeTab].highlightLines || []
    : highlightLines;

  return (
    <div className={cn("relative w-full rounded-lg bg-slate-900 border border-slate-700 overflow-hidden my-6", className)}>
      <div className="flex flex-col">
        {tabsExist && (
          <div className="flex overflow-x-auto bg-slate-800 border-b border-slate-700">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={cn(
                  "px-4 py-2 text-sm transition-colors font-sans border-b-2 whitespace-nowrap",
                  activeTab === index
                    ? "text-white border-blue-400 bg-slate-700"
                    : "text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-700/50"
                )}
              >
                {tab.name}
              </button>
            ))}
          </div>
        )}
        
        {filename && (
          <div className="flex justify-between items-center px-4 py-2 bg-slate-800 border-b border-slate-700">
            <div className="text-sm text-slate-400 font-mono">{filename}</div>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors font-sans px-2 py-1 rounded hover:bg-slate-700"
            >
              {copied ? (
                <>
                  <IconCheck size={16} />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <IconCopy size={16} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        )}
        
        {!filename && !tabsExist && (
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-200 transition-colors font-sans p-2 rounded hover:bg-slate-800"
            >
              {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
            </button>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <SyntaxHighlighter
          language={activeLanguage}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: 0,
            background: "transparent",
            fontSize: "0.875rem",
            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
          }}
          wrapLines={true}
          showLineNumbers={true}
          lineNumberStyle={{
            color: "#6b7280",
            paddingRight: "1rem",
            minWidth: "2.5rem",
            textAlign: "right",
          }}
          lineProps={(lineNumber) => ({
            style: {
              backgroundColor: activeHighlightLines.includes(lineNumber)
                ? "rgba(59, 130, 246, 0.1)"
                : "transparent",
              display: "block",
              width: "100%",
              paddingLeft: "0.5rem",
              paddingRight: "0.5rem",
              borderLeft: activeHighlightLines.includes(lineNumber)
                ? "2px solid #3b82f6"
                : "2px solid transparent",
            },
          })}
          PreTag="div"
        >
          {String(activeCode)}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

// Simple algorithm block for pseudocode
export const AlgorithmBlock = ({ 
  title, 
  children,
  className 
}: { 
  title?: string; 
  children: string;
  className?: string;
}) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("relative w-full rounded-lg bg-slate-900 border border-slate-700 overflow-hidden my-6", className)}>
      {title && (
        <div className="flex justify-between items-center px-4 py-2 bg-slate-800 border-b border-slate-700">
          <div className="text-sm text-slate-400 font-semibold">{title}</div>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors font-sans px-2 py-1 rounded hover:bg-slate-700"
          >
            {copied ? (
              <>
                <IconCheck size={16} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <IconCopy size={16} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      )}
      
      {!title && (
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-200 transition-colors font-sans p-2 rounded hover:bg-slate-800"
          >
            {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
          </button>
        </div>
      )}
      
      <div className="p-4">
        <pre className="text-sm font-mono text-slate-200 leading-relaxed whitespace-pre-wrap">
          {children}
        </pre>
      </div>
    </div>
  );
};





