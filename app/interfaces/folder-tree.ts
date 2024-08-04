import { File } from "./file.interface";

export interface FolderTree extends File {
  children: FolderTree[];
}
