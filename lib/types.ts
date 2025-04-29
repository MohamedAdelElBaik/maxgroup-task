export type DriveItem = {
  id: string;
  name: string;
  createdAt: string;
  type: "folder" | "file";
  child: DriveItem[];
  size?: number;
}
