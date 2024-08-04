import { use } from "passport";
import React from "react";

type Props = {
  percent: number;
};

const ProgressBar = ({ percent }: Props) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-[6px] dark:bg-gray-300">
      <div
        className="bg-blue-600 h-[6px] rounded-full"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
