import React, { useEffect, useState } from 'react';
import { File } from '@/app/interfaces/file.interface';
import FolderCard from './FolderCard';
import useFileManager from '@/app/store/file-manager-store';
import { FileType } from '@/app/interfaces/enums/file-type';

type Props = {
    onClickFolder: Function;
};

const Folders = ({ onClickFolder }: Props) => {
    const { getFolders } = useFileManager();
    const folders = getFolders();

    if (!folders || !folders.length) return;

    return (
        <div className="flex flex-col gap-5">
            <h4 className="font-medium">Folders</h4>
            <div className="grid-container">
                {folders.map((folder: File) => {
                    return <FolderCard onClick={onClickFolder} key={folder.id} folder={folder} />;
                })}
            </div>
        </div>
    );
};

export default Folders;
