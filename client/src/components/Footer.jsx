// MUI components
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

// Styled Components
const FooterContainer = styled('footer')(({ theme }) => ({
    padding: theme.spacing(2),
    marginTop: 'auto',
    backgroundColor: theme.palette.background.alt,
}));

const Footer = () => {
    return (
        <FooterContainer>
            <Container maxWidth="sm">
                <Typography variant="body1">
                    © {new Date().getFullYear()} All rights reserved by APPSWAVE
                </Typography>
            </Container>
        </FooterContainer>
    );
}

export default Footer;