import { File } from "@/app/interfaces/file.interface";
import React from "react";

type Props = {
  breadcrumbs: File[];
  handleBackFolder: Function;
};

const BreadCrumb = ({ breadcrumbs, handleBackFolder }: Props) => {
  return (
    <ol className="flex items-center whitespace-nowrap">
      {breadcrumbs.map((bread, index) => {
        const isLastElement = index === breadcrumbs.length - 1;
        return (
          <li
            key={bread.id}
            className="inline-flex items-center hover:cursor-pointer"
            onClick={() => handleBackFolder(index)}
          >
            <a
              className={`flex items-center text-xl select-none ${
                isLastElement ? "text-gray-800" : "text-gray-500"
              } hover:text-blue-600 focus:outline-none`}
            >
              {bread.name}
              {!isLastElement && (
                <svg
                  className="shrink-0 mx-2 size-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              )}
            </a>
          </li>
        );
      })}
    </ol>
  );
};

export default BreadCrumb;
