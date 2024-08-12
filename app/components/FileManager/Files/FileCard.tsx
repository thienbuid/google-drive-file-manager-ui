import { FileType } from "@/app/interfaces/enums/file-type";
import { File } from "@/app/interfaces/file.interface";
import Image from "next/image";
import React, { ReactNode } from "react";
import FileCardAction from "../FileAction/FileCardAction";

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
        <FileCardAction file={file} />
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
