'use client';
import React, { useEffect } from 'react';
import Files from './Files';
import Folders from './Folders';
import FolderEmpty from '../FolderEmpty';
import Loading from '../Loading';
import { convertSize } from '../../utils/functions/convert-size-file';
import FolderTree from './FolderTree';
import FolderBreadCrumb from './FolderBreadCrumb';
import fileManagerService from '../../services/file-manager.service';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { Plus } from 'lucide-react';
import useFileManager from '@/app/store/file-manager-store';
import StorageQuota from './StorageQuota';
import Content from './Content';

const GoogleDriveManager = () => {
    const {
        setFiles,
        setLoadingFiles,
        setDirectoryTree,
        directoryTree,
        setStorageQouta,
        nextDirectory,
        currentFolder,
    } = useFileManager();

    useEffect(() => {
        if (!currentFolder) return;
        const fetchData = async () => {
            setLoadingFiles(true);
            const response = await fileManagerService.getFilesFromFolder(currentFolder.id);
            if (response.status === 'OK') {
                setFiles(response.data);
            }
        };
        fetchData();
    }, [currentFolder]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fileManagerService.getFolderTree();
            if (response.status === 'OK') {
                setDirectoryTree(response.data);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fileManagerService.getAbout();
            if (response.status === 'OK') {
                setStorageQouta(response.data);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="mlg:flex-col flex w-full gap-3 justify-between h-full mx-auto bg-[#e5e8eb] rounded-xl overflow-hidden select-none">
            <div className="flex mlg:w-full mlg:flex-row mlg:items-center flex-col gap-5 w-2/12 p-8">
                <Button>
                    <Plus size={20} className="mr-2" />
                    New
                </Button>
                {directoryTree && (
                    <div className="mlg:hidden overflow-auto">
                        <FolderTree
                            handleFolderClick={nextDirectory}
                            className="list-none"
                            data={directoryTree}
                        />
                    </div>
                )}
                <StorageQuota />
            </div>
            <div className="flex flex-col gap-5 p-8 flex-1 bg-white overflow-hidden">
                <FolderBreadCrumb />
                <Content />
            </div>
            <Toaster />
        </div>
    );
};

export default GoogleDriveManager;
