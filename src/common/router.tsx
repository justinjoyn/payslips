import { createBrowserRouter } from 'react-router-dom';

// Screens
import PaySlips from '../screens/PaySlips';
import PaySlipDetails from '../screens/PaySlipDetails';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <PaySlips />
    },
    {
        path: '/payslips',
        element: <PaySlips />
    },
    {
        path: '/payslips/:id',
        element: <PaySlipDetails />
    }
]);
