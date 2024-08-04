import React, { useEffect, useState } from "react";
import FileCard from "./FileCard";
import { File } from "@/app/interfaces/file.interface";

type Props = {
  files: File[];
};

const Files = ({ files }: Props) => {
  return files.length ? (
    <div className="flex flex-col gap-5">
      <h4 className="font-medium">Files</h4>
      <div className="grid grid-cols-4 gap-4 ">
        {files.map((file: File) => {
          return <FileCard key={file.id} file={file} />;
        })}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Files;
