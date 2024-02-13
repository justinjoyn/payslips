import { AppBar, Toolbar, Typography } from '@mui/material';

type Props = {
    title?: string;
};

export default function CustomAppBar(props: Props) {
    const { title } = props;

    return (
        <AppBar position={'sticky'}>
            <Toolbar>
                <Typography variant={'h6'} component={'div'} sx={{ flexGrow: 1 }}>
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
