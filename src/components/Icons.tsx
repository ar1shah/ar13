const base = {
  width: 14,
  height: 14,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowLeft({ size = 14 }: { size?: number }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M19 12H5M11 18l-6-6 6-6" />
    </svg>
  );
}

export function ArrowUpRight({ size = 12 }: { size?: number }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M7 17L17 7M8 7h9v9" />
    </svg>
  );
}
