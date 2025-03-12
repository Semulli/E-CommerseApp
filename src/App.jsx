import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import { ROUTER } from "./Constants/Router";
import ProductDetails from "./Components/ProductDetails";
function App() {
  return (
    <>
      <Routes>
        <Route path={ROUTER.Home} element={<Home />} />
        <Route path={ROUTER.Card + "/:id"} element={<ProductDetails />} />
      </Routes>
    </>
  );
}

export default App;
