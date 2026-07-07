import { useLocation, useNavigate } from "react-router";

const Footer = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <nav className="w-full max-h-18 min-h-18 bg-red-500 text-white items-center grid px-4 sticky bottom-0 z-100">
            {/* QR code */}
            <button
                type="button"
                className="justify-self-center cursor-pointer"
                onClick={() => {
                    if (location.pathname !== "/webapp/qr")
                        navigate("/webapp/qr");
                }}
                aria-disabled={location.pathname === "/webapp/qr"}
            >
                <div className="flex size-14 shrink-0 grow-0 items-center justify-center rounded-full border-3 border-white">
                    <span className="iconify lucide--qr-code size-10"></span>
                </div>
            </button>
        </nav>
    );
};

export default Footer;
