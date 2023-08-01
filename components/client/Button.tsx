import { memo } from 'react';

interface Props {
    onClick?: () => void;
    text: string;
}

const Button = ({ onClick, text }: Props) => {
  return (
    <button 
        className="self-end text-white border border-slate-600 bg-slate-500 p-2 rounded-xl shadow-lg transition hover:bg-slate-400"
        onClick={onClick}
    >
        {text}
    </button>
  )
}

export default memo(Button)