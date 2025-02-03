import { IMAGE_NAME } from "../../constants/image";
import { Button } from "../../ui/Button/Button";
import { Image } from "../../ui/Image/Image";
import { Tools } from "../Tools/Tools";

export function Layout() {
  return (
    <div className="h-screen p-8 gap-4">
      <div className="content-center grid grid-cols-2 grid-rows-1 gap-4 h-full">
        <div className="bg-[#e4baff] flex justify-center">
          <Image name={IMAGE_NAME.START} />
        </div>
        <div className="flex flex-col gap-[32px]">
          <div className="flex justify-between flex-row">
            <div className="flex flex-row items-start gap-[12px]">
              <Image name={IMAGE_NAME.LOGO} />
              <p className="text-[#676767] font-poppins font-bold text-3xl leading-[48px]">
                Canvas Editor
              </p>
            </div>
            <div className="flex flex-row items-center border-b border-b-[#CB0000] border-solid gap-2">
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
            <Tools />
          </div>
          <div className="flex justify-end">
            <Button text="Export to PNG" />
          </div>
        </div>
      </div>
    </div>
  );
}
