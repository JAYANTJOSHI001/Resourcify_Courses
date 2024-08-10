import { Box ,AspectRatio} from "@chakra-ui/react";
import HeroHome from "../components/HeroHome";
import IconApp from "../components/Comp";
import Benefits from "../components/Benefits";
import OurCourses from "../components/OurCourses";
import OurTestimonials from "../components/Testimonials"; 
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";

export default function Home() {
  return (
    <Box bg="gray.100" minHeight='auto' alignContent="center" overflow='hidden'>
        <HeroHome></HeroHome>
        <IconApp></IconApp> 
        <Box maxW="1300px" mx="auto" my="100px" p={10}>
          <AspectRatio ratio={16 / 9}>
            <iframe
              src="../../img/Eduvid.mp4"
              frameBorder="1"
              allowFullScreen
            />
          </AspectRatio>
        </Box>
        <Benefits></Benefits>
        <OurCourses></OurCourses>
        <OurTestimonials></OurTestimonials>  
        <Pricing></Pricing>
        <FAQ></FAQ>
    </Box>
  )
}
