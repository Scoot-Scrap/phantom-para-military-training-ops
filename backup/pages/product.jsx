import dynamic from 'next/dynamic';
import React from 'react';

const VariantPicker = dynamic(() => import('../components/VariantPicker'), {
  ssr: false, // disable server-side rendering for this component
});

export default function ProductPage() {
  const [variant, setVariant] = React.useState(null);
  const variants = ['Small', 'Medium', 'Large'];

  return (
    <div>
      <h1>Product Details</h1>
      <VariantPicker options={variants} onSelect={setVariant} />
      {variant && <p>Selected: {variant}</p>}
    </div>
  );
}