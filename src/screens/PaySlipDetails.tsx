import { Alert, Button, Card, CardActions, CardContent, Container, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Document, Page } from 'react-pdf';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';

import { mockPayslips } from '../assets/data/payslips';
import { formatDate } from '../common/utils';
import CustomAppBar from '../components/CustomAppBar';
import { Payslip } from '../types/common';

export default function PaySlipDetails() {
    const params = useParams();

    const [payslip, setPayslip] = useState<Payslip>();
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [hasDownloaded, setHasDownloaded] = useState(false);

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

    const onDownload = async () => {
        const pdfFile = `/${payslip?.file}`;

        if (Capacitor.getPlatform() === 'web') {
            const link = document.createElement('a');
            link.href = pdfFile;
            link.download = 'payslip.pdf';
            link.click();
        } else if (Capacitor.isNativePlatform()) {
            await Filesystem.requestPermissions();
            Filesystem.downloadFile({
                url: pdfFile,
                directory: Directory.Documents,
                path: 'payslip.pdf'
            }).then(async () => {
                setHasDownloaded(true);
            });
        } else {
            // Handle unsupported platform
        }
    };

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
                    {hasDownloaded && (
                        <Alert icon={<CheckIcon fontSize={'inherit'} />} severity={'success'}>
                            The payslip has been successfully downloaded.
                        </Alert>
                    )}
                </Card>
                <br />
                {renderPdf()}
            </Container>
        </>
    );
}
