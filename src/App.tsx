import { Outlet } from "react-router-dom";
import Navigation from "@/components/portfolio/Navigation";
import Footer from "@/components/portfolio/Footer";

const App = () => {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
};
export default App;
