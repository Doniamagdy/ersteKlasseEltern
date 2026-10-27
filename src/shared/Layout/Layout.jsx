import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

import { Outlet } from "react-router";

function Layout() {
  return (
    <div>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
