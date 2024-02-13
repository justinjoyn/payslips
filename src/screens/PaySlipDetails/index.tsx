import { Button, Card, CardActions, CardContent, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { mockPayslips } from '../../assets/data/payslips';
import { formatDate } from '../../common/utils';
import CustomAppBar from '../../components/CustomAppBar';
import { Payslip } from '../../types/common';

export default function PaySlipDetails() {
    const params = useParams();

    const [payslip, setPayslip] = useState<Payslip>();
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    useEffect(() => {
        // Fetch payslip by id
        const payslip = mockPayslips.find(p => p.id.toString() === params.id);

        if (payslip) {
            const formattedFromDate = formatDate(payslip.fromDate);
            const formattedToDate = formatDate(payslip.toDate);
            setFromDate(formattedFromDate);
            setToDate(formattedToDate);
            setPayslip(payslip);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderPdf = () => {
        const pdfFile = `/${payslip?.file}`;
        return <iframe src={pdfFile} width="100%" height="600px" title="Payslip" />;
    };

    const onDownload = () => {};

    return (
        <>
            <CustomAppBar title={'Payslip Details'} />
            <Container>
                <br />
                <Card variant={'outlined'}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {`Pay Period: ${fromDate} to ${toDate}`}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={onDownload}>
                            Download
                        </Button>
                    </CardActions>
                </Card>
                {renderPdf()}
            </Container>
        </>
    );
}
