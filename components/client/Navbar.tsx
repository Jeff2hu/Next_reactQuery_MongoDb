'use client'

import Link from "next/link";
import { memo } from "react";

const Navbar = () => {

  return (
    <div className="flex justify-between items-center bg-slate-800 px-8 py-4 min-w-full ">
      <Link className="text-white font-bold" href={"/"}>Home</Link>
      <Link className="bg-white p-3 font-bold text-black" href={"/addTopic"}>Add Topic</Link>
    </div>
  );
};

export default memo(Navbar);
