import { Outlet, useLocation } from "react-router";
import Footer from "~/components/Footer";
import Header from "~/components/Header";

const Layout = () => {
    const location = useLocation();
    const isInMenu = location.pathname.startsWith("/webapp/menu");

    return (
        <div className="flex h-dvh min-w-0 grow flex-col overflow-auto">
            <Header />
            <div className="grow p-6">
                <Outlet />
            </div>
            {isInMenu && <Footer />}
        </div>
    );
};

export default Layout;
