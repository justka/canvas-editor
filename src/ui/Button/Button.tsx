interface ButtonInterface {
  text: string;
}

export function Button({ text }: ButtonInterface) {
  return (
    <button className="bg-[#7209B7] text-white rounded-[5px] px-[32px] py-[8px] gap-[10px]">
      {text}
    </button>
  );
}
