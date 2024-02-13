import { AppBar, Toolbar, Typography } from '@mui/material';

export default function CustomAppBar() {
    return (
        <AppBar position={'sticky'}>
            <Toolbar>
                <Typography variant={'h6'} component={'div'} sx={{ flexGrow: 1 }}>
                    Payslips
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
