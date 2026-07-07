import { useEffect, useState } from "react";
import type { Category } from "~/types/category";
import { getImagePath } from "~/utils/img/path";
import { getProductName } from "~/utils/product/name";
import { insertProduct } from "~/utils/storage/insert";

const Product = ({ category, name }: { category: Category; name: string }) => {
    const [productSelected, setProductSelected] = useState(false);

    useEffect(() => {
        if (productSelected) {
            const timeout = setTimeout(() => {
                setProductSelected(false);
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, [productSelected]);

    return (
        <button
            type="button"
            className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-200 dark:bg-gray-800 cursor-pointer"
            onClick={() => {
                if (productSelected) return; // prevent multiple clicks while animation is active
                insertProduct({ n: name, c: category, q: 1 });
                setProductSelected(true);
            }}
        >
            {productSelected && (
                <div className="absolute size-20 flex items-center justify-center aspect-square rounded-full bg-green-700 animate-ping">
                    <span className="iconify lucide--check size-full text-white"></span>
                </div>
            )}
            <img
                src={getImagePath(category, name)}
                alt={name}
                className="size-20 hover:scale-105 transition-transform duration-200"
            />
            <span className="font-bold mt-2">{getProductName(name)}</span>
        </button>
    );
};

export default Product;
