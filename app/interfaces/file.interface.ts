import { FileType } from "./enums/file-type";

export interface File {
  mimeType: string;
  iconLink: string;
  id: string;
  name: string;
  trashed: boolean;
  modifiedTime: string;
  type: FileType;
}
