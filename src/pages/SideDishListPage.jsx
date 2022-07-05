import { ClipLoader } from 'react-spinners';
import Alert from '../components/Alert';
import SideDishList from '../components/SideDishList';
import useFetchSideDishList from '../hooks/useFetchSideDishList';

const SideDishListPage = () => {
  const { data: sideDishList, isLoading, error } = useFetchSideDishList();

  return (
    <div className="container mx-auto px-4 md:px-0 my-8">
      {isLoading && <ClipLoader />}
      {error && <Alert text={error.toString()} />}
      {sideDishList && <SideDishList sideDishList={sideDishList} />}
    </div>
  );
};
export default SideDishListPage;
