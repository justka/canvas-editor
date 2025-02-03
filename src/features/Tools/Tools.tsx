import { IMAGE_NAME } from "../../constants/image";
import { Tool } from "../Tool/Tool";

export function Tools() {
  const tools = [
    {
      imageName: IMAGE_NAME.LETTER_T_IN_SQUARE,
      text: "Text",
    },
    {
      imageName: IMAGE_NAME.TWO_IMAGES,
      text: "Image",
    },
    {
      imageName: IMAGE_NAME.NINE_LINES_IN_SQUARE,
      text: "Background",
    },
  ];

  return tools.map((tool) => (
    <Tool imageName={tool.imageName} text={tool.text} />
  ));
}
