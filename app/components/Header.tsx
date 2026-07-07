import { useLocation, useNavigate } from "react-router";

const backwardRoutes = {
    "/webapp": "/webapp",
    "/webapp/cart": "/webapp",
    "/webapp/menu": "/webapp/cart",
    "/webapp/qr": "/webapp",
    "/webapp/import": "/webapp",

    "/webapp/menu/starters": "/webapp/menu",
    "/webapp/menu/salads": "/webapp/menu",
    "/webapp/menu/soups": "/webapp/menu",
    "/webapp/menu/entrees": "/webapp/menu",
    "/webapp/menu/sides": "/webapp/menu",
    "/webapp/menu/desserts": "/webapp/menu",
    "/webapp/menu/beverages": "/webapp/menu",
};

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Check if the current path is "/", "/webapp" or "/webapp/"
    const isInRoot = /^\/(webapp)?(\/)?$/.test(location.pathname);

    // Check if the current path is "/webapp/cart" or in root
    const isInRootOrCart = isInRoot || location.pathname === "/webapp/cart";

    const goBack = () => {
        const pathname = location.pathname.replace(/\/$/, ""); // Remove trailing slash if exists
        const path = backwardRoutes[pathname as keyof typeof backwardRoutes];
        if (!path) {
            // If there's no defined backward route, check if the referrer is internal
            const isInternal = document.referrer.includes(window.location.host);
            if (isInternal) {
                // Go back in history
                navigate(-1);
            } else {
                // Navigate to the root
                navigate("/webapp");
            }
            return;
        }
        navigate(path);
    };

    return (
        <nav className="w-full max-h-18 min-h-18 bg-yellow-50 text-black grid grid-cols-3 items-center px-4 sticky top-0 z-100">
            {/* Back arrow */}
            <div className="justify-self-start">
                {!isInRoot && (
                    <button
                        type="button"
                        className="cursor-pointer"
                        onClick={goBack}
                    >
                        <span className="iconify lucide--undo-2 size-10"></span>
                    </button>
                )}
            </div>
            {/* Logo */}
            <img
                src="/images/logo.png"
                alt="Logo"
                className="size-10 justify-self-center"
            />
            {/* Cart */}
            <div className="justify-self-end">
                {!isInRootOrCart && (
                    <button
                        type="button"
                        className="cursor-pointer"
                        onClick={() => {
                            navigate("/webapp/cart");
                        }}
                    >
                        <span className="iconify lucide--shopping-cart size-10"></span>
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Header;
