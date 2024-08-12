import useFileManager from '@/app/store/file-manager-store';
import { convertSize } from '@/app/utils/functions/convert-size-file';
import { Progress } from '@/components/ui/progress';
import React from 'react';

type Props = {};

const StorageQuota = (props: Props) => {
    const { storageQuota } = useFileManager();

    if (!storageQuota) return;

    return (
        <div className="flex w-full flex-col gap-2">
            <Progress
                className="h-2"
                value={(parseInt(storageQuota.usage) / parseInt(storageQuota.limit)) * 100}
            />
            <p className="text-zinc-600 text-sm">
                {convertSize(storageQuota.usage)} of {convertSize(storageQuota.limit)} used
            </p>
        </div>
    );
};

export default StorageQuota;
