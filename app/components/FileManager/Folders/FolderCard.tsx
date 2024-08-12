import { File } from "@/app/interfaces/file.interface";
import Image from "next/image";
import React from "react";
import FileCardAction from "../FileAction/FileCardAction";

type Props = {
  folder: File;
  onClick: Function;
};

const FolderCard = ({ folder, onClick }: Props) => {
  return (
    <div
      onDoubleClickCapture={() => {
        onClick(folder);
      }}
      tabIndex={0}
      className="flex flex-col bg-[#F0F4F8] focus:bg-[#C1E7FE] hover:bg-[#d9dcdf] hover:cursor-pointer rounded-lg flex-1 p-4 gap-4"
    >
      <div className="flex justify-between flex-row gap-4">
        <div>
          <img src={folder.iconLink} alt="" className="w-6 h-auto" />
        </div>
        <p className="flex flex-1 truncate items-center leading-none select-none">
          {folder.name}
        </p>
        <FileCardAction file={folder} />
      </div>
    </div>
  );
};

export default FolderCard;
