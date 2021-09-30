import { FC } from "react";

type Props = {
  isFirstStep: boolean;
  isLastStep: boolean;
  handleGoBack: () => void;
  handleNext: () => void;
  handleConfirmOrder: () => void;
};

export const ActionButtons: FC<Props> = ({
  isFirstStep,
  isLastStep,
  handleGoBack,
  handleNext,
  handleConfirmOrder,
}) => {
  return isFirstStep ? (
    <div className='w-full flex justify-end px-4'>
      <button
        onClick={handleNext}
        className='border-2 border-blue-900 bg-blue-900 rounded px-8 py-1 uppercase text-white text-sm font-semibold'
      >
        next
      </button>
    </div>
  ) : isLastStep ? (
    <div className='w-full flex justify-between px-4'>
      <button
        className='border-2 border-gray-700 text-gray-700 rounded px-8 py-1 uppercase text-sm font-semibold'
        onClick={handleGoBack}
      >
        back
      </button>
      <button
        className='border-2 border-blue-900 bg-blue-900 rounded px-8 py-1 uppercase text-white text-sm font-semibold'
        onClick={handleConfirmOrder}
      >
        Confirm order
      </button>
    </div>
  ) : (
    <div className='w-full flex justify-between px-4'>
      <button
        className='border-2 border-gray-700 text-gray-700 rounded px-8 py-1 uppercase text-sm font-semibold'
        onClick={handleGoBack}
      >
        back
      </button>
      <button
        className='border-2 border-blue-900 bg-blue-900 rounded px-8 py-1 uppercase text-white text-sm font-semibold'
        onClick={handleNext}
      >
        next
      </button>
    </div>
  );
};
