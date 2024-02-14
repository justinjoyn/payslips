import { TableCell, TableRow } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';

import { Payslip } from '../types/common';
import { formatDate } from '../common/utils';

type Props = {
    payslip: Payslip;
    onClick: (payslip: Payslip) => void;
};

export default function PayslipRow(props: Props) {
    const { payslip, onClick } = props;

    const formattedFromDate = formatDate(payslip.fromDate);
    const formattedToDate = formatDate(payslip.toDate);

    return (
        <TableRow
            key={payslip.id}
            hover
            onClick={event => onClick(payslip)}
            aria-labelledby={`Payslip from ${formattedFromDate} to ${formattedToDate}`}>
            <TableCell>
                <ArticleIcon />
            </TableCell>
            <TableCell>{`${formattedFromDate} - ${formattedToDate}`}</TableCell>
            <TableCell align={'right'} sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{`£5,560`}</TableCell>
        </TableRow>
    );
}
