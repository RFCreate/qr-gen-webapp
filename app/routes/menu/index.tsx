import { useNavigate } from "react-router";
import NotSelected from "~/components/NotSelected";
import { APP_NAME } from "~/routes/index";
import { Category } from "~/types/category";
import { stringifyCategory } from "~/utils/category/stringify";
import { getCurrentCartKey } from "~/utils/storage/get";
import type { Route } from "./+types";

export function meta() {
    return [{ title: `${APP_NAME} | Menu` }];
}

export async function clientLoader() {
    return getCurrentCartKey();
}

export default function Holder({ loaderData }: Route.ComponentProps) {
    return loaderData ? <Menu /> : <NotSelected />;
}

const Item = ({ category }: { category: Category }) => {
    const navigate = useNavigate();
    const categoryName = stringifyCategory(category).toLowerCase();
    return (
        <button
            type="button"
            className="relative aspect-square size-full flex items-end justify-center rounded-lg shadow-md overflow-hidden focus:outline-none cursor-pointer"
            onClick={() => navigate(`/webapp/menu/${categoryName}`)}
        >
            <img
                src={`/images/menu/${categoryName}.png`}
                alt={categoryName}
                className="absolute inset-0 object-cover hover:scale-105 transition-transform duration-200"
            />
            <span className="relative z-10 w-full text-center text-white text-lg font-bold py-2 tracking-wide text-shadow-lg">
                {categoryName.toUpperCase()}
            </span>
        </button>
    );
};

const Menu = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <span className="text-2xl font-bold mb-8 text-center">
                ¿QUÉ SE TE ANTOJA HOY?
            </span>
            <div className="grid grid-cols-2 gap-6 w-full max-w-md">
                <Item category={Category.STARTERS} />
                <Item category={Category.SALADS} />
                <Item category={Category.SOUPS} />
                <Item category={Category.ENTREES} />
                <Item category={Category.SIDES} />
                <Item category={Category.DESSERTS} />
                <Item category={Category.BEVERAGES} />
            </div>
        </div>
    );
};
