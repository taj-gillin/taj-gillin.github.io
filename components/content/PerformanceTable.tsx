'use client';

import React from 'react';

interface PerformanceData {
  implementation: string;
  runtime: number;
  speedup?: number;
  tooltip?: string;
}

interface PerformanceTableProps {
  data: PerformanceData[];
  title?: string;
}

export function PerformanceTable({ data, title }: PerformanceTableProps) {
  return (
    <div className="my-8">
      {title && (
        <h3 className="text-xl font-semibold font-serif mb-4">{title}</h3>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-border rounded-lg">
          <thead>
            <tr className="bg-muted/50">
              <th className="border border-border px-4 py-3 text-left font-semibold">
                Implementation
              </th>
              <th className="border border-border px-4 py-3 text-right font-semibold">
                Runtime (seconds)
              </th>
              <th className="border border-border px-4 py-3 text-right font-semibold">
                Speedup
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-muted/20 transition-colors">
                <td className="border border-border px-4 py-3 font-medium">
                  <div className="flex items-center gap-2">
                    {row.implementation}
                    {row.tooltip && (
                      <div className="group relative">
                        <div className="w-4 h-4 rounded-full bg-muted-foreground/20 flex items-center justify-center cursor-help">
                          <span className="text-xs text-muted-foreground font-bold">i</span>
                        </div>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-popover text-popover-foreground text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                          {row.tooltip}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-popover"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
                <td className="border border-border px-4 py-3 text-right font-mono">
                  {row.runtime.toFixed(1)}
                </td>
                <td className="border border-border px-4 py-3 text-right font-mono">
                  {row.speedup ? `${row.speedup.toFixed(1)}x` : '1.0x'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


