"use client";
import React, { useCallback, useState } from "react";
import { Button } from "./Button";
import Files from "./Files";
import useFetchData from "../hooks/useFetchData";
import { File } from "../interfaces/file.interface";
import Folders from "./Folders";
import { FileType } from "../interfaces/enums/file-type";
import FolderEmpty from "./FolderEmpty";
import Loading from "./Loading";
import ProgressBar from "./ProgressBar";
import { InfoCloud } from "../interfaces/info-cloud.interface";
import { convertSize } from "../utils/functions/convert-size-file";
import FolderTree from "./FolderTree";
import { FolderTree as FolderTreeType } from "../interfaces/folder-tree";
import BreadCrumb from "./BreadCrumb";
import fileManagerService from "../services/file-manager.service";

const root: File = {
  mimeType: "application/vnd.google-apps.folder",
  iconLink:
    "https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.folder+shared",
  id: "root",
  name: "My Drive",
  trashed: false,
  modifiedTime: "2020-01-01T16:12:20.482Z",
  type: FileType["application/vnd.google-apps.folder"],
};

const GoogleDriveManager = () => {
  const [breadcrumbs, setBreadcrumbs] = useState<File[]>([root]);

  const [cloudInfo, cloudInfoStatus, setCloudInfo] = useFetchData<InfoCloud>(
    fileManagerService.getAbout,
    {} as InfoCloud
  );

  const [files, filesStatus, setFiles] = useFetchData<File[]>(
    useCallback(
      async () =>
        fileManagerService.getFilesFromFolder(
          breadcrumbs[breadcrumbs.length - 1].id
        ),
      [breadcrumbs]
    ),
    [],
  );

  const [folderTree, folderTreeStatus, setFolderTree] =
    useFetchData<FolderTreeType>(fileManagerService.getFolderTree, {} as any);

  const handleFolderClick = (file: File) => {
    const isExist = breadcrumbs.findIndex((bread) => bread.id === file.id);
    if (isExist !== -1) handleBackFolder(isExist);
    else setBreadcrumbs((prev) => [...prev, file]);
  };

  const handleBackFolder = (selectIndex: number) => {
    const breadcrumbsAfterRemove = breadcrumbs.filter(
      (bread, index) => index <= selectIndex
    );
    setBreadcrumbs(breadcrumbsAfterRemove);
  };

  return (
    <div className="container flex gap-3 justify-between h-[1000px] mx-auto bg-[#e5e8eb] rounded-xl overflow-hidden select-none">
      <div className="flex flex-col gap-5 w-2/12 p-8">
        <Button
          onClick={() => {
            console.log("Show action");
          }}
          leftIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
            </svg>
          }
        >
          New
        </Button>
        {folderTreeStatus.status === "OK" && (
          <div className="overflow-auto">
            <FolderTree
              handleFolderClick={handleFolderClick}
              className="list-none"
              data={folderTree}
            />
          </div>
        )}
        {cloudInfoStatus.status === "OK" && (
          <div className="flex flex-col gap-2">
            <ProgressBar
              percent={
                (parseInt(cloudInfo.usage) / parseInt(cloudInfo.limit)) * 100
              }
            />
            <p className="text-zinc-600 text-sm">
              {convertSize(cloudInfo.usage)} of {convertSize(cloudInfo.limit)}{" "}
              used
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-5 p-8 flex-1 bg-white overflow-hidden">
        <BreadCrumb
          breadcrumbs={breadcrumbs}
          handleBackFolder={handleBackFolder}
        />
        <div className="flex flex-col h-full gap-5 overflow-auto">
          {filesStatus.loading ? (
            <Loading />
          ) : files.length ? (
            <>
              <Folders
                onClickFolder={handleFolderClick}
                folders={files.filter((file) => file.type === "GOOGLE_FOLDER")}
              />
              <Files
                files={files.filter((file) => file.type !== "GOOGLE_FOLDER")}
              />
            </>
          ) : (
            <FolderEmpty />
          )}
        </div>
      </div>
    </div>
  );
};

export default GoogleDriveManager;
