import { Navigate } from "react-router-dom";

export function PrivateRoute({children, auth} = {}){
    return auth? children : <Navigate to="/login" />;
}