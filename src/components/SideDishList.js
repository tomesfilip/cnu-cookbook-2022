import { Container, List, Row } from 'reactstrap';

const SideDishList = ({ sideDishList }) => {
  return (
    <Container>
      <List className="bg-light p-4 rounded-3" type="unstyled">
        {sideDishList.map((sideDish) => (
          <li key={sideDish}>{sideDish}</li>
        ))}
      </List>
    </Container>
  );
};
export default SideDishList;
