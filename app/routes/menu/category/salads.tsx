import NotSelected from "~/components/NotSelected";
import ProductPage from "~/components/ProductPage";
import { APP_NAME } from "~/routes/index";
import { Category } from "~/types/category";
import { stringifyCategory } from "~/utils/category/stringify";
import { getCurrentCartKey } from "~/utils/storage/get";
import type { Route } from "./+types/salads";

const PRODUCTS: string[] = ["salad_bowl", "lettuce", "cherry_tomatoes"];

export function meta() {
    const categoryName = stringifyCategory(Category.SALADS);
    return [{ title: `${APP_NAME} | ${categoryName}` }];
}

export async function clientLoader() {
    return getCurrentCartKey();
}

export default function Holder({ loaderData }: Route.ComponentProps) {
    return loaderData ? <Menu /> : <NotSelected />;
}

const Menu = () => {
    return <ProductPage products={PRODUCTS} category={Category.SALADS} />;
};
