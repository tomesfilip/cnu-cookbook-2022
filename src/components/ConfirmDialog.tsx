import OutlineSmButton from './atoms/OutlineSmButton';
import '../assets/styles/ConfirmDialog.scss';
import { FC } from 'react';

interface Props {
  confirmAction: () => void;
  cancelAction: () => void;
  dialogText: string;
}

const ConfirmDialog: FC<Props> = ({
  confirmAction,
  cancelAction,
  dialogText,
}) => {
  return (
    <div className="confirm-dialog fixed top-0 right-0 left-0 z-50 md:inset-0 h-full">
      <div className="relative p-4 w-full max-w-md h-auto mx-auto top-1/3">
        <div className="relative p-4 h-48 flex flex-col justify-center border-2 rounded-lg border-slate-900">
          <h4 className="mb-4 text-center text-lg md:text-xl">{dialogText}</h4>
          <div className="flex w-3/5 mx-auto flex-col sm:flex-row justify-center sm:justify-evenly gap-y-4">
            <OutlineSmButton onClick={confirmAction}>Potvrdit</OutlineSmButton>
            <OutlineSmButton onClick={cancelAction}>Zrušit</OutlineSmButton>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConfirmDialog;
