import NotSelected from "~/components/NotSelected";
import ProductPage from "~/components/ProductPage";
import { APP_NAME } from "~/routes/index";
import { Category } from "~/types/category";
import { stringifyCategory } from "~/utils/category/stringify";
import { getCurrentCartKey } from "~/utils/storage/get";
import type { Route } from "./+types/entrees";

const PRODUCTS: string[] = [
    "steak",
    "lasagne",
    "burger",
    "chicken",
    "taco",
    "burrito",
    "sushi",
    "pasta",
    "shrimp",
    "fish",
    "pizza",
    "hotdog",
];

export function meta() {
    const categoryName = stringifyCategory(Category.ENTREES);
    return [{ title: `${APP_NAME} | ${categoryName}` }];
}

export async function clientLoader() {
    return getCurrentCartKey();
}

export default function Holder({ loaderData }: Route.ComponentProps) {
    return loaderData ? <Menu /> : <NotSelected />;
}

const Menu = () => {
    return <ProductPage products={PRODUCTS} category={Category.ENTREES} />;
};
