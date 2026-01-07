interface IFile {
  url: string;
  publicId: string;
  resourceType: "image" | "video" | "raw";
}

export { IFile };
