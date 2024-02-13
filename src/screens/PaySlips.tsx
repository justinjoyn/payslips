import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CustomAppBar from '../components/CustomAppBar';
import PayslipTable from '../components/PayslipTable';
import { mockPayslips } from '../assets/data/payslips';
import { Payslip } from '../types/common';

export default function PaySlips() {
    const navigate = useNavigate();

    const [payslips, setPayslips] = useState<Payslip[]>([]);

    useEffect(() => {
        // Sort payslips by fromDate
        const sortedPayslips = mockPayslips.sort(
            (a, b) => new Date(b.fromDate).getTime() - new Date(a.fromDate).getTime()
        );
        setPayslips(sortedPayslips);
    }, []);

    const onPayslipClick = (payslip: Payslip) => {
        navigate('/payslips/' + payslip.id);
    };

    return (
        <>
            <CustomAppBar title={'Payslips'} />
            <Container>
                <PayslipTable payslips={payslips} onClick={onPayslipClick} />
            </Container>
        </>
    );
}
