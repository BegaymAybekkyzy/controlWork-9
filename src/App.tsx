import Layout from './components/Layout/Layout.tsx';
import { Route, Routes } from 'react-router-dom';
import Categories from './Containers/Categories/Categories.tsx';
import Home from './Containers/Home/Home.tsx';


const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/categories" element={<Categories/>}/>
        </Routes>
      </Layout>
    </>
  );
};

export default App;
