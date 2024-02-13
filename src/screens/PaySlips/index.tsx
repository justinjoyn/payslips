import { Container } from '@mui/system';
import { useState } from 'react';

import CustomAppBar from '../../components/CustomAppBar';
import PayslipTable from '../../components/PayslipTable';
import { mockPayslips } from '../../assets/data/payslips';
import { Payslip } from '../../types/common';

export default function PaySlips() {
    const [payslips, setPayslips] = useState<Payslip[]>(mockPayslips);

    return (
        <>
            <CustomAppBar />
            <Container>
                <PayslipTable payslips={payslips} />
            </Container>
        </>
    );
}
