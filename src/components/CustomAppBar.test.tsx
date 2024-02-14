import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CustomAppBar from './CustomAppBar';

describe('CustomAppBar', () => {
    jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'),
        useNavigate: () => jest.fn()
    }));

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        render(<CustomAppBar title="Test Title" />, { wrapper: BrowserRouter });
    });

    it('displays the correct title', () => {
        render(<CustomAppBar title="Test Title" />, { wrapper: BrowserRouter });
        expect(screen.getByText('Test Title')).toBeInTheDocument();
    });
});
