// FILEPATH: /Users/justin/Projects/payslips/src/components/PayslipTable.test.tsx
import { render, screen } from '@testing-library/react';
import PayslipTable from './PayslipTable';

describe('PayslipTable', () => {
    const mockPayslips = [
        {
            id: 1,
            fromDate: '2022-03-01',
            toDate: '2022-03-31',
            file: 'payslip.pdf'
        },
        {
            id: 2,
            fromDate: '2022-03-01',
            toDate: '2022-03-31',
            file: 'payslip.pdf'
        }
    ];

    const mockOnClick = jest.fn();

    it('renders without crashing', () => {
        render(<PayslipTable payslips={mockPayslips} onClick={mockOnClick} />);
    });

    it('displays the correct number of rows', () => {
        render(<PayslipTable payslips={mockPayslips} onClick={mockOnClick} />);
        const rows = screen.getAllByRole('row');
        expect(rows.length).toBe(mockPayslips.length + 1); // +1 for the header row
    });
});
