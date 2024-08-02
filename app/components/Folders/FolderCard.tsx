import { File } from "@/app/interfaces/file.interface";
import React from "react";

type Props = {
  folder: File;
  onClick: Function;
};

const FolderCard = ({ folder, onClick }: Props) => {
  return (
    <div
      onClick={() => {
        onClick(folder);
      }}
      className="flex flex-col bg-[#F0F4F8] hover:bg-[#d9dcdf] rounded-lg flex-1 p-4 gap-4"
    >
      <div className="flex justify-between items-center flex-row gap-4">
        <div>
          <img src={folder.iconLink} alt="" />
        </div>
        <p className="flex flex-1 truncate">{folder.name}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5"
        >
          <path d="M10 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM10 8.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM11.5 15.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
        </svg>
      </div>
    </div>
  );
};

export default FolderCard;
