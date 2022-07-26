import { FC } from 'react';

import { getNormalizedPrepTime } from '../../utils/getNormalizedPrepTime';

interface Props {
  preparationTime: number;
  sideDish?: string;
}

const RecipeCardAdditionalInfo: FC<Props> = ({ preparationTime, sideDish }) => {
  return (
    <div className="text-sm flex flex-wrap">
      <h6 className="mr-4 truncate">
        {getNormalizedPrepTime(preparationTime)}
      </h6>
      <p className="truncate">{sideDish}</p>
    </div>
  );
};
export default RecipeCardAdditionalInfo;
