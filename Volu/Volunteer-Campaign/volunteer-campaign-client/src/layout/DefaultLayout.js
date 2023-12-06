import { Outlet } from "react-router-dom";
import Topbar from "./components/Topbar";
import Header from "./components/Header";
import Footer from "./components/Footer";

function DefaultLayout() {
    return (
        <>
            <Topbar />
            <Header />
            <div className="main mt-[-76px]">
                <Outlet />
            </div>
            <Footer />
        </>
    );
}

export default DefaultLayout;