import { FC } from 'react';

interface Props {
  maxPrepTime: number;
  handleMaxPrepTimeChange: () => void;
}

const PreparationTimeRangeFilter: FC<Props> = ({
  maxPrepTime,
  handleMaxPrepTimeChange,
}) => {
  return (
    <div className="preparation-time-range-filter accent-slate-600 md:mx-8">
      <label htmlFor="prepTimeInput" className="form-label block">
        Maximální čas přípravy (min):
        <span className="inline-block ml-1 w-10"> {maxPrepTime}</span>
      </label>
      <input
        type="range"
        className="form-range"
        min="0"
        max="1000"
        step="5"
        id="prepTimeInput"
        value={maxPrepTime}
        onChange={handleMaxPrepTimeChange}
      ></input>
    </div>
  );
};
export default PreparationTimeRangeFilter;
