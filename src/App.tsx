import { Outlet } from "react-router-dom";
import Navigation from "@/components/portfolio/Navigation";
import Footer from "@/components/portfolio/Footer";
import AdminOverlay from "./components/admin/AdminOverlay";

const App = () => {
  return (
    <>
      <Navigation />
      <AdminOverlay />
      <Outlet />
      <Footer />
    </>
  );
};
export default App;
