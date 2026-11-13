export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/**
 * Drop new images in public/photos and add them here.
 * width/height are the file's pixel size (used to reserve space while loading).
 */
export const photos: Photo[] = [
  { src: "/photos/chihuahua.jpg", alt: "Chihuahua", width: 900, height: 1126 },
  {
    src: "/photos/kitchen-laptop.jpg",
    alt: "Laptop on a kitchen counter",
    width: 900,
    height: 1126,
  },
  { src: "/photos/margarita.jpg", alt: "Margarita", width: 551, height: 690 },
];
