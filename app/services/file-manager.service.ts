import { File } from '../interfaces/file.interface';
import { DirectoryTree } from '../interfaces/folder-tree.interface';
import { StorageQuota } from '../interfaces/storage-quota.interface';
import { request, ResponseType } from '../utils/api/axios';

export enum FileManagerAction {
    CREATE_FOLDER = 'CREATE_FOLDER',
    RENAME = 'RENAME',
    DELETE = 'DELETE',
    COPY = 'COPY',
    DETAILS = 'DETAILS',
    MOVE = 'MOVE',
}

interface FileManager {
    action: FileManagerAction;
}

export interface RenameBody extends FileManager {
    renameFile?: {
        name: string;
        fileId: string;
    };
    deleteFile?: {
        fileId: string;
    };
}

class FileManagerService {
    async fileManager<Body>(body: Body) {
        return await request.post<Body, ResponseType<File>>(
            'http://localhost:3900/v1/api/file-manager',
            body,
        );
    }

    async getFolderTree() {
        return await request.get<ResponseType<DirectoryTree>>(
            'http://localhost:3900/v1/api/file-manager/tree-folder',
        );
    }

    async getFilesFromFolder(folderId: string): Promise<ResponseType<File[]>> {
        return await request.get<ResponseType<File[]>>(
            `http://localhost:3900/v1/api/file-manager/folder/${folderId}/files`,
        );
    }

    async downloadFile(fileId: string): Promise<ResponseType<File[]>> {
        return await request.get(
            `http://localhost:3900/v1/api/file-manager/download/${fileId}`,
        );
    }

    async getAbout() {
        return await request.get<ResponseType<StorageQuota>>(
            'http://localhost:3900/v1/api/file-manager/about',
        );
    }
}

const fileManagerService = new FileManagerService();
export default fileManagerService;
