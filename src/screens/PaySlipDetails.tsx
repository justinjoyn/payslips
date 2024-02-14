import { Alert, Button, Card, CardActions, CardContent, Container, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';

import { mockPayslips } from '../assets/data/payslips';
import { formatDate } from '../common/utils';
import CustomAppBar from '../components/CustomAppBar';
import { Payslip } from '../types/common';

const DOWNLOAD_STATUS = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR'
} as const;

export default function PaySlipDetails() {
    const params = useParams();

    const isWeb = Capacitor.getPlatform() === 'web';

    const [payslip, setPayslip] = useState<Payslip>();
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [downloadStatus, setDownloadStatus] = useState<keyof typeof DOWNLOAD_STATUS>();

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
    }, []);

    const onDownload = async () => {
        if (!payslip?.file) return;

        if (isWeb) {
            const link = document.createElement('a');
            link.href = payslip?.file;
            link.target = '_blank';
            link.download = 'payslip.pdf';
            link.click();
            setDownloadStatus(DOWNLOAD_STATUS.SUCCESS);
        } else if (Capacitor.isNativePlatform()) {
            await Filesystem.requestPermissions();
            Filesystem.downloadFile({
                url: payslip?.file,
                directory: Directory.Documents,
                path: 'payslip.pdf'
            })
                .then(async () => {
                    setDownloadStatus(DOWNLOAD_STATUS.SUCCESS);
                })
                .catch(error => {
                    setDownloadStatus(DOWNLOAD_STATUS.ERROR);
                });
        } else {
            setDownloadStatus(DOWNLOAD_STATUS.ERROR);
        }
    };

    const renderAlert = () => {
        if (downloadStatus === DOWNLOAD_STATUS.SUCCESS) {
            return (
                <Alert icon={<CheckIcon fontSize={'inherit'} />} severity={'success'}>
                    {`The payslip has been successfully downloaded.`}
                </Alert>
            );
        } else if (downloadStatus === DOWNLOAD_STATUS.ERROR) {
            return (
                <Alert icon={<CloseIcon fontSize={'inherit'} />} severity={'error'}>
                    {`There was an error while downloading the payslip. Please try again later.`}
                </Alert>
            );
        } else {
            return null;
        }
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
                    <CardActions>
                        <Button size="small" onClick={onDownload}>
                            {`Download Payslip`}
                        </Button>
                    </CardActions>
                    {renderAlert()}
                </Card>
            </Container>
        </>
    );
}
