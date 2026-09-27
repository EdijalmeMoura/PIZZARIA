const importedPhotos = import.meta.glob("../assets/products/studio/*.jpg", {
  eager: true,
  query: "?url",
  import: "default",
});

export const studioProductPhotos = Object.fromEntries(
  Object.entries(importedPhotos).map(([filePath, url]) => [
    filePath.split("/").pop().replace(/\.jpg$/i, ""),
    url,
  ])
);
