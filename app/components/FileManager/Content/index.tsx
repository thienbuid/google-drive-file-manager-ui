import React from 'react';
import Folders from '../Folders';
import Files from '../Files';
import useFileManager from '@/app/store/file-manager-store';
import FolderEmpty from '../../FolderEmpty';
import Loading from '../../Loading';

type Props = {};

const Content = (props: Props) => {
    const { nextDirectory, files, loadingFiles } = useFileManager();

    if (loadingFiles) return <Loading />;
    
    if (!files.length) return <FolderEmpty />;

    return (
        <div className="flex flex-col h-full gap-5 overflow-auto">
            <Folders onClickFolder={nextDirectory} />
            <Files />
        </div>
    );
};

export default Content;
