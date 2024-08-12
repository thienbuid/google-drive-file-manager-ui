import { create } from 'zustand';
import { DirectoryTree } from '../interfaces/folder-tree.interface';
import { File } from '../interfaces/file.interface';
import { StorageQuota } from '../interfaces/storage-quota.interface';
import { FileType } from '../interfaces/enums/file-type';
import fileManagerService from '../services/file-manager.service';
import { ResponseType } from '../utils/api/axios';

const root: File = {
    mimeType: 'application/vnd.google-apps.folder',
    iconLink:
        'https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.folder+shared',
    id: 'root',
    name: 'My Drive',
    trashed: false,
    modifiedTime: '2020-01-01T16:12:20.482Z',
    type: FileType['application/vnd.google-apps.folder'],
};

interface FileManagerState {
    files: File[];
    loadingFiles: boolean;
    setFiles: (files: File[]) => void;
    getFiles: () => File[];
    getFolders: () => File[];
    setLoadingFiles: (is: boolean) => void;
    renameFile: (fileAfterRename: File) => void;
    removeFile: (file: File) => void;

    fileSelected: File | null;

    currentFolder: File | null;
    setCurrentFolder: (folder: File | null) => void;

    storageQuota: StorageQuota | null;
    setStorageQouta: (storageQouta: StorageQuota) => void;

    directoryTree: DirectoryTree | null;
    setDirectoryTree: (directoryTree: DirectoryTree) => void;

    pathDirectory: File[];
    nextDirectory: (directory: File) => void;
}

const useFileManager = create<FileManagerState>((set, get) => ({
    files: [],
    loadingFiles: false,
    setFiles: (files) => set({ files, loadingFiles: false }),
    getFiles: () => {
        const { files } = get();
        return files.filter((file) => file.type !== FileType['application/vnd.google-apps.folder']);
    },
    getFolders: () => {
        const { files } = get();
        return files.filter((file) => file.type === FileType['application/vnd.google-apps.folder']);
    },
    setLoadingFiles: (is: boolean) => set({ loadingFiles: is }),
    renameFile: (fileAfterRename: File) => {
        const files = get().files;
        const index = files.findIndex((file) => file.id === fileAfterRename.id);
        files[index] = { ...files[index], ...fileAfterRename };
        set({ files });
    },
    removeFile: (file: File) => {
        const files = get().files;
        const filesAfterRemoveFile = files.filter((f) => f.id !== file.id);
        set({ files: filesAfterRemoveFile });
    },

    fileSelected: null,

    currentFolder: root,
    setCurrentFolder: (folder) => set({ currentFolder: folder }),

    directoryTree: null,
    setDirectoryTree: (directoryTree: DirectoryTree) => set({ directoryTree }),

    storageQuota: null,
    setStorageQouta: (storageQuota: StorageQuota) => set({ storageQuota }),

    pathDirectory: [root],
    nextDirectory: (directory: File) => {
        const { pathDirectory } = get();
        const indexDirectorySelectInPathDirectory = pathDirectory.findIndex(
            (d) => d.id === directory.id,
        );
        if (indexDirectorySelectInPathDirectory === -1)
            return set({
                currentFolder: directory,
                pathDirectory: [...pathDirectory, directory],
            });
        return set({
            currentFolder: directory,
            pathDirectory: pathDirectory.filter(
                (d, index) => index <= indexDirectorySelectInPathDirectory,
            ),
        });
    },
}));

export default useFileManager;
