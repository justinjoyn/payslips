import { Alert, Button, Card, CardActions, CardContent, Container, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Document, Page } from 'react-pdf';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';
import { FileOpener } from '@capacitor-community/file-opener';

import { mockPayslips } from '../assets/data/payslips';
import { formatDate } from '../common/utils';
import CustomAppBar from '../components/CustomAppBar';
import { Payslip } from '../types/common';
import { constants } from 'buffer';

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
        const pdfFile = `${process.env.PUBLIC_URL}/${payslip?.file}`;
        console.log('pdfFile', pdfFile);

        if (Capacitor.getPlatform() === 'web') {
            const link = document.createElement('a');
            link.href = pdfFile;
            link.download = 'payslip.pdf';
            link.click();
            setHasDownloaded(true);
        } else if (Capacitor.isNativePlatform()) {
            await Filesystem.requestPermissions();
            Filesystem.downloadFile({
                url: pdfFile,
                directory: Directory.Documents,
                path: 'payslip.pdf'
            })
                .then(async () => {
                    setHasDownloaded(true);
                })
                .catch(error => {
                    console.error('Error downloading file', error);
                });
        } else {
            // Handle unsupported platform
        }
    };

    // Function to read a file from the public directory
    async function readFileFromPublicDirectory(filename: string | undefined) {
        try {
            const file = await Filesystem.readFile({
                path: `public/${filename}`
            });
            // File data will be in file.data
            console.log('File data:', file.data);
            return file.data;
        } catch (error) {
            console.error('Error reading file:', error);
            return null;
        }
    }

    const onOpen = async () => {
        const pdfFile = `${process.env.PUBLIC_URL}/${payslip?.file}`;
        await readFileFromPublicDirectory(payslip?.file);
        console.log('pdfFile', pdfFile);
        await FileOpener.open({ filePath: pdfFile, contentType: 'application/pdf' }).catch(error => {
            console.error('Error opening file', error);
        });
    };

    const renderPdf = () => {
        if (Capacitor.getPlatform() === 'web') {
            const pdfFile = `/${payslip?.file}`;
            return (
                <Card variant={'outlined'}>
                    <CardContent>
                        <Document file={pdfFile} renderMode={'canvas'}>
                            <Page pageNumber={1} renderAnnotationLayer={false} renderTextLayer={false} />
                        </Document>
                    </CardContent>
                </Card>
            );
        } else {
            return null;
        }
    };

    const renderActions = () => {
        const isWeb = Capacitor.getPlatform() === 'web';
        return (
            <CardActions>
                <Button size="small" onClick={onDownload}>
                    Download Payslip
                </Button>
                {!isWeb && (
                    <Button size="small" onClick={onOpen}>
                        View Payslip
                    </Button>
                )}
            </CardActions>
        );
    };

    return (
        <>
            <CustomAppBar title={'Payslip Details'} />
            <Container>
                <br />
                <Card variant={'outlined'}>
                    <CardContent>
                        <Typography variant={'subtitle1'} component={'div'}>
                            {`Name: Justin Joy`}
                        </Typography>
                        <Typography variant={'subtitle1'} component={'div'}>
                            {`Employee #: 16`}
                        </Typography>
                        <Typography variant={'subtitle1'} component={'div'}>
                            {`Department: Engineering`}
                        </Typography>
                        <Typography variant={'subtitle1'} component={'div'}>
                            {`Pay Period: ${fromDate} to ${toDate}`}
                        </Typography>
                    </CardContent>
                    {renderActions()}
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
