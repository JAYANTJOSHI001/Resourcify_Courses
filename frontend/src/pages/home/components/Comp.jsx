import { Icon, Box, HStack, ChakraProvider } from "@chakra-ui/react";
import { SiZapier, SiSpotify, SiZoom, SiAdobe, SiAmazon, SiNotion, SiNetflix } from "react-icons/si";

export default function IconApp() {
    return (
        <Box alignSelf="center" mb="100px">
            <ChakraProvider>
                <HStack
                    justifyContent="space-around"
                    mx="auto"
                    maxWidth={{ base: "90%", md: "80%", lg: "70%", xl: "60%" }}
                    bg="white"
                    p={{ base: "5px", md: "10px" }}
                    borderRadius="10px"
                    spacing={{ base: "10px", md: "20px" }}
                >
                    <Icon as={SiZapier} w={{ base: 10, md: 12, lg: 14 }} h={{ base: 10, md: 12, lg: 14 }} p="5px" />
                    <Icon as={SiSpotify} w={{ base: 10, md: 12, lg: 14 }} h={{ base: 10, md: 12, lg: 14 }} p="5px" />
                    <Icon as={SiZoom} w={{ base: 14, md: 16, lg: 20 }} h={{ base: 14, md: 16, lg: 20 }} p="5px" />
                    <Icon as={SiAmazon} w={{ base: 10, md: 12, lg: 14 }} h={{ base: 10, md: 12, lg: 14 }} p="5px" />
                    <Icon as={SiAdobe} w={{ base: 10, md: 12, lg: 14 }} h={{ base: 10, md: 12, lg: 14 }} p="5px" />
                    <Icon as={SiNotion} w={{ base: 10, md: 12, lg: 14 }} h={{ base: 10, md: 12, lg: 14 }} p="5px" />
                    <Icon as={SiNetflix} w={{ base: 10, md: 12, lg: 14 }} h={{ base: 10, md: 12, lg: 14 }} p="5px" />
                </HStack>
            </ChakraProvider>
        </Box>
    );
};
