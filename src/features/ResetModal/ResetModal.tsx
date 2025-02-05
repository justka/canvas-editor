import NiceModal, { useModal } from "@ebay/nice-modal-react";

import { Button } from "../../ui/Button/Button";

const ResetModal = NiceModal.create(({ onReset }: { onReset: () => void }) => {
  const currentModal = useModal();

  if (!currentModal.visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(203,203,203,0.5)] z-150">
      <div className="bg-white rounded-lg shadow-lg pt-12 pr-32 pb-12 pl-32 gap-12 relative">
        <img
          alt="x"
          className="top-5 right-5 w-auto h-[24px] absolute cursor-pointer"
          onClick={() => currentModal.hide()}
          src="src/assets/xIcon.svg"
        />

        <div className="flex items-center mb-4 flex-col">
          <img
            alt="Triangle With Exclamation Mark"
            src="src/assets/traingleWithExclamationMark.svg"
          />
          <h2 className="text-lg font-semibold">WARNING</h2>
        </div>

        <p className="mb-4 text-[rgba(103, 103, 103, 1)]">
          You’re about to reset the whole process. Are you sure you want to do
          it?
        </p>
        <div className="flex justify-center space-x-2">
          <Button
            onClick={() => currentModal.hide()}
            text="Cancel"
            variant="secondary"
          />
          <Button onClick={() => onReset()} text="Reset" variant="primary" />
        </div>
      </div>
    </div>
  );
});

export default ResetModal;
