import { Outlet } from "react-router-dom";
import Footer from "./common/Footer";

const Layout = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
