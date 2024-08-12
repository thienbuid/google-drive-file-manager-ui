import React, { useEffect, useState } from 'react';
import FileCard from './FileCard';
import { File } from '@/app/interfaces/file.interface';
import useFileManager from '@/app/store/file-manager-store';
import { FileType } from '@/app/interfaces/enums/file-type';

const Files = () => {
    const { getFiles } = useFileManager();
    const files = getFiles();
    if (!files || !files.length) return;

    return (
        <div className="flex flex-col gap-5">
            <h4 className="font-medium">Files</h4>
            <div className="grid-container">
                {files.map((file: File) => {
                    return <FileCard key={file.id} file={file} />;
                })}
            </div>
        </div>
    );
};

export default Files;
