import type { SVGProps } from 'react';

export function UPrepLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 20"
      width="100"
      height="20"
      aria-labelledby="uprepLogoTitle"
      {...props}
    >
      <title id="uprepLogoTitle">UPrep Logo</title>
      <text
        x="0"
        y="15"
        fontFamily="Poppins, sans-serif"
        fontSize="16"
        fontWeight="bold"
        fill="currentColor"
      >
        UPrep
      </text>
    </svg>
  );
}
