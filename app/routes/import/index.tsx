import { Scanner } from "@yudiel/react-qr-scanner";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import Spinner from "~/components/Spinner";
import { APP_NAME } from "~/routes/index";
import { decompressProducts } from "~/utils/product/decompress";
import { createCartKey } from "~/utils/storage/create";
import { setCart, setCurrentCartKey } from "~/utils/storage/set";

export function meta() {
    return [{ title: `${APP_NAME} | Leer QR` }];
}

export default function ImportList() {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [scanning, setScanning] = useState(true);
    const hasImportedRef = useRef(false);

    return (
        <div className="flex flex-col items-center justify-center">
            <span className="text-2xl font-bold mb-4 text-center">
                ESCANEA EL QR DE TU LISTA PARA IMPORTARLA
            </span>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {scanning ? (
                <div className="bg-white p-4 w-full md:w-1/2 lg:w-1/3">
                    <Scanner
                        onScan={(result) => {
                            if (hasImportedRef.current || !scanning) return;

                            const text =
                                result && result.length > 0
                                    ? (result[0].rawValue ?? null)
                                    : null;

                            if (!text) return;

                            setError(null);
                            setScanning(false);

                            const products = decompressProducts(text);
                            if (!products) {
                                setError(
                                    "No se pudieron importar los productos.",
                                );
                                setScanning(true);
                                return;
                            }

                            hasImportedRef.current = true;
                            const newKey = createCartKey();
                            setCurrentCartKey(newKey);
                            setCart(newKey, {
                                title: "Lista importada",
                                products: products,
                            });
                            navigate("/webapp/cart");
                        }}
                        onError={() => {
                            setError(
                                "No se pudo acceder a la camara. Revisa los permisos.",
                            );
                        }}
                        sound={false}
                    />
                </div>
            ) : (
                <div className="flex min-h-72 flex-col items-center justify-center gap-4">
                    <Spinner />
                    <span className="text-center font-semibold">
                        Importando lista...
                    </span>
                </div>
            )}
        </div>
    );
}
