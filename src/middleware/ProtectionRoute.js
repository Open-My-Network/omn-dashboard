import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const [authenticated, setAuthenticated] = useState(null);

    useEffect(() => {
        fetch('/wp-admin/admin-ajax.php?action=check_user_authentication')
            .then(response => response.json())
            .then(data => {
                setAuthenticated(data.success && data.data.authenticated);
            });
    }, []);

    if (authenticated === null) {
        return <div>Loading...</div>; // Or any loading spinner
    }

    return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
