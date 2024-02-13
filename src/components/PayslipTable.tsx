import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import DownloadIcon from '@mui/icons-material/Download';

import { formatDate } from '../common/utils';
import { Payslip } from '../types/common';
import { useMemo } from 'react';

type Props = {
    payslips: Payslip[];
};

export default function PayslipTable(props: Props) {
    const { payslips } = props;

    const PayslipRows = useMemo(() => {
        return payslips.map(row => {
            const formattedFromDate = formatDate(row.fromDate);
            const formattedToDate = formatDate(row.toDate);

            return (
                <TableRow key={row.id} aria-labelledby={`Payslip from ${formattedFromDate} to ${formattedToDate}`}>
                    <TableCell>
                        <ArticleIcon />
                    </TableCell>
                    <TableCell>{`${formattedFromDate} - ${formattedToDate}`}</TableCell>
                    <TableCell align={'right'} sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{`£5,560`}</TableCell>
                    <TableCell align={'right'} aria-labelledby={'Download payslip'}>
                        <IconButton aria-label={'delete'}>
                            <DownloadIcon />
                        </IconButton>
                    </TableCell>
                </TableRow>
            );
        });
    }, [payslips]);

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
