import { useMemo } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import { Payslip } from '../types/common';
import PayslipRow from './PayslipRow';

type Props = {
    payslips: Payslip[];
    onClick: (payslip: Payslip) => void;
};

export default function PayslipTable(props: Props) {
    const { payslips, onClick } = props;

    const PayslipRows = useMemo(
        () => payslips.map(row => <PayslipRow payslip={row} onClick={onClick} />),
        [onClick, payslips]
    );

    return (
        <TableContainer>
            <Table aria-labelledby={'List of payslips'} size={'medium'}>
                <TableHead>
                    <TableRow>
                        <TableCell padding={'checkbox'}></TableCell>
                        <TableCell align={'left'}>Pay Period</TableCell>
                        <TableCell align={'right'} sx={{ display: { xs: 'none', sm: 'block' } }}>
                            Net Pay
                        </TableCell>
                        <TableCell align={'right'}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{PayslipRows}</TableBody>
            </Table>
        </TableContainer>
    );
}
