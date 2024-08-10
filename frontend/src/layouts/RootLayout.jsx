import { Outlet, useLocation } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RootLayout() {
  const location = useLocation();

  const a=location.pathname;
  let test;
  switch (a) {
    case '/':
      test = 1;
      break;

    case '/courses':
      test = 1;
      break;
    
    case '/pricing':
      test = 1;
      break; 
      
    case '/about':
      test = 1;
      break;
      
    case '/contact':
      test = 1;
      break;      
      
    case '/forgotPassword':
      test = 1;
      break;
        
    case '/educator':
      test = 1;
      break;
        

    default:
      test = 0;
      break;
  }

  return (
    <Box w="100%">
      <Box style={{display : test ? 'block' : 'none'}}>
        <Navbar />
      </Box>
      <Outlet />
      <Box style={{display : test ? 'block' : 'none'}}>
        <Footer/>
      </Box>
    </Box>
  );
}