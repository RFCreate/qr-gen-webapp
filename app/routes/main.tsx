import { useState } from "react";
import { type NavigateFunction, useNavigate } from "react-router";
import { APP_NAME } from "~/routes/index";
import type { Cart } from "~/types/cart";
import { getImagePath } from "~/utils/img/path";
import { createCartKey } from "~/utils/storage/create";
import { deleteCart } from "~/utils/storage/delete";
import { duplicateCart } from "~/utils/storage/duplicate";
import { getAllCartKeys, getCart } from "~/utils/storage/get";
import { setCart, setCurrentCartKey } from "~/utils/storage/set";
import type { Route } from "./main/+types";

type CartExtended = Cart & { key: string; isOpen: boolean };

export function meta() {
    return [{ title: `${APP_NAME} | Mi Lista` }];
}

export async function clientLoader() {
    const keys = getAllCartKeys();
    if (keys.length === 0) return null;

    const carts: CartExtended[] = keys
        .map((key) => {
            // Get cart
            const cart = getCart(key);
            if (!cart) return null;
            // If cart is empty, delete it and skip
            if (cart.products.length === 0) {
                deleteCart(key);
                return null;
            }
            // Return cart with key
            return {
                key,
                title: cart.title,
                products: cart.products,
                isOpen: false,
            } as CartExtended;
        })
        .filter((cart) => cart !== null);

    if (carts.length === 0) return null;
    return carts;
}

export default function List({ loaderData }: Route.ComponentProps) {
    return loaderData ? (
        <FilledList currentCarts={loaderData} />
    ) : (
        <EmptyList />
    );
}

const EmptyList = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <button
                type="button"
                className="flex size-40 shrink-0 grow-0 items-center justify-center rounded-full border-3 bg-green-700 border-green-700 cursor-pointer hover:bg-green-800 transition-colors duration-200"
                onClick={() => goToNewCartMenu(navigate)}
            >
                <span className="iconify lucide--plus size-30 text-white"></span>
            </button>
            <span className="text-2xl font-bold mt-8 text-center">
                Tu lista está vacía
            </span>
            <span className="text-xl font-bold mt-4 text-center">
                Agrega tu primer pedido
            </span>
            <button
                type="button"
                className="mt-8 px-6 py-3 bg-green-700 text-white rounded-lg shadow-md hover:bg-green-800 transition-colors duration-200 text-2xl font-semibold cursor-pointer"
                onClick={() => goToNewCartMenu(navigate)}
            >
                <span className="iconify lucide--circle-plus mr-2"></span>
                Agregar
            </button>
            <button
                type="button"
                className="mt-8 px-6 py-3 bg-gray-400 text-black rounded-lg shadow-md hover:bg-gray-500 transition-colors duration-200 text-2xl font-semibold cursor-pointer"
                onClick={() => navigate("/webapp/import")}
            >
                <span className="iconify lucide--import mr-2"></span>
                Importar
            </button>
        </div>
    );
};

const FilledList = ({ currentCarts }: { currentCarts: CartExtended[] }) => {
    const [carts, setCarts] = useState(currentCarts);
    const navigate = useNavigate();

    return (
        <div className="flex flex-col w-full max-w-md mx-auto p-4">
            <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold">Mis listas:</span>
                <div className="flex items-center gap-x-6">
                    <button
                        className="flex items-center justify-center cursor-pointer"
                        type="button"
                        onClick={() => navigate("/webapp/import")}
                    >
                        <span className="iconify lucide--import text-2xl"></span>
                    </button>
                    <button
                        className="flex items-center justify-center cursor-pointer"
                        type="button"
                        onClick={() => goToNewCartMenu(navigate)}
                    >
                        <span className="iconify lucide--circle-plus text-2xl"></span>
                    </button>
                </div>
            </div>
            <hr className="mb-4 border-t-2" />
            {carts.map((cart, idx) => (
                <div
                    key={cart.key}
                    className="flex flex-col mb-4 rounded-2xl border px-4 py-3 bg-gray-100 dark:bg-gray-900"
                >
                    <div className="flex items-center justify-between w-full bg-transparent border-0 p-0">
                        <button
                            type="button"
                            className="cursor-pointer"
                            onClick={() => {
                                const newCarts = [...carts];
                                newCarts[idx].isOpen = !newCarts[idx].isOpen;
                                setCarts(newCarts);
                            }}
                        >
                            <span
                                className={`iconify ${cart.isOpen ? "lucide--chevron-up" : "lucide--chevron-down"} text-xl`}
                            />
                        </button>
                        <button
                            type="button"
                            className="cursor-pointer w-full mx-2 text-left"
                            onClick={() => goToCart(navigate, cart.key)}
                        >
                            <span className="font-bold text-lg">
                                {cart.title}
                            </span>
                        </button>
                        <div className="flex items-center gap-4">
                            <button
                                className="flex items-center justify-center cursor-pointer"
                                type="button"
                                onClick={() => {
                                    const newKey = duplicateCart(cart.key);
                                    if (!newKey) return;
                                    const newCart = getCart(newKey);
                                    if (!newCart) return;
                                    setCarts([
                                        ...carts,
                                        {
                                            key: newKey,
                                            title: newCart.title,
                                            products: newCart.products,
                                            isOpen: false,
                                        },
                                    ]);
                                }}
                            >
                                <span className="iconify lucide--copy text-2xl" />
                            </button>
                            <button
                                className="flex items-center justify-center cursor-pointer"
                                type="button"
                                onClick={() => {
                                    setCurrentCartKey(cart.key);
                                    navigate("/webapp/qr");
                                }}
                            >
                                <span className="iconify lucide--qr-code text-2xl" />
                            </button>
                            <button
                                className="flex items-center justify-center cursor-pointer"
                                type="button"
                                onClick={() => {
                                    deleteCart(cart.key);
                                    const newCarts = carts.filter(
                                        (newCart) => newCart.key !== cart.key,
                                    );
                                    // If list is empty, reload page to show empty state
                                    if (newCarts.length === 0) {
                                        navigate(0);
                                        return;
                                    }
                                    setCarts(newCarts);
                                }}
                            >
                                <span className="iconify lucide--trash-2 text-2xl" />
                            </button>
                        </div>
                    </div>
                    {cart.isOpen && (
                        <button
                            type="button"
                            className="flex flex-wrap gap-2 mt-4 cursor-pointer"
                            onClick={() => goToCart(navigate, cart.key)}
                        >
                            {cart.products.map((product) => (
                                <img
                                    key={product.n}
                                    src={getImagePath(product.c, product.n)}
                                    alt={product.n}
                                    className="w-12 h-12 object-contain rounded"
                                />
                            ))}
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

const goToNewCartMenu = (navigate: NavigateFunction) => {
    const newKey = createCartKey();
    setCurrentCartKey(newKey);
    setCart(newKey, {
        title: "Nueva lista",
        products: [],
    });
    navigate("/webapp/menu");
};

const goToCart = (navigate: NavigateFunction, key: string) => {
    setCurrentCartKey(key);
    navigate("/webapp/cart");
};
