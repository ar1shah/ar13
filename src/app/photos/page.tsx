import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PhotoGallery from "@/components/PhotoGallery";
import { photos } from "@/content/photos";

export const metadata: Metadata = {
  title: "Photos",
  description: "Photos by Ari Shah.",
};

export default function PhotosPage() {
  return (
    <PageShell
      title="Photos"
      intro={<p>iphone 18 pro, canon eos rebel t7i, dji osmo pocket 3</p>}
      width="max-w-[1120px]"
    >
      <PhotoGallery photos={photos} />
    </PageShell>
  );
}
