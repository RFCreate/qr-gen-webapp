import { useState } from "react";
import { useNavigate } from "react-router";
import NotSelected from "~/components/NotSelected";
import { APP_NAME } from "~/routes/index";
import type { Cart } from "~/types/cart";
import { getImagePath } from "~/utils/img/path";
import { getProductName } from "~/utils/product/name";
import { getCurrentCart } from "~/utils/storage/get";
import { setCurrentCart } from "~/utils/storage/set";
import type { Route } from "./+types";

export function meta() {
    return [{ title: `${APP_NAME} | Carrito` }];
}

export async function clientLoader() {
    return getCurrentCart();
}

export default function Holder({ loaderData }: Route.ComponentProps) {
    return loaderData ? <CartView currentCart={loaderData} /> : <NotSelected />;
}

const CartView = ({ currentCart }: { currentCart: Cart }) => {
    const [cart, setCart] = useState(currentCart);
    const navigate = useNavigate();

    const addQuantity = (index: number) => {
        const newCart = {
            ...cart,
            products: cart.products.map((product, idx) =>
                idx === index ? { ...product, q: product.q + 1 } : product,
            ),
        };
        setCurrentCart(newCart);
        setCart(newCart);
    };

    const removeQuantity = (index: number) => {
        const newCart = {
            ...cart,
            products: cart.products.map((product, idx) =>
                idx === index && product.q > 1
                    ? { ...product, q: product.q - 1 }
                    : product,
            ),
        };
        setCurrentCart(newCart);
        setCart(newCart);
    };

    const deleteProduct = (index: number) => {
        const newCart = {
            ...cart,
            products: cart.products.filter((_, idx) => idx !== index),
        };
        setCurrentCart(newCart);
        setCart(newCart);
    };

    const [editingTitle, setEditingTitle] = useState(false);
    const [titleInput, setTitleInput] = useState(cart.title);

    const handleTitleClick = () => setEditingTitle(true);
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setTitleInput(e.target.value);

    const handleTitleBlur = () => {
        setEditingTitle(false);
        if (titleInput.trim() && titleInput !== cart.title) {
            const newCart = { ...cart, title: titleInput };
            setCurrentCart(newCart);
            setCart(newCart);
        } else {
            setTitleInput(cart.title);
        }
    };
    const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            (e.target as HTMLInputElement).blur();
        } else if (e.key === "Escape") {
            setTitleInput(cart.title);
            setEditingTitle(false);
        }
    };

    return (
        <div className="flex flex-col w-full max-w-md mx-auto p-4">
            <div className="flex items-center justify-between mb-4">
                {editingTitle ? (
                    <input
                        className="w-full text-2xl font-bold bg-transparent border-b border-gray-400 focus:outline-none mr-4"
                        value={titleInput}
                        onChange={handleTitleChange}
                        onBlur={handleTitleBlur}
                        onKeyDown={handleTitleKeyDown}
                    />
                ) : (
                    <button
                        className="text-2xl font-bold cursor-pointer hover:underline"
                        type="button"
                        onClick={handleTitleClick}
                    >
                        {cart.title}
                    </button>
                )}
                <div className="flex gap-x-4">
                    {cart.products.length > 0 && (
                        <button
                            className="flex items-center justify-center cursor-pointer"
                            type="button"
                            onClick={() => navigate("/webapp/qr")}
                        >
                            <span className="iconify lucide--qr-code text-2xl"></span>
                        </button>
                    )}
                    <button
                        className="flex items-center justify-center cursor-pointer"
                        type="button"
                        onClick={() => navigate("/webapp/menu")}
                    >
                        <span className="iconify lucide--circle-plus text-2xl"></span>
                    </button>
                </div>
            </div>
            <hr className="mb-4 border-t-2" />
            {cart.products.map((product, idx) => (
                <div
                    key={product.n}
                    className="flex gap-x-2 mb-4 rounded-2xl border px-4 py-3 min-h-20 bg-gray-100 dark:bg-gray-900"
                >
                    <div className="gap-y-4 flex flex-col justify-center">
                        <button
                            type="button"
                            className="text-2xl cursor-pointer"
                            onClick={() => addQuantity(idx)}
                        >
                            <span className="iconify lucide--arrow-big-up"></span>
                        </button>
                        <button
                            type="button"
                            className="text-2xl cursor-pointer"
                            onClick={() => removeQuantity(idx)}
                        >
                            <span className="iconify lucide--arrow-big-down"></span>
                        </button>
                    </div>
                    <div className="gap-y-4 flex flex-col justify-center">
                        <img
                            src={getImagePath(product.c, product.n)}
                            alt={product.n}
                            className="size-20 object-contain"
                            onError={(e) =>
                                (e.currentTarget.style.display = "none")
                            }
                        />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                        <div className="font-bold text-lg">
                            {getProductName(product.n)}{" "}
                            <span className="font-normal">({product.q})</span>
                        </div>
                    </div>
                    <div className="gap-y-4 flex flex-col justify-center">
                        <button
                            type="button"
                            className="btn text-2xl h-full cursor-pointer"
                            onClick={() => deleteProduct(idx)}
                        >
                            <span className="iconify lucide--trash"></span>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};
