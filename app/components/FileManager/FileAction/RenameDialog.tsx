import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { File } from '@/app/interfaces/file.interface';
import fileManagerService, {
    FileManagerAction,
    RenameBody,
} from '@/app/services/file-manager.service';
import useFileManager from '@/app/store/file-manager-store';

const formSchema = z.object({
    name: z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
});

type RenameFormProps = {
    file: File;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const RenameForm = ({ file, setDialogOpen }: RenameFormProps) => {
    const { renameFile } = useFileManager();
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: file?.name,
        },
    });
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setDialogOpen(false);
        const response = await fileManagerService.fileManager<RenameBody>({
            action: FileManagerAction.RENAME,
            renameFile: {
                name: values.name,
                fileId: file.id,
            },
        });
        if (response.status === 'OK') {
            renameFile(response.data);
            toast({
                description: `"${file.name}" renamed to "${response.data.name}"`,
            });
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div className="flex gap-2 justify-end">
                    <Button onClick={() => setDialogOpen(false)} type="button" variant="outline">
                        Cancel
                    </Button>
                    <Button className="flex flex-1 max-w-28 bg-blue-600 text-white" type="submit">
                        OK
                    </Button>
                </div>
            </form>
        </Form>
    );
};

type RenameDialogProps = {
    file: File;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    dialogOpen: boolean;
};

const RenameDialog = ({ file, dialogOpen, setDialogOpen }: RenameDialogProps) => {
    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl font-normal">Rename</DialogTitle>
                    <DialogDescription></DialogDescription>
                    <RenameForm file={file} setDialogOpen={setDialogOpen} />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default RenameDialog;
