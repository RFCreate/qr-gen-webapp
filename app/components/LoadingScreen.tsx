import Spinner from "~/components/Spinner";

const LoadingScreen = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-base-200/70 z-1000">
            <div className="items-center flex flex-col justify-center w-full h-[calc(100vh)]">
                <Spinner />
            </div>
        </div>
    );
};

export default LoadingScreen;
