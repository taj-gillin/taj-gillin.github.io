'use client';

import React from 'react';

interface TwoColumnLayoutProps {
  children: React.ReactNode;
  leftWidth?: string;
  rightWidth?: string;
  gap?: string;
}

export function TwoColumnLayout({ 
  children, 
  leftWidth = 'w-1/2',
  rightWidth = 'w-1/2',
  gap = 'gap-8'
}: TwoColumnLayoutProps) {
  const childArray = React.Children.toArray(children);
  
  return (
    <div className={`flex flex-col lg:flex-row ${gap} my-8`}>
      <div className={`${leftWidth} lg:${leftWidth}`}>
        {childArray[0]}
      </div>
      <div className={`${rightWidth} lg:${rightWidth}`}>
        {childArray[1]}
      </div>
    </div>
  );
}

export function LeftColumn({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function RightColumn({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}


