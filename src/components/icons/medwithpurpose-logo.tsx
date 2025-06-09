import Image from 'next/image';
import type { HTMLAttributes } from 'react';

interface MedWithPurposeLogoProps extends HTMLAttributes<HTMLDivElement> {
  width?: number;
  height?: number;
}

export function MedWithPurposeLogo({ width = 150, height = 40, className, ...props }: MedWithPurposeLogoProps) {
  return (
    <div className={className} {...props}>
      <Image
        src="https://ik.imagekit.io/mwp/MWP%20color%20transparent.png?updatedAt=1745982959084"
        alt="MedWithPurpose Logo"
        width={width}
        height={height}
        priority 
      />
    </div>
  );
}
