import Konva from "konva";
import React, { useEffect, useRef, useState } from "react";
import { Image, Layer, Stage, Text } from "react-konva";

interface CanvaInterface {
  images: ImagesInterface[];
  inputRef: React.RefObject<HTMLInputElement | null>;
  selectedType: string;
  setImages: any;
  setTexts: React.Dispatch<React.SetStateAction<{}[]>>;
  stageRef: React.RefObject<any>;
  texts: any;
}

interface TextsInterface {
  color: string;
  id: number;
  text: string;
  x: number;
  y: number;
}

interface ImagesInterface {
  height?: number;
  id: number;
  src: string;
  width?: number;
  x: number;
  y: number;
}

export const Canva = ({
  images,
  inputRef,
  selectedType,
  setImages,
  setTexts,
  stageRef,
  texts,
}: CanvaInterface) => {
  const [selectedId, setSelectedId] = useState<number>(0);
  const [isEditing, setIsEditing] = useState(false);
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  const colors = [
    { name: "Czerwony", value: "red\-500" },
    { name: "Zielony", value: "green\-500" },
    { name: "Niebieski", value: "blue\-500" },
  ];

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          height: containerRef.current.clientHeight,
          width: containerRef.current.clientWidth,
        });
      }
    };

    updateSize(); // Pierwsze ustawienie
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleTextClick = (id: number) => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTexts(
      texts.map((text: TextsInterface) =>
        +text.id === +selectedId ? { ...text, text: e.target.value } : text,
      ),
    );
  };

  const handleInputBlur = () => {
    setIsEditing(false);
  };

  const handleDragMove = (
    e: Konva.KonvaEventObject<DragEvent>,
    type: "image" | "text",
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

  const changeTextColor = (color: string) => {
    setTexts(
      texts.map((text: TextsInterface) =>
        text.id === selectedId ? { ...text, color } : text,
      ),
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <div
      className="flex flex-col items-center absolute w-full h-full"
      style={{ zIndex: "9" }}
    >
      <div className="mb-4 flex gap-4 flex-wrap">
        {colors.map((color) => {
          console.log(color);
          return (
            <span
              className={`px-4 py-2 bg-${color.value} text-white rounded-md cursor-pointer`}
              onClick={() => changeTextColor(color.value)}
            >
              {color.name}
            </span>
          );
        })}
      </div>
      <input
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
        ref={inputRef}
        type="file"
      />
      <div className="relative h-full w-full" ref={containerRef}>
        {isEditing && selectedId !== 0 && (
          <input
            onBlur={handleInputBlur}
            onChange={handleInputChange}
            ref={inputRef}
            style={{
              background: "transparent",
              fontFamily: "Arial, sans-serif",
              fontSize: "24px",
              outline: "none",
              padding: "0",
              position: "absolute",
              zIndex: "9",
            }}
            value={
              texts.find((t: TextsInterface) => t.id === selectedId)?.text || ""
            }
          />
        )}

        <Stage
          height={dimensions.height}
          ref={stageRef}
          width={dimensions.width}
        >
          <Layer>
            {images.map(({ height, id, src, width, x, y }) => {
              const img = new window.Image();
              img.src = src;
              return (
                <Image
                  draggable
                  height={height}
                  image={img}
                  key={id}
                  onDragMove={(e) => handleDragMove(e, "image")}
                  width={width}
                  x={x}
                  y={y}
                />
              );
            })}
            {texts.map(({ color, id, text, x, y }: TextsInterface) => (
              <Text
                draggable
                fill={color}
                fontSize={24}
                fontStyle={selectedId === id ? "bold" : ""}
                id={`text-${id}`}
                key={id}
                onClick={() => setSelectedId(id)}
                onDblClick={() => handleTextClick(id)}
                onDragMove={(e) => handleDragMove(e, "text")}
                text={text}
                x={x}
                y={y}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};
