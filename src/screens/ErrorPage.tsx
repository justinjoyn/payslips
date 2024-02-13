import { Button, Card, CardActions, CardContent, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import CustomAppBar from '../components/CustomAppBar';

export default function ErrorPage() {
    const navigate = useNavigate();

    const onGoBack = () => {
        navigate(-1);
    };

    return (
        <>
            <CustomAppBar title={'Error'} />
            <br />
            <br />
            <Container maxWidth={'sm'}>
                <Card variant={'outlined'}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Error!
                        </Typography>
                        <Typography variant="h5" component="div">
                            Oops! Something went wrong.
                        </Typography>

                        <Typography variant="body2">
                            We are sorry, but we are unable to process your request at this time. Please try again
                            later.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={onGoBack}>
                            Go Back
                        </Button>
                    </CardActions>
                </Card>
            </Container>
        </>
    );
}
