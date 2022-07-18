import { FC } from 'react';

interface Props {
  sideDishList: string[];
}

const SideDishList: FC<Props> = ({ sideDishList }) => {
  return (
    <div className="container mx-auto px-4 md:px-0">
      <ul className="bg-slate-100 p-4 rounded-lg">
        {sideDishList.map((sideDish) => (
          <li key={sideDish}>{sideDish}</li>
        ))}
      </ul>
    </div>
  );
};
export default SideDishList;
