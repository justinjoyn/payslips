import { Button, Card, CardActions, CardContent, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Document, Page } from 'react-pdf';

import { mockPayslips } from '../../assets/data/payslips';
import { formatDate } from '../../common/utils';
import CustomAppBar from '../../components/CustomAppBar';
import { Payslip } from '../../types/common';

import './style.css';

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
        return (
            <Card variant={'outlined'}>
                <CardContent>
                    <Document file={pdfFile} renderMode={'canvas'} className={'pdfViewer'}>
                        <Page pageNumber={1} renderAnnotationLayer={false} renderTextLayer={false} />
                    </Document>
                </CardContent>
            </Card>
        );
    };

    const onDownload = () => {};

    return (
        <>
            <CustomAppBar title={'Payslip Details'} />
            <Container>
                <br />
                <Card variant={'outlined'}>
                    <CardContent>
                        <Typography variant={'h6'} component={'div'}>
                            {`Pay Period: ${fromDate} to ${toDate}`}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={onDownload}>
                            Download
                        </Button>
                    </CardActions>
                </Card>
                <br />
                {renderPdf()}
            </Container>
        </>
    );
}
