import React, { memo } from 'react';

interface Props {
    onChange: (_value: string) => void;
    value: string;
    placeHolder: string;
}

function Input({onChange, value, placeHolder}: Props){
  return (
    <input 
    type="text" 
    placeholder={placeHolder}
    className="w-[100vw] max-w-xs bg-slate-700 text-white p-2" 
    value={value}
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
    />
  )
}

export default memo(Input)