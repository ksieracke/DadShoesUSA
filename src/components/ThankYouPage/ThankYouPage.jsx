import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Link from "@mui/material/Link";

function ThankYouPage() {
  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: "center", marginTop: "100px" }}>
        <CheckCircleIcon sx={{ fontSize: "80px", color: "green" }} />
        <Typography variant="h4" gutterBottom>
          Thank you for your purchase!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Your order will arrive in 7-10 business days.
        </Typography>
        <Typography variant="body1" gutterBottom>
          An email confirmation has been sent to your inbox.
        </Typography>
        <Typography variant="body1" gutterBottom>
          If you have any questions, please contact our support team at{" "}
          <Link href="mailto:Support@DadShoesUSA.com">Support@DadShoesUSA.com</Link>.
        </Typography>
      </Box>
    </Container>
  );
}

export default ThankYouPage;
