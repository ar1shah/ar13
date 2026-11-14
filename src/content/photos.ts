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
  {
    src: "/photos/elephant.jpg",
    alt: "Young elephant in tall grass, ears out and trunk raised",
    width: 2576,
    height: 1448,
  },
  {
    src: "/photos/sundowner.jpg",
    alt: "Drinks and chips on a wooden table at sunset on the savanna",
    width: 2576,
    height: 1450,
  },
  {
    src: "/photos/lion-cubs.jpg",
    alt: "Three lion cubs sitting on a log in green brush",
    width: 2576,
    height: 1448,
  },
  {
    src: "/photos/topi.jpg",
    alt: "Four topi antelope running in a line across golden grassland",
    width: 2576,
    height: 1448,
  },
  {
    src: "/photos/leopard.jpg",
    alt: "Close-up of a leopard yawning in a tree",
    width: 2576,
    height: 1448,
  },
];
