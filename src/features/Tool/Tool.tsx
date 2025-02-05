import { Image } from "../../ui/Image/Image";

interface ToolInterface {
  imageName: string;
  onClick?: () => void;
  text: string;
}

export function Tool({ imageName, onClick, text }: ToolInterface) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-2 h-auto aspect-3/2 bg-[#F7F7F8] cursor-pointer"
      onClick={onClick}
    >
      <Image name={imageName} />
      <p>{text}</p>
    </div>
  );
}
