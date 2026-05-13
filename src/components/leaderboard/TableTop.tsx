import React from "react";
import { ReloadIcon } from "../svgIcons/ReloadIcon";

export default function TableTop() {
  return (
    <div className="flex items-center justify-between mt-8">
      <div className=""></div>
      <div className="">
        <button className="bg-gray-800 hover:bg-gray-700 capitalize border border-gray-700 text-gray-400 flex items-center gap-2 rounded-lg py-1 px-2">
          <ReloadIcon className="w-4 h-4 opacity-60" fill="#fff"/>
          reload
        </button>
      </div>
    </div>
  );
}
