import errorLogo from "../assets/404-error.png";

const PageNotFound = () => {
    return(
        <div className="min-h-screen flex-column justify-center bg-gray-900 text-white text-2xl">
            <div className="flex justify-center">
                <img src={errorLogo} alt="Page not found icon" />
            </div>
            
            
            <div>Oops! The page you are looking for is invalid!!</div>
            
        </div>
    );
}

export default PageNotFound;
