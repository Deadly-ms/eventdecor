import '../index.css'

import Footer from "@/components/Footer";
import AboutPreview from "@/components/AboutPreview";
import GalleryPreview from "@/components/GalleryPreview";
import TrustPreview from "@/components/TrustPreview";
import TrustStats from "@/components/TrustStats";
// import TestimonialSlider from "@/components/TestimonialSlider";
// import TestRole from "@/components/TestRole";
import AboutTestimonialSlider from '@/components/AboutTestimonialSlider';

import ServicePage from './ServicePage';
import HeroContent from '@/components/HeroContent';

import FloatingButtons from '@/components/FloatingButtons';

const Home = () => {
  return (
    <>
      {/* <TestRole /> */}
       <HeroContent />
      <AboutPreview />
      <TrustStats />
      <ServicePage />
      <GalleryPreview />
      <TrustPreview />
      {/* <TestimonialSlider /> */}
      <AboutTestimonialSlider /> 
      <FloatingButtons />

      <Footer />

    </>
  );
};

export default Home;
