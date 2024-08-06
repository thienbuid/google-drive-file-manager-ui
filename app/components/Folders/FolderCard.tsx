import { File } from "@/app/interfaces/file.interface";
import Image from "next/image";
import React from "react";

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
      </div>
    </div>
  );
};

export default FolderCard;
