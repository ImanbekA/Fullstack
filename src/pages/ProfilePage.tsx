import { Container, Typography, Card, CardContent, Box } from "@mui/material"
import { MockUser } from "../shared/mocks/user"

<Container maxWidth="md">
    <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1">
            Личный кабинет
        </Typography>
        <Card sx={{ mt: 3 }}>
            <CardContent>
                <Typography> Email: {MockUser.email} </Typography>
                <Typography> Nickname: {MockUser.nickname} </Typography>
                <Typography> Phone: {MockUser.phone} </Typography>
                <Typography> RegData: {MockUser.registrationDate} </Typography>
            </CardContent>
        </Card>
    </Box>
</Container>

export function ProfilePage() {
    return(
        <Container maxWidth="md">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
            Личный кабинет
                </Typography>
                <Card sx={{ mt: 3 }}>
                    <CardContent>
                        <Typography> Email: {MockUser.email} </Typography>
                        <Typography> Nickname: {MockUser.nickname} </Typography>
                        <Typography> Phone: {MockUser.phone} </Typography>
                         <Typography> RegData: {MockUser.registrationDate} </Typography>
                     </CardContent>
                </Card>
            </Box>
        </Container>
    )
}