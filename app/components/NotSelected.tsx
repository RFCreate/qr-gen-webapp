import { useEffect, useState } from "react";
import { Navigate } from "react-router";

const NotSelected = () => {
    const [changePage, setChangePage] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setChangePage(true);
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);

    if (changePage) {
        return <Navigate to="/webapp" replace />;
    }

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="flex size-40 shrink-0 grow-0 items-center justify-center rounded-full border-3 bg-red-700 border-red-700">
                <span className="iconify lucide--x size-30 text-white"></span>
            </div>
            <span className="text-2xl font-bold mt-8 text-center">
                Lista esta vacia o no se ha seleccionado
            </span>
            <span className="text-xl font-bold mt-4 text-center italic">
                Regresando...
            </span>
        </div>
    );
};

export default NotSelected;
