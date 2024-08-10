import { Box } from "@chakra-ui/react";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import Head from "./components/Head";

export default function Pricingpage() {
  return (
    <Box bg="gray.100" minHeight="1150px" maxHeight="8000px" alignContent="center">
      <Head />
      <Pricing />
      <FAQ />
    </Box>
  )
}
