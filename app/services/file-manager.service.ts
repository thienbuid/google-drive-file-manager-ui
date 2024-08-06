import { File } from "../interfaces/file.interface";
import { FolderTree } from "../interfaces/folder-tree";
import { InfoCloud } from "../interfaces/info-cloud.interface";
import { request, ResponseType } from "../utils/api/axios";

class FileManagerService {
  async getFolderTree() {
    return await request.get<ResponseType<FolderTree>>(
      "http://localhost:3900/v1/api/file-manager/tree-folder"
    );
  }

  async getFilesFromFolder(folderId: string) {
    return await request.get<ResponseType<File[]>>(
      `http://localhost:3900/v1/api/file-manager/folder/${folderId}/files`
    );
  }

  async getAbout() {
    return await request.get<ResponseType<InfoCloud>>(
      "http://localhost:3900/v1/api/file-manager/about"
    );
  }
}

const fileManagerService = new FileManagerService();
export default fileManagerService;
