import { File } from "./file.interface";

export interface DirectoryTree extends File {
  children: DirectoryTree[];
}
