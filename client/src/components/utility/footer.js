import "../../css/utility/footer.css";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Snackbar from "@material-ui/core/Snackbar";
// import { withStyles }  from '@mui/material/styles';
import Button from "@mui/material/Button";
import MuiAlert from "@mui/material/Alert";
export const Footer = () => {
//   const [open, setOpen] = useState(true);
//   const styles = {
//     snackbarStyleViaContentProps: {
//       backgroundColor: "red"
//     },
//     snackbarStyleViaNestedContent: {
//       backgroundColor: "lightgreen",
//       color: "black"
//     }
//   };
//   const theme = createTheme({
//     palette: {
//       primary: {
//         main: "#FF0000",
//       },
//       secondary: {
//         main: "#FF0030",
//       },
//     },
//   });
  return (
    <footer className="footer">
      <ul>
        {/* <Snackbar
        sx={{
            color:'red'
        }}
          open={open}
          autoHideDuration={6000}
          //   onClose={handleClose}
          message="We use essential cookies to make our site work. With your consent, we may also use non-essential cookies to improve user experience and analyze website traffic. By clicking “Accept,“ you agree to our website's cookie use as described in our Cookie Policy. You can change your cookie settings at any time by clicking “Preferences.”"
          action={<Button color="secondary">Agree</Button>}
          style={{ backgroundColor: 'red'}}
        /> */}
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="/register">About Us</a>
        </li>
        <li>
          <a href="/register">Contact</a>
        </li>
        <li>
          <a href="/register"> Terms of Service</a>
        </li>
        <li>
          <a href="/register">Cookie Policy</a>
        </li>
        <li></li>
      </ul>
    </footer>
  );
};

export default Footer;
