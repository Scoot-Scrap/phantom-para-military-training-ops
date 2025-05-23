// app/components/WidgetGrid.jsx

'use client';

import React, { useState } from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import Widget from './Widget';

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function WidgetGrid({ items, layouts, onLayoutChange }) {
  const [currentLayouts, setCurrentLayouts] = useState(layouts);

  const handleLayoutChange = (layout, allLayouts) => {
    setCurrentLayouts(allLayouts);
    if (onLayoutChange) {
      onLayoutChange(allLayouts);
    }
  };

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={currentLayouts}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 2 }}
      rowHeight={30}
      draggableHandle=".widget-handle"
      onLayoutChange={handleLayoutChange}
    >
      {items.map((item) => (
        <div key={item.i} data-grid={item}>
          <Widget id={item.i} content={item.content} />
        </div>
      ))}
    </ResponsiveGridLayout>
  );
}







WidgetGrid.jsx
WidgetGrid.jsx
WidgetGrid.jsx
WidgetGrid.jsx
WidgetGrid.jsx
WidgetGrid.jsx
WidgetGrid.jsx