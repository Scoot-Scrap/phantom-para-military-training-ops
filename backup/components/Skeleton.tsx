import React from 'react';

interface SkeletonProps {
  width?: string;
  height?: string;
  circle?: boolean;
  className?: string;
}

/**
 * A generic Skeleton placeholder.
 * - width/height override the defaults.
 * - circle=true makes it round (for avatars, etc).
 */
const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '1rem',
  circle = false,
  className = '',
}) => {
  return (
    <div
      className={`skeleton ${circle ? 'skeleton-avatar' : ''} ${className}`}
      style={{ width, height, borderRadius: circle ? '50%' : '4px' }}
    />
  );
};

export default Skeleton;