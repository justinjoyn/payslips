import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

type Props = {
    title?: string;
};

export default function CustomAppBar(props: Props) {
    const navigate = useNavigate();

    const { title } = props;

    const onGoBack = () => {
        navigate(-1);
    };

    return (
        <AppBar position={'sticky'}>
            <Toolbar>
                <IconButton
                    size={'large'}
                    edge={'start'}
                    color={'inherit'}
                    aria-label={'Go back'}
                    sx={{ mr: 2 }}
                    onClick={onGoBack}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant={'h6'} component={'div'} sx={{ flexGrow: 1 }}>
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
