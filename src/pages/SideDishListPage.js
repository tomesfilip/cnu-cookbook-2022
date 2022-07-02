import { Alert, Spinner } from 'reactstrap';
import SideDishList from '../components/SideDishList';
import useFetchSideDishList from '../hooks/useFetchSideDishList';

const SideDishListPage = () => {
  const { data: sideDishList, isLoading, error } = useFetchSideDishList();

  return (
    <>
      {isLoading && <Spinner />}
      {error && <Alert color="danger">{error.toString()}</Alert>}
      {sideDishList && <SideDishList sideDishList={sideDishList} />}
    </>
  );
};
export default SideDishListPage;
