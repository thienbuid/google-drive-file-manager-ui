import { FileType } from '@/app/interfaces/enums/file-type';
import { File } from '@/app/interfaces/file.interface';
import { DirectoryTree } from '@/app/interfaces/folder-tree.interface';
import useFileManager from '@/app/store/file-manager-store';
import { request, ResponseType } from '@/app/utils/api/axios';
import React, { useState } from 'react';

type Props = {
    className: string;
    data: DirectoryTree;
    handleFolderClick: Function;
};

const FolderTree = ({ className, data, handleFolderClick }: Props) => {
    const [isShowChildren, setIsShowChildren] = useState(false);
    return (
        data && (
            <ul className={className}>
                <li className="my-1 cursor-pointer">
                    <div
                        onClick={() => handleFolderClick(data)}
                        className="flex gap-2 items-center p-1 hover:bg-[#C1E7FE] rounded-lg"
                    >
                        <div className="flex-shrink-0">
                            <svg
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsShowChildren((prev) => !prev);
                                }}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className={`size-5 transition duration-300 ${
                                    isShowChildren ? 'rotate-90' : ''
                                }`}
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="flex-shrink-0">
                            <img src={data.iconLink} alt="" className="w-5 h-5" />
                        </div>
                        <p className="truncate select-none text-xs">{data.name}</p>
                    </div>
                    {isShowChildren &&
                        data.children?.map((folder) => {
                            return (
                                <FolderTree
                                    handleFolderClick={handleFolderClick}
                                    key={folder.id}
                                    className="block ml-2"
                                    data={folder}
                                />
                            );
                        })}
                </li>
            </ul>
        )
    );
};

export default FolderTree;
