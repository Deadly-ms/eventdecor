
// import { SignedIn } from '@clerk/clerk-react';
import Home from './pages/Home';
import { Routes, Route, useLocation } from "react-router-dom";
// import Navbar from './components/Navbar';
import RequireAdmin from './components/RequireAdmin';
import AdminDashboard from './pages/AdminDashboard';

import About from "./pages/About";
import Contact from './pages/Contact';
import Login from './pages/Login';
import Gallery from "./pages/Gallery";
import ServicePage from '@/pages/ServicePage';

// import WeddingService from './pages/services/WeddingService';
import ServiceDetail from './pages/services/ServiceDetail';

import { Toaster } from "react-hot-toast";
import AdminEditService from './components/AdminEditService';

import AdminServices from "./components/AdminServices";

import ScrollToTop from "./components/ScrollToTop";


import HomeLayout from "@/components/layout/HomeLayout";
import MainLayout from "@/components/layout/MainLayout";


import PageTransition from "@/animation/PageTransition";
import { AnimatePresence } from 'framer-motion';


// import HomePreview from './components/HomePreview';

export default function App() {
   const location = useLocation();
  return (
    <>
     <ScrollToTop />
    
     <AnimatePresence mode="wait">
  <Routes location={location} key={location.pathname}>

        {/* HOME PAGE WITH HOME NAV */}
      <Route element={<HomeLayout />}>
        {/* <Route path="/" element={<Home />} /> */}
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
      </Route>


        {/* <Route path="/" element={<Home />} /> */}

         {/* ALL OTHER PAGES WITH NORMAL NAVBAR */}
      <Route element={<MainLayout />}>
         {/* <Route path="/about" element={<About />} /> */}
          <Route
          path="/about"
          element={
            <PageTransition>
              <About />
            </PageTransition>
          }
        />

         {/* <Route path='login' element={<Login />} /> */}
         <Route
          path="/login"
          element={
            <PageTransition>
              <Login />
            </PageTransition>
          }
        />

         {/* <Route path="/gallery" element={<Gallery />} /> */}
         <Route
          path="/gallery"
          element={
            <PageTransition>
              <Gallery />
            </PageTransition>
          }
        />

         {/* <Route path="/services" element={<ServicePage />} /> */}
          <Route
          path="/services"
          element={
            <PageTransition>
              <ServicePage />
            </PageTransition>
          }
        />

             {/* <Route path="/services/:slug" element={<ServiceDetail />} /> */}
          <Route
          path="/services/:slug"
          element={
            <PageTransition>
              <ServiceDetail />
            </PageTransition>
          }
        />

             {/* <Route path="/admin/services" element={<AdminServices />} /> */}
          <Route
          path="/admin/services"
          element={
            <PageTransition>
              <AdminServices />
            </PageTransition>
          }
        />

             {/* <Route path="/admin/services/edit/:id" element={<AdminEditService />} /> */}
          <Route
          path="/admin/services/edit/:id"
          element={
            <PageTransition>
              <AdminEditService />
            </PageTransition>
          }
        />

        {/* <Route
          path="/contact"
          element={
            <SignedIn>
              <Contact />
            </SignedIn>
          }
        /> */}

          {/* <Route path="/contact" element={<Contact />} /> */}
          <Route
          path="/contact"
          element={
            <PageTransition>
              <Contact />
            </PageTransition>
          }
        />
     </Route>

           <Route element={<RequireAdmin />}>
            <Route path="/admin" element={
              <PageTransition>
                <AdminDashboard />
              </PageTransition> 
            } />
          </Route>
      </Routes>
      </AnimatePresence>
      
 <Toaster position="top-right" />
    </>  
  );
}