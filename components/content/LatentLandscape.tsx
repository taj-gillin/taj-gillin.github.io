'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import type { Layout } from 'plotly.js';

// Dynamically import Plotly to avoid SSR issues
const Plot = dynamic(() => import('react-plotly.js'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[500px] bg-card/50 rounded-xl border border-border/50">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        <span className="text-sm text-muted-foreground">Loading visualization...</span>
      </div>
    </div>
  )
});

interface VisualizationData {
  metadata: {
    environment_name: string;
    goal_position: [number, number];
    goal_index: number;
    grid_resolution: number;
    latent_scale_factor: number;
    distance_stats: {
      min: number;
      max: number;
      mean: number;
    };
    coordinate_bounds: {
      x_min: number;
      x_max: number;
      y_min: number;
      y_max: number;
    };
  };
  surface_data: {
    x: number[][];
    y: number[][];
    z: number[][];
    colorscale: string;
    opacity: number;
  };
  floor_data: {
    elements: Array<{
      type: 'mesh3d' | 'scatter3d';
      x: number[];
      y: number[];
      z: number[];
      i?: number[];
      j?: number[];
      k?: number[];
      color: string;
      opacity: number;
      name: string;
      mode?: string;
      line?: {
        color: string;
        width: number;
      };
    }>;
  };
  layout: {
    title: string;
    scene: {
      xaxis_title: string;
      yaxis_title: string;
      zaxis_title: string;
      aspectmode: 'auto' | 'data' | 'cube' | 'manual';
    };
    width: number;
    height: number;
  };
}

interface LatentLandscapeProps {
  src: string;
  caption?: string;
  height?: number;
}

const LatentLandscape: React.FC<LatentLandscapeProps> = ({ 
  src, 
  caption,
  height = 500 
}) => {
  const [data, setData] = useState<VisualizationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetch(src);
        if (!response.ok) {
          throw new Error(`Failed to load data: ${response.statusText}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [src]);

  // Convert data to Plotly format
  const createPlotData = (vizData: VisualizationData) => {
    const plotData: object[] = [];

    // ========== NORMALIZATION STRATEGY ==========
    // Normalize ALL axes to a consistent range [0, 10] so everything aligns.
    // - X, Y: normalized from coordinate bounds to [0, 10]
    // - Z floor: 0 (with tiny increments for layers)
    // - Z goal: 0.05
    // - Z surface: 0.1 to 10
    // - Colorbar: shows original distance values via surfacecolor
    
    const COORD_MAX = 10;             // Target range for x, y, z
    const FLOOR_BASE = 0;
    const FLOOR_LAYER_STEP = 0.002;   // Step between floor layers
    const GOAL_Z = 0.05;              // Goal marker height
    const SURFACE_MIN = 0.1;          // Surface starts here (above floor/goal)
    const SURFACE_MAX = COORD_MAX;    // Surface max height
    
    // Get coordinate bounds for x, y normalization
    const { x_min, x_max, y_min, y_max } = vizData.metadata.coordinate_bounds;
    const xRange = x_max - x_min || 1;
    const yRange = y_max - y_min || 1;
    
    // Helper to normalize x coordinate
    const normalizeX = (x: number) => ((x - x_min) / xRange) * COORD_MAX;
    // Helper to normalize y coordinate  
    const normalizeY = (y: number) => ((y - y_min) / yRange) * COORD_MAX;
    
    // Get original z range for normalization
    const flatZ = vizData.surface_data.z.flat();
    const minSurfaceZ = Math.min(...flatZ);
    const maxSurfaceZ = Math.max(...flatZ);
    const zRange = maxSurfaceZ - minSurfaceZ || 1;
    
    // Helper to normalize z coordinate for surface
    const normalizeZ = (z: number) => {
      const t = (z - minSurfaceZ) / zRange; // 0 to 1
      return t * (SURFACE_MAX - SURFACE_MIN) + SURFACE_MIN;
    };
    
    // Normalize surface coordinates (x and y are 2D arrays like z)
    const normalizedSurfaceX = vizData.surface_data.x.map((row: number[]) => row.map(normalizeX));
    const normalizedSurfaceY = vizData.surface_data.y.map((row: number[]) => row.map(normalizeY));
    const normalizedSurfaceZ = vizData.surface_data.z.map((row: number[]) => row.map(normalizeZ));

    // Add surface plot with surfacecolor for original values (colorbar shows real distances)
    plotData.push({
      type: 'surface',
      z: normalizedSurfaceZ,
      x: normalizedSurfaceX,
      y: normalizedSurfaceY,
      surfacecolor: vizData.surface_data.z, // Original values for colorbar
      colorscale: vizData.surface_data.colorscale,
      opacity: vizData.surface_data.opacity,
      name: 'Latent Distance',
      showlegend: false,
      colorbar: {
        title: {
          text: 'Distance',
          side: 'right'
        },
        thickness: 15,
        len: 0.5,
        x: 1.02
      }
    });

    // Add floor elements with normalized coordinates
    let floorLayerIndex = 0;
    vizData.floor_data.elements.forEach((element) => {
      // Skip Goal elements - we'll add our own based on metadata
      if (element.name === 'Goal') return;

      // Stagger floor elements to avoid z-fighting
      const layerZ = FLOOR_BASE + floorLayerIndex * FLOOR_LAYER_STEP;
      floorLayerIndex++;
      
      // Normalize x, y and set z to floor level
      const normalizedX = element.x.map(normalizeX);
      const normalizedY = element.y.map(normalizeY);
      const normalizedFloorZ = element.z.map(() => layerZ);

      const plotElement: Record<string, unknown> = {
        type: element.type,
        x: normalizedX,
        y: normalizedY,
        z: normalizedFloorZ,
        name: element.name,
        showlegend: false,
        opacity: element.opacity,
      };

      if (element.type === 'mesh3d') {
        plotElement.color = element.color;
        if (element.i && element.j && element.k) {
          plotElement.i = element.i;
          plotElement.j = element.j;
          plotElement.k = element.k;
        }
      } else if (element.type === 'scatter3d') {
        plotElement.mode = element.mode;
        plotElement.line = element.line;
        plotElement.hoverinfo = 'skip';
      }

      plotData.push(plotElement);
    });

    // Add goal marker from metadata (correct position)
    let [goalX, goalY] = vizData.metadata.goal_position;
    
    // For grid-based environments (minigrid), goal coords are cell indices
    // Add 0.5 to center the marker within the cell
    const isGridBased = vizData.metadata.environment_name.toLowerCase().includes('minigrid');
    if (isGridBased) {
      goalX += 0.5;
      goalY += 0.5;
    }
    
    // Normalize goal position and set z height
    const normalizedGoalX = normalizeX(goalX);
    const normalizedGoalY = normalizeY(goalY);
    const goalZ = GOAL_Z;
    
    // Fixed radius in normalized space (works for all environments)
    const radius = 0.3;
    
    // Create a flat circle (dot) marker at floor level
    const numPoints = 32;
    const circleX: number[] = [normalizedGoalX]; // center
    const circleY: number[] = [normalizedGoalY];
    const circleZ: number[] = [goalZ];
    const circleI: number[] = [];
    const circleJ: number[] = [];
    const circleK: number[] = [];
    
    // Add circle edge points (using normalized coordinates)
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * 2 * Math.PI;
      circleX.push(normalizedGoalX + radius * Math.cos(angle));
      circleY.push(normalizedGoalY + radius * Math.sin(angle));
      circleZ.push(goalZ);
      
      // Create triangles from center to edge
      circleI.push(0); // center
      circleJ.push(i + 1);
      circleK.push(i === numPoints - 1 ? 1 : i + 2);
    }

    plotData.push({
      type: 'mesh3d',
      x: circleX,
      y: circleY,
      z: circleZ,
      i: circleI,
      j: circleJ,
      k: circleK,
      color: '#22c55e',
      opacity: 1.0,
      name: 'Goal',
      showlegend: false,
      hoverinfo: 'name',
    });

    return plotData;
  };

  if (loading) {
    return (
      <div 
        className="flex items-center justify-center bg-card/50 rounded-xl border border-border/50"
        style={{ height }}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          <span className="text-sm text-muted-foreground">Loading visualization...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className="flex items-center justify-center bg-destructive/10 rounded-xl border border-destructive/30"
        style={{ height }}
      >
        <div className="text-destructive text-sm">Error loading visualization: {error}</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div 
        className="flex items-center justify-center bg-muted/50 rounded-xl border border-border/50"
        style={{ height }}
      >
        <div className="text-muted-foreground text-sm">No data available</div>
      </div>
    );
  }

  const plotData = createPlotData(data);
  
  const layout: Partial<Layout> = {
    title: {
      text: data.layout.title,
      font: {
        size: 14,
        color: 'hsl(var(--foreground))'
      }
    },
    scene: {
      xaxis: { 
        title: { text: data.layout.scene.xaxis_title },
        gridcolor: 'hsl(var(--border))',
        zerolinecolor: 'hsl(var(--border))'
      },
      yaxis: { 
        title: { text: data.layout.scene.yaxis_title },
        gridcolor: 'hsl(var(--border))',
        zerolinecolor: 'hsl(var(--border))'
      },
      zaxis: { 
        title: { text: data.layout.scene.zaxis_title },
        gridcolor: 'hsl(var(--border))',
        zerolinecolor: 'hsl(var(--border))'
      },
      aspectmode: data.layout.scene.aspectmode,
      bgcolor: 'transparent',
      camera: {
        eye: { x: 1.5, y: 1.5, z: 1.2 }
      }
    },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    font: {
      family: 'inherit',
      size: 11,
      color: 'hsl(var(--muted-foreground))'
    },
    margin: {
      l: 0,
      r: 0,
      t: 40,
      b: 0
    },
    autosize: true,
  };

  const envName = data.metadata.environment_name
    .replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());

  return (
    <figure className="my-8 not-prose">
      <div 
        className="bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 overflow-hidden shadow-lg"
      >
        {/* Stats bar */}
        <div className="px-4 py-3 border-b border-border/30 bg-muted/30">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{envName}</span>
            <span>Goal: [{data.metadata.goal_position.join(', ')}]</span>
            <span>Resolution: {data.metadata.grid_resolution}×{data.metadata.grid_resolution}</span>
          </div>
        </div>
        
        {/* Plot container */}
        <div style={{ height }}>
          <Plot
            data={plotData}
            layout={layout}
            style={{ width: '100%', height: '100%' }}
            useResizeHandler={true}
            config={{
              displayModeBar: true,
              displaylogo: false,
              modeBarButtonsToRemove: ['sendDataToCloud', 'toImage'],
              responsive: true,
              modeBarButtonsToAdd: [{
                name: 'Download PNG',
                title: 'Download as PNG',
                icon: {
                  width: 24,
                  height: 24,
                  path: 'M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z'
                },
                click: function(gd: { data: object[]; layout: object }) {
                  import('plotly.js').then((Plotly) => {
                    Plotly.downloadImage(gd, {
                      format: 'png',
                      width: 1200,
                      height: 800,
                      filename: `latent-landscape-${data.metadata.environment_name}`
                    });
                  });
                }
              }]
            }}
          />
        </div>
      </div>
      
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default LatentLandscape;

