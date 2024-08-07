import { File } from "@/app/interfaces/file.interface";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import React from "react";

type Props = {
  breadcrumbs: File[];
  handleBackFolder: Function;
};

const BreadCrumb = ({ breadcrumbs, handleBackFolder }: Props) => {
  return (
    // <ol className="flex items-center whitespace-nowrap w-full overflow-hidden">
    //   {breadcrumbs.map((bread, index) => {
    //     const isLastElement = index === breadcrumbs.length - 1;
    //     return (
    //       <li
    //         key={bread.id}
    //         className="inline-flex items-center hover:cursor-pointer"
    //         onClick={() => handleBackFolder(index)}
    //       >
    //         <a
    //           className={`flex items-center font-medium max-w-[200px] truncate text-lg select-none ${
    //             isLastElement ? "text-gray-800" : "text-gray-500"
    //           } hover:text-blue-600 focus:outline-none`}
    //         >
    //           {bread.name}
    //         </a>
    //         {!isLastElement && (
    //           <svg
    //             className="shrink-0 mx-2 size-4 text-gray-400"
    //             xmlns="http://www.w3.org/2000/svg"
    //             width="24"
    //             height="24"
    //             viewBox="0 0 24 24"
    //             fill="none"
    //             stroke="currentColor"
    //             strokeWidth="2"
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //           >
    //             <path d="m9 18 6-6-6-6"></path>
    //           </svg>
    //         )}
    //       </li>
    //     );
    //   })}
    // </ol>
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1">
              <BreadcrumbEllipsis className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Documentation</DropdownMenuItem>
              <DropdownMenuItem>Themes</DropdownMenuItem>
              <DropdownMenuItem>GitHub</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumb;
