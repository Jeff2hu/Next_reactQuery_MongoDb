'use client';

import Link from 'next/link';
import { memo } from 'react';

const Navbar = () => {
  return (
    <div className="flex justify-between items-center bg-slate-800 px-8 py-4 min-w-full ">
      <Link className="text-white font-bold" href={'/'}>
        Home
      </Link>
      <Link
        className="bg-gradient-to-r from-emerald-300 to-cyan-500 p-3 font-bold text-stone-700 rounded-lg
        hover:saturate-150 hover:scale-105 hover:bg-gradient-to-l hover:from-cyan-800 hover:to-emerald-600 hover:text-white "
        href={'/addTopic'}
      >
        Add Topic
      </Link>
      <Link className="bg-white p-3 font-bold text-black" href={'/difference'}>
        Difference
      </Link>
    </div>
  );
};

export default memo(Navbar);
