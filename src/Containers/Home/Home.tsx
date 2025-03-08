
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      Home
      <NavLink to="/categories">categories</NavLink>
    </div>
  );
};

export default Home;