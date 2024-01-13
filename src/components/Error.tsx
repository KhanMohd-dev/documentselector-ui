import React from 'react';
import { useRouteError } from "react-router-dom"

const Error: React.FC = () => {
    const error: unknown = useRouteError()
    return (
        <div>
            <h1>Oops!</h1>
            <h2>Something went wrong</h2>
            <h2>         {(error as Error)?.message ||
                (error as { statusText?: string })?.statusText}
            </h2>
        </div>
    );
};

export default Error;
