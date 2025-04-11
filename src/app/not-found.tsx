import { BsFillSignStopFill } from "react-icons/bs";

export default function NotFound() {
    return (    
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <BsFillSignStopFill className="text-6xl my-5" />
            <h1 className="text-4xl font-bold">404</h1>
            <p className="mt-4 text-lg">Page Not Found</p>
        </div>
    );    
}