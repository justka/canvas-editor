interface ButtonInterface {
  onClick: () => void;
  text: string;
  variant: string;
}

export function Button({ onClick, text, variant }: ButtonInterface) {
  return (
    <button
      className={`${variant == "primary" ? "bg-[#7209B7] text-white" : "bg-white  text-[#353535]"} rounded-[5px] px-[32px] py-[8px] gap-[10px] cursor-pointer`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
