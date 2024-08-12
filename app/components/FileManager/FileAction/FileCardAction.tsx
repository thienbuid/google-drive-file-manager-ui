import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DialogTrigger } from '@radix-ui/react-dialog';
import {
    Download,
    FolderInput,
    FolderOpen,
    Info,
    Link,
    PencilLine,
    Share,
    Trash,
    UserPlus,
} from 'lucide-react';
import RenameDialog from './RenameDialog';
import { File } from '@/app/interfaces/file.interface';
import fileManagerService, { RenameBody } from '@/app/services/file-manager.service';
import { FileManagerAction } from '@/app/interfaces/enums/file-manager-action.enum';
import { toast } from '@/components/ui/use-toast';
import useFileManager from '@/app/store/file-manager-store';

type Props = {
    file: File;
};

const FileCardAction = ({ file }: Props) => {
    const { removeFile } = useFileManager();
    const [menuOpen, setMenuOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const moveToTrash = async () => {
        const response = await fileManagerService.fileManager<RenameBody>({
            action: FileManagerAction.DELETE,
            deleteFile: {
                fileId: file.id,
            },
        });
        if (response.status === 'OK') {
            removeFile(file);
            toast({
                description: `Folder moved to trash`,
            });
        }
    };

    const handleCopyLink = () => {
        const link = `https://drive.google.com/file/d/${file.id}/view?usp=drive_link`;
        navigator.clipboard.writeText(link);
        toast({
            description: 'Link copied',
        });
    };

    const handleDownload = () => {
        const downloadLink = `https://drive.google.com/uc?export=download&id=${file.id}`;
        window.open(downloadLink, '_blank');
    };

    return (
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
            <DropdownMenuTrigger asChild>
                <div className="flex rounded-full p-1 items-center justify-center hover:bg-zinc-400">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-5"
                    >
                        <path d="M10 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM10 8.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM11.5 15.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
                    </svg>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={handleDownload} className="cursor-pointer">
                        <Download className="mr-2 h-4 w-4" />
                        <span>Download</span>
                        <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onSelect={(e) => {
                            e.preventDefault();
                            setMenuOpen(false);
                            setDialogOpen(true);
                        }}
                    >
                        <PencilLine className="mr-2 h-4 w-4" />
                        <span>Rename</span>
                        <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer">
                    <Link className="mr-2 h-4 w-4" />
                    <span>Copy link</span>
                </DropdownMenuItem>
                <DropdownMenuGroup>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="cursor-pointer">
                            <FolderOpen className="mr-2 h-4 w-4" />
                            <span>Organize</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem className="cursor-pointer">
                                    <FolderInput className="mr-2 h-4 w-4" />
                                    <span>Move</span>
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem className="cursor-pointer">
                        <Info className="mr-2 h-4 w-4" />
                        <span>File information</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={moveToTrash} className="cursor-pointer">
                    <Trash className="mr-2 h-4 w-4" />
                    <span>Move to trash</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
            <RenameDialog file={file} dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
        </DropdownMenu>
    );
};

export default FileCardAction;
