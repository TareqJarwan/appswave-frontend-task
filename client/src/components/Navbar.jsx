// Packages
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// MUI Components
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material";

// MUI Icons
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  ShoppingCart,
  // Favorite,
  Logout,
} from "@mui/icons-material";

// Components
import FlexBetween from "components/FlexBetween";

// State
import { setMode, setUserId } from "state";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>

          <IconButton onClick={() => navigate("/cart")}>
            <ShoppingCart sx={{ fontSize: "25px" }} />
          </IconButton>

          {/* <IconButton>
            <Favorite sx={{ fontSize: "25px" }} />
          </IconButton> */}

          <IconButton
            onClick={() => {
              dispatch(setUserId(""));
              navigate("/login");
            }}
          >
            <Logout sx={{ fontSize: "25px" }} />
          </IconButton>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
