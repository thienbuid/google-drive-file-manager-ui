import { FileType } from "@/app/interfaces/enums/file-type";
import { File } from "@/app/interfaces/file.interface";
import Image from "next/image";
import React, { ReactNode } from "react";

type Props = {
  file: File;
};

const FileCard = ({ file }: Props) => {
  return (
    <div className="flex flex-col bg-[#F0F4F8] hover:bg-[#d9dcdf] rounded-lg flex-1 p-4 gap-4 h-[300px] hover:cursor-pointer focus:bg-pink-300">
      <div className="flex justify-between items-center flex-row gap-4">
        <div>
          <img src={file.iconLink} alt="" />
        </div>
        <p className="flex flex-1 truncate select-none">{file.name}</p>
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
      {file.type && (
        <div className="overflow-hidden rounded-lg">
          <img
            src={`https://lh3.googleusercontent.com/d/${file.id}=w1000-h1000?authuser=0`}
            alt=""
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
};

export default FileCard;
