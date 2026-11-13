export const socials = [
  { label: "Email", href: "mailto:ari@ar13.dev" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/arishah/" },
  { label: "GitHub", href: "https://github.com/ar1shah" },
  { label: "X", href: "https://x.com/ar1shah" },
] as const;

export type Preview = {
  href: string;
  domain: string;
  title: string;
  description: string;
  image: string;
};

export const previews = {
  ucf: {
    href: "https://www.ucf.edu/",
    domain: "ucf.edu",
    title: "University of Central Florida",
    description: "Florida’s technological university, in Orlando.",
    image: "/previews/ucf.jpg",
  },
  blackridge: {
    href: "https://blackridgenorth.com/",
    domain: "blackridgenorth.com",
    title: "Blackridge North Holdings",
    description: "Residential real estate acquisition and investment.",
    image: "/previews/blackridge.jpg",
  },
  ghana: {
    href: "https://ghanamedicalhelp.com/",
    domain: "ghanamedicalhelp.com",
    title: "Ghana Medical Help",
    description:
      "Volunteer-run charity supporting health projects in northern Ghana.",
    image: "/previews/ghana.jpg",
  },
} satisfies Record<string, Preview>;
