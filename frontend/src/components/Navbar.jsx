import { Flex, Box, HStack, Button, Spacer, Image, useDisclosure, IconButton, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, VStack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="gray.100" px={{ base: "4", md: "8" }} py={{ base: "2", md: "4" }}>
      <Flex maxW="90%" mx="auto" align="center" justify="space-between">
        <Image src="../../public/img/Resourcify.png" alt="Logo" maxW="150px" />

        <HStack display={{ base: "none", md: "flex" }} spacing="20px" ml="20px">
          <Box><NavLink to="/">Home</NavLink></Box>
          <Box><NavLink to="/about">About Us</NavLink></Box>
          <Box><NavLink to="/pricing">Pricing</NavLink></Box>
          <Box><NavLink to="/contact">Contact</NavLink></Box>
          <Box><NavLink to="/educator">For Educators</NavLink></Box>
        </HStack>

        <Spacer />

        <HStack spacing="20px" display={{ base: "none", md: "flex" }}>
          <Box><NavLink to="/signup">Signup</NavLink></Box>
          <Button bg="orange.400" color="white" _hover={{ bg: "orange.500" }}>
            <NavLink to="/login">Login</NavLink>
          </Button>
        </HStack>

        <IconButton
          display={{ base: "flex", md: "none" }}
          aria-label="Open Menu"
          icon={<HamburgerIcon />}
          onClick={onOpen}
        />

        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              <VStack spacing="20px" align="flex-start">
                <Box><NavLink to="/" onClick={onClose}>Home</NavLink></Box>
                <Box><NavLink to="/courses" onClick={onClose}>Courses</NavLink></Box>
                <Box><NavLink to="/about" onClick={onClose}>About Us</NavLink></Box>
                <Box><NavLink to="/pricing" onClick={onClose}>Pricing</NavLink></Box>
                <Box><NavLink to="/contact" onClick={onClose}>Contact</NavLink></Box>
                <Button bg="orange.400" color="white" _hover={{ bg: "orange.500" }} w="full" onClick={onClose}>
                  <NavLink to="/login">Login</NavLink>
                </Button>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Box>
  );
}
