import { render, screen } from '@testing-library/react';
import PayslipRow from './PayslipRow';

describe('PayslipRow', () => {
    const mockPayslip = {
        id: 1,
        fromDate: '2022-03-01',
        toDate: '2022-03-31',
        file: 'payslip.pdf'
    };

    const mockOnClick = jest.fn();

    const WrapperTable = ({ children }: { children: React.ReactElement }) => (
        <table>
            <tbody>{children}</tbody>
        </table>
    );

    it('renders without crashing', () => {
        render(<PayslipRow payslip={mockPayslip} onClick={mockOnClick} />, { wrapper: WrapperTable });
    });

    it('displays the correct payslip data', () => {
        render(<PayslipRow payslip={mockPayslip} onClick={mockOnClick} />, { wrapper: WrapperTable });

        expect(screen.getByText('01 Mar, 2022 - 31 Mar, 2022')).toBeInTheDocument();
        expect(screen.getByText('£5,560')).toBeInTheDocument();
    });
});
