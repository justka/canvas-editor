import { Image } from "../../ui/Image/Image";

interface ToolInterface {
  imageName: string;
  text: string;
}

export function Tool({ imageName, text }: ToolInterface) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 h-auto aspect-3/2 bg-[#F7F7F8]">
      <Image name={imageName} />
      <p>{text}</p>
    </div>
  );
}
