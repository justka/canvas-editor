import { useCallback } from "react";

import { IMAGE_NAME } from "../../constants/image";

interface ImageInterface {
  name: string;
}

export function Image({ name }: ImageInterface) {
  const prepareImage = useCallback(
    (name: string) => {
      switch (name) {
        case IMAGE_NAME.CIRCLE_ARROW:
          return { alt: "circle arrow", src: "src/assets/circleArrow.svg" };
        case IMAGE_NAME.LETTER_T_IN_SQUARE:
          return {
            alt: "letter t in square",
            src: "src/assets/letterTInSquare.svg",
          };
        case IMAGE_NAME.LOGO:
          return { alt: "logo", src: "src/assets/logo.svg" };
        case IMAGE_NAME.NINE_LINES_IN_SQUARE:
          return {
            alt: "nine lines in square",
            src: "src/assets/nineLinesInSquare.svg",
          };
        case IMAGE_NAME.START:
          return { alt: "startImage", src: "src/assets/startImage.png" };
        case IMAGE_NAME.TWO_IMAGES:
          return { alt: "two images", src: "src/assets/twoImages.svg" };
        default:
          return { alt: "placeholder", src: "https://picsum.photos/20" };
      }
    },
    [name],
  );

  const prepareImageProps = prepareImage(name);
  return <img {...prepareImageProps} />;
}
