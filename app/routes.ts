import {
    index,
    layout,
    prefix,
    type RouteConfig,
    route,
} from "@react-router/dev/routes";

export default [
    index("routes/index.tsx"),
    layout("layout.tsx", [
        ...prefix("webapp", [
            // Main
            route("", "routes/main.tsx"),
            route("cart", "routes/cart/index.tsx"),
            route("import", "routes/import/index.tsx"),
            route("qr", "routes/qr/index.tsx"),

            // Menu
            route("menu", "routes/menu/index.tsx"),
            route("menu/starters", "routes/menu/category/starters.tsx"),
            route("menu/salads", "routes/menu/category/salads.tsx"),
            route("menu/soups", "routes/menu/category/soups.tsx"),
            route("menu/entrees", "routes/menu/category/entrees.tsx"),
            route("menu/sides", "routes/menu/category/sides.tsx"),
            route("menu/desserts", "routes/menu/category/desserts.tsx"),
            route("menu/beverages", "routes/menu/category/beverages.tsx"),
        ]),
    ]),
] satisfies RouteConfig;
