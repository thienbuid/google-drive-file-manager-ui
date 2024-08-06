import React, { useEffect, useState } from "react";
import { File } from "@/app/interfaces/file.interface";
import FolderCard from "./FolderCard";

type Props = {
  folders: File[];
  onClickFolder: Function;
};

const Folders = ({ folders, onClickFolder }: Props) => {
  return folders.length ? (
    <div className="flex flex-col gap-5">
      <h4 className="font-medium">Folders</h4>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
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
  ) : (
    <></>
  );
};

export default Folders;
