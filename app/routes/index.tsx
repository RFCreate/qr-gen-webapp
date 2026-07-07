import { Navigate } from "react-router";

const Index = () => {
    // Redirect to main page
    return <Navigate to="/webapp" replace />;
};

export default Index;

export const APP_NAME = "My WebApp";
