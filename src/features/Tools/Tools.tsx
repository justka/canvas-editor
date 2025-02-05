import { IMAGE_NAME } from "../../constants/image";
import { Tool } from "../Tool/Tool";

interface ToolsInterface {
  handleImageClick: (image: string) => void;
  handleTextClick: () => void;
}

export function Tools({ handleImageClick, handleTextClick }: ToolsInterface) {
  const tools = [
    {
      imageName: IMAGE_NAME.LETTER_T_IN_SQUARE,
      onClick: handleTextClick,
      text: "Text",
    },
    {
      imageName: IMAGE_NAME.TWO_IMAGES,
      onClick: () => handleImageClick("image"),
      text: "Image",
    },
    {
      imageName: IMAGE_NAME.NINE_LINES_IN_SQUARE,
      onClick: () => handleImageClick("background"),
      text: "Background",
    },
  ];

  return tools.map((tool) => (
    <Tool imageName={tool.imageName} onClick={tool.onClick} text={tool.text} />
  ));
}
