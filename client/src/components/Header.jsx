// MUI Componenets
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

const Header = ({ title, subTitle }) => {
  const theme = useTheme();

  return (
    <Box>
      <Typography
        variant="h2"
        color={theme.palette.secondary[100]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={theme.palette.secondary[300]}>
        {subTitle}
      </Typography>
    </Box>
  );
};

export default Header;
