import timer from '../images/timer.svg';
import { getNormalizedPrepTime } from '../utils/getNormalizedPrepTime';

const Timebox = ({ preparationTime }) => {
  return (
    <div className="time-box flex gap-x-2 items-center my-4">
      <img src={timer} alt="kitchen timer" className="w-8 h-8" />
      <h5>{getNormalizedPrepTime(preparationTime)}</h5>
    </div>
  );
};
export default Timebox;
