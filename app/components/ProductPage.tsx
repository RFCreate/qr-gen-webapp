import Product from "~/components/Product";
import type { Category } from "~/types/category";
import { stringifyCategory } from "~/utils/category/stringify";

const ProductPage = ({
    products,
    category,
}: {
    products: string[];
    category: Category;
}) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <span className="text-2xl font-bold mb-8 text-center">
                {stringifyCategory(category).toUpperCase()}
            </span>
            <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-4 text-center">
                {products.map((product) => (
                    <Product key={product} category={category} name={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductPage;
