export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Shown under the photo, e.g. where it was taken. */
  caption?: string;
};

/**
 * Drop new images in public/photos and add them here.
 * The grid reads left to right, then down, in this order.
 * width/height are the file's pixel size (used to reserve space while loading).
 */
export const photos: Photo[] = [
  {
    src: "/photos/elephant.jpg",
    caption: "Tarangire National Park, Tanzania",
    alt: "Young elephant in tall grass, ears out and trunk raised",
    width: 2576,
    height: 1448,
  },
  {
    src: "/photos/lion-cubs.jpg",
    caption: "Ngorongoro, Tanzania",
    alt: "Three lion cubs sitting on a log in green brush",
    width: 2576,
    height: 1448,
  },
  {
    src: "/photos/leopard.jpg",
    caption: "Tarangire National Park, Tanzania",
    alt: "Close-up of a leopard yawning in a tree",
    width: 2576,
    height: 1448,
  },
  {
    src: "/photos/sundowner.jpg",
    caption: "Tarangire National Park, Tanzania",
    alt: "Drinks and chips on a wooden table at sunset on the savanna",
    width: 2576,
    height: 1450,
  },
  {
    src: "/photos/topi.jpg",
    caption: "Serengeti National Park, Tanzania",
    alt: "Four topi antelope running in a line across golden grassland",
    width: 2576,
    height: 1448,
  },
];
