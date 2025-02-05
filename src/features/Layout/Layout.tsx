import { useModal } from "@ebay/nice-modal-react";
import { useRef, useState } from "react";

import { IMAGE_NAME } from "../../constants/image";
import { Button } from "../../ui/Button/Button";
import { Image } from "../../ui/Image/Image";
import { Canva } from "../Canva/Canva";
import ResetModal from "../ResetModal/ResetModal";
import { Tools } from "../Tools/Tools";

export function Layout() {
  const [images, setImages] = useState<
    { id: number; src: string; x: number; y: number }[]
  >([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedType, setSelectedType] = useState<string>("");

  const handleImageClick = (type: string) => {
    setSelectedType(type);
    inputRef.current?.click();
  };
  const [texts, setTexts] = useState([{}]);

  const stageRef = useRef<any>(null);

  const resetCanvas = () => {
    setTexts([]); // Usuwamy wszystkie teksty
    setImages([]); // Usuwamy wszystkie obrazy
    resetModal.hide(); // Ukrywamy modal
  };

  const handleTextClick = () => {
    const newText = {
      color: "black",
      id: texts.length + 1,
      text: `Type your text here`,
      x: 150,
      y: 150,
    };
    setTexts([...texts, newText]);
  };

  const handleExport = () => {
    if (!stageRef.current) return;

    const uri = stageRef.current.toDataURL({ pixelRatio: 2 }); // Wyższa jakość (2x)

    // Tworzenie linku do pobrania
    const link = document.createElement("a");
    link.href = uri;
    link.download = "canvas-export.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetModal = useModal(ResetModal);

  return (
    <div className="h-screen p-8 gap-4">
      <div className="content-center grid grid-cols-2 grid-rows-1 gap-4 h-full">
        <div className="bg-[#e4baff] flex justify-center relative">
          <Image name={IMAGE_NAME.START} />
          <Canva
            images={images}
            inputRef={inputRef}
            selectedType={selectedType}
            setImages={setImages}
            setTexts={setTexts}
            stageRef={stageRef}
            texts={texts}
          />
        </div>
        <div className="flex flex-col gap-[32px]">
          <div className="flex justify-between flex-row">
            <div className="flex flex-row items-start gap-[12px]">
              <Image name={IMAGE_NAME.LOGO} />
              <p className="text-[#676767] font-poppins font-bold text-3xl leading-[48px]">
                Canvas Editor
              </p>
            </div>
            <div
              className="flex flex-row items-center border-b border-b-[#CB0000] border-solid gap-2 cursor-pointer"
              onClick={() => resetModal.show({ onReset: resetCanvas })}
            >
              <p className="text-[#CB0000]">Reset</p>
              <Image name={IMAGE_NAME.CIRCLE_ARROW} />
            </div>
          </div>
          <div className="border-[#FAFAFA] border-2 border-solid"></div>
          <div className="bg-[#F7F7F8] rounded-[10px] p-[24px] pr-[16px] pb-[24px] pl-[16px] gap-[10px] flex">
            <p className="font-poppins font-bold text-[18px] leading-[27px]">
              Add content
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Tools
              handleImageClick={handleImageClick}
              handleTextClick={handleTextClick}
            />
          </div>
          <div className="flex justify-end">
            <Button
              onClick={handleExport}
              text="Export to PNG"
              variant="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
