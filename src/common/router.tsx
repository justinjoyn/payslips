import { createBrowserRouter } from 'react-router-dom';

// Screens
import PaySlips from '../screens/PaySlips';
import PaySlipDetails from '../screens/PaySlipDetails';
import ErrorPage from '../screens/ErrorPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <PaySlips />,
        errorElement: <ErrorPage />
    },
    {
        path: '/payslips',
        element: <PaySlips />,
        errorElement: <ErrorPage />
    },
    {
        path: '/payslips/:id',
        element: <PaySlipDetails />,
        errorElement: <ErrorPage />
    }
]);
