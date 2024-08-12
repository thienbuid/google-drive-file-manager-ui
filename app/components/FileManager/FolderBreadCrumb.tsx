import { File } from '@/app/interfaces/file.interface';
import useFileManager from '@/app/store/file-manager-store';
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import next from 'next';
import React from 'react';

const MAX_PATH = 4;

const FolderBreadCrumb = () => {
    const { pathDirectory, nextDirectory } = useFileManager();
    const lengthFoldersPath = pathDirectory.length - 1;
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {lengthFoldersPath >= MAX_PATH ? (
                    <>
                        <BreadcrumbItem onClick={() => nextDirectory(pathDirectory[0])}>
                            <p className="text-xl cursor-pointer truncate w-full max-w-56">
                                {pathDirectory[0].name}
                            </p>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex items-center gap-1">
                                    <BreadcrumbEllipsis className="h-4 w-4 hover:bg-gray-400 rounded-full size-6" />
                                    <span className="sr-only">Toggle menu</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    {pathDirectory.map((folder, index, folders) => {
                                        if (index === 0 || index === folders.length - 1) return;
                                        return (
                                            <DropdownMenuItem
                                                className="flex gap-2 cursor-pointer"
                                                key={folder.id}
                                                onClick={() => nextDirectory(folder)}
                                            >
                                                <img src={folder.iconLink} alt="" />
                                                <p className="text-sm font-light truncate w-full max-w-36">
                                                    {folder.name}
                                                </p>
                                            </DropdownMenuItem>
                                        );
                                    })}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem onClick={() => nextDirectory(pathDirectory[length - 1])}>
                            <p className=" text-black text-xl font-medium cursor-pointer truncate w-full max-w-56">
                                {pathDirectory[lengthFoldersPath].name}
                            </p>
                        </BreadcrumbItem>
                    </>
                ) : (
                    <>
                        {pathDirectory.map((folder, index, folders) => {
                            const length = folders.length;
                            return (
                                <div key={folder.id} className="flex items-center">
                                    <BreadcrumbItem onClick={() => nextDirectory(folder)}>
                                        <p
                                            className={`${
                                                lengthFoldersPath === index &&
                                                'text-black font-medium'
                                            } text-xl cursor-pointer mr-2 truncate w-full max-w-56`}
                                        >
                                            {folder.name}
                                        </p>
                                    </BreadcrumbItem>
                                    {index !== length - 1 && <BreadcrumbSeparator />}
                                </div>
                            );
                        })}
                    </>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default FolderBreadCrumb;
