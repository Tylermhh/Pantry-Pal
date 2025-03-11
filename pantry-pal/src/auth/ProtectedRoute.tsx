import { Navigate } from "react-router";
import {JSX} from "react";

interface ProtectedRouteProps {
    authToken: string;
    children: JSX.Element;
}

export function ProtectedRoute(props: ProtectedRouteProps) {
    if (!props.authToken) {
        return <Navigate to="/login" replace />
    }

    return props.children;
}