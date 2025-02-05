import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Image, Layer, Stage, Text } from "react-konva";

import {
  changeTextColor,
  handleDragMove,
  handleImageUpload,
  handleInputBlur,
  handleInputChange,
  handleTextClick,
} from "./Canva.utils";

interface CanvaInterface {
  images: ImagesInterface[];
  inputRef: React.RefObject<HTMLInputElement | null>;
  selectedType: string;
  setImages: any;
  setTexts: Dispatch<
    SetStateAction<
      { color: string; id: number; text: string; x: number; y: number }[]
    >
  >;
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

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return (
    <div
      className="flex flex-col items-center absolute w-full h-full"
      style={{ zIndex: "9" }}
    >
      <div className="mb-4 flex gap-4 flex-wrap">
        {colors.map((color) => {
          return (
            <span
              className={`px-4 py-2 bg-${color.value} text-white rounded-md cursor-pointer`}
              onClick={() =>
                changeTextColor({
                  colorValue: color.value,
                  selectedId,
                  setTexts,
                  texts,
                })
              }
            >
              {color.name}
            </span>
          );
        })}
      </div>
      <input
        accept="image/*"
        className="hidden"
        onChange={(e) =>
          handleImageUpload({ e, inputRef, selectedType, setImages })
        }
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
                  onDragMove={(e) =>
                    handleDragMove(e, "image", setTexts, setImages)
                  }
                  width={width}
                  x={x}
                  y={y}
                />
              );
            })}
            {texts.map(({ color, id, text, x, y }: TextsInterface) => {
              return (
                <Text
                  draggable
                  fill={(color || "").split("-")[0]}
                  fontSize={24}
                  fontStyle={selectedId === id ? "bold" : ""}
                  id={`text-${id}`}
                  key={id}
                  onClick={() => setSelectedId(id)}
                  onDblClick={() =>
                    handleTextClick({
                      id,
                      inputRef,
                      setIsEditing,
                      setSelectedId,
                      stageRef,
                    })
                  }
                  onDragMove={(e) =>
                    handleDragMove(e, "text", setTexts, setImages)
                  }
                  text={text}
                  x={x}
                  y={y}
                />
              );
            })}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};
