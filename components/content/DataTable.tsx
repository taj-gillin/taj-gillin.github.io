'use client';

import React from 'react';

interface DataTableProps {
  headers: string[];
  rows: (string | number)[][];
  caption?: string;
  alignRight?: number[]; // indices of columns to align right
}

export function DataTable({ headers, rows, caption, alignRight = [] }: DataTableProps) {
  return (
    <div className="my-8 flex flex-col items-center">
      <div className="overflow-x-auto w-full max-w-2xl">
        <table className="w-full border-collapse font-serif">
          <thead>
            <tr className="border-t-2 border-b border-foreground">
              {headers.map((header, i) => (
                <th 
                  key={i} 
                  className={`px-4 py-2 font-semibold ${alignRight.includes(i) ? 'text-right' : 'text-left'}`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr 
                key={rowIndex} 
                className={rowIndex === rows.length - 1 ? 'border-b-2 border-foreground' : ''}
              >
                {row.map((cell, cellIndex) => (
                  <td 
                    key={cellIndex} 
                    className={`px-4 py-2 ${alignRight.includes(cellIndex) ? 'text-right font-mono' : 'text-left'}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {caption && (
          <p className="text-center text-sm text-muted-foreground mt-3 italic">
            {caption}
          </p>
        )}
      </div>
    </div>
  );
}
