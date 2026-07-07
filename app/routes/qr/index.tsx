import QRCode from "react-qr-code";
import NotSelected from "~/components/NotSelected";
import { APP_NAME } from "~/routes/index";
import { compressProducts } from "~/utils/product/compress";
import { getCurrentCart } from "~/utils/storage/get";
import type { Route } from "./+types";

export function meta() {
    return [{ title: `${APP_NAME} | Ver QR` }];
}

export async function clientLoader() {
    const cart = getCurrentCart();
    if (!cart || cart.products.length === 0) return null;
    return compressProducts(cart.products);
}

export default function Holder({ loaderData }: Route.ComponentProps) {
    return loaderData ? (
        <ViewQR compressedCart={loaderData} />
    ) : (
        <NotSelected />
    );
}

const ViewQR = ({ compressedCart }: { compressedCart: string }) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <span className="text-2xl font-bold mb-4 text-center">
                USA ESTE QR PARA REALIZAR TU ORDEN
            </span>
            {compressedCart ? (
                <>
                    <div className="bg-white p-4 w-full md:w-1/2 lg:w-1/3">
                        <QRCode
                            value={compressedCart}
                            className="h-full w-full"
                        />
                    </div>
                    <span className="text-lg text-center mt-4">
                        (El QR es reutilizable y se actualiza conforme a tu
                        lista)
                    </span>
                </>
            ) : (
                <p className="text-red-500 text-lg text-center mt-4">
                    No se pudo generar el QR. Intenta nuevamente.
                </p>
            )}
        </div>
    );
};
