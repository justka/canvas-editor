import Konva from "konva";

interface TextsInterface {
  color: string;
  id: number;
  text: string;
  x: number;
  y: number;
}

export const handleTextClick = ({
  id,
  setSelectedId,
  setIsEditing,
  inputRef,
  stageRef,
}: any) => {
  setSelectedId(id);
  setIsEditing(true);

  setTimeout(() => {
    if (inputRef.current) {
      const textNode = stageRef.current.findOne(`#text-${id}`);
      const textPosition = textNode.getAbsolutePosition();
      const stageBox = stageRef.current.container().getBoundingClientRect();

      inputRef.current.style.position = "absolute";
      inputRef.current.style.top = `${stageBox.top + textPosition.y}px`;
      inputRef.current.style.left = `${stageBox.left + textPosition.x}px`;
      inputRef.current.style.width = `${textNode.width()}px`;
      inputRef.current.style.fontSize = `${textNode.fontSize()}px`;
      inputRef.current.style.color = textNode.fill();
      inputRef.current.style.border = "1px solid gray";
      inputRef.current.style.background = "transparent";
      inputRef.current.style.outline = "none";
      inputRef.current.focus();
    }
  }, 0);
};

export const handleInputChange = ({ e, setTexts, texts, selectedId }: any) => {
  setTexts(
    texts.map((text: TextsInterface) =>
      +text.id === +selectedId ? { ...text, text: e.target.value } : text,
    ),
  );
};

export const handleInputBlur = ({ setIsEditing }: any) => {
  setIsEditing(false);
};

export const handleDragMove = (
  e: Konva.KonvaEventObject<DragEvent>,
  type: "image" | "text",
  setTexts: any,
  setImages: any,
) => {
  const id = Number(e.target.id());

  if (type === "text") {
    setTexts((prevTexts: any) =>
      prevTexts.map((t: any) =>
        t.id === id ? { ...t, x: e.target.x(), y: e.target.y() } : t,
      ),
    );
  } else {
    setImages((prevImages: any) =>
      prevImages.map((img: any) =>
        img.id === id ? { ...img, x: e.target.x(), y: e.target.y() } : img,
      ),
    );
  }
};

export const changeTextColor = ({
  colorValue,
  setTexts,
  selectedId,
  texts,
}: any) => {
  setTexts(
    texts.map((text: TextsInterface) =>
      text.id === selectedId ? { ...text, color: colorValue } : text,
    ),
  );
};

export const handleImageUpload = ({ e, selectedType, setImages }: any) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const img = new window.Image();
    img.src = reader.result as string;

    img.onload = () => {
      let width = window.innerWidth * 0.5;
      let height = window.innerHeight * 0.8;

      if (selectedType === "image") {
        width = 100;
        height = 200;
      }

      setImages((prevImages: any) => [
        ...prevImages,
        {
          height,
          id: prevImages.length + 1,
          src: img.src,
          width,
          x: 0,
          y: 0,
        },
      ]);
    };
  };
  reader.readAsDataURL(file);
};
