import React, { useEffect, useState } from "react";
import { File } from "@/app/interfaces/file.interface";
import FolderCard from "./FolderCard";

type Props = {
  folders: File[];
  onClickFolder: Function;
};

const Folders = ({ folders, onClickFolder }: Props) => {
  return (
    <div className="flex flex-col gap-5">
      <h4 className="font-medium">Folders</h4>
      <div className="grid grid-cols-4 gap-4">
        {folders.map((folder: File) => {
          return (
            <FolderCard
              onClick={onClickFolder}
              key={folder.id}
              folder={folder}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Folders;
