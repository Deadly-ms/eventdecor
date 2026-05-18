// import { Link } from "react-router-dom";
// import { useState } from "react";
// import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
// import '../index.css'
// import { ChevronDown, Menu, X, ChevronRight } from "lucide-react";
// import { useUser } from "@clerk/clerk-react";



// const HomePreview = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [serviceOpen, setServiceOpen] = useState(false);
//   const { user } = useUser();
//   const role = (user?.publicMetadata as { role?: string })?.role;

//   return (
//     <>
//       <section
//         className="w-full min-h-screen bg-center bg-cover bg-fixed flex items-center justify-center"
//         style={{ backgroundImage: "url('src/assets/img111.jpg')" }}
//       >
//         {/* Glass Overlay */}
//         <div className="w-full min-h-screen bg-black/40 backdrop-blur-sm px-4 sm:px-10 md:px-20 lg:px-32 py-8 flex flex-col">

//           {/* ================= NAVBAR ================= */}
//           <div className="flex justify-between items-center text-sm tracking-wide w-full">
//             <h1 className="text-xl font-semibold text-white">PlantFashion</h1>

//             {/* Desktop Menu */}
//             <ul className="hidden md:flex gap-6 text-white items-center">
//               <li className="opacity-90 hover:opacity-100 text-white"><Link to="/">Home</Link></li>
//               <li className="opacity-90 hover:opacity-100"><Link to="/About">About</Link></li>
//               <li className="opacity-90 hover:opacity-100"><Link to="/Gallery">Gallery</Link></li>

//               {/* Service Dropdown */}
//               <li className="relative group">
//                 <button className="flex items-center gap-1 font-medium">
//                   Service
//                   <ChevronDown className="size-4 transition-transform group-hover:rotate-180" />
//                 </button>
             
//                <div className="absolute left-0 right-0 h-2 group-hover:block"></div>
//                 <div
//             className="
//             text-black
//               absolute 
//               opacity-0 
//               pointer-events-none
//               group-hover:opacity-100 
//               group-hover:pointer-events-auto
//               mt-2 w-80 bg-white shadow-lg rounded-lg border
//               transition-opacity duration-200
//             "
//           >
//           <ul className="text-sm">
//             <div className="p-4 border-b">
//               <Link to="/services">
//                 <div className="flex items-center justify-between">
//                  <h1 className="text-xl font-semibold">Our services</h1>
//                   <ChevronRight className="size-5 text-gray-400" />
//                    </div>
//                     </Link>
//                <p className="text-gray-500 text-xs">No flicker when moving mouse.</p>
//             </div>
//               <li><Link to="/services/wedding"className="block px-4 py-2 hover:bg-gray-100 rounded-lg">Wedding</Link></li>
//               <li><Link to="/services/birthday" className="block px-4 py-2 hover:bg-gray-100 rounded-lg">Birthday</Link></li>
//               <li><Link to="/services/party" className="block px-4 py-2 hover:bg-gray-100 rounded-lg">Party</Link></li>
//               <li><Link to="/services/corporate" className="block px-4 py-2 hover:bg-gray-100 rounded-lg">Corporate</Link></li>
//           </ul>
//         </div>
//               </li>

//               <li className="opacity-90 hover:opacity-100"><Link to="/Contact" className="text-white">Contact</Link></li>


//               {role === "admin" && (
//   <li>
//     <Link
//       to="/admin"
//       className="bg-white text-black px-4 py-1 rounded-lg font-semibold hover:scale-105 transition"
//     >
//       Admin Panel
//     </Link>
//   </li>
// )}

//               <li>
//                 <SignedOut>
//                   <SignInButton />
//                 </SignedOut>
//                 <SignedIn>
//                   <UserButton />
//                 </SignedIn>
//               </li>
//             </ul>

//             {/* Mobile Menu Button */}
//             <button
//               className="md:hidden text-white"
//               onClick={() => setMenuOpen(!menuOpen)}
//             >
//               {menuOpen ? <X /> : <Menu />}
//             </button>
//           </div>

//           {/* ================= MOBILE MENU ================= */}
//           {menuOpen && (
//         <div
//           className="
//             md:hidden 
//             mt-4 
//             rounded-2xl 
//             border border-white/20 
//             bg-white/20 
//             backdrop-blur-xl 
//             shadow-2xl 
//             p-5 
//             space-y-4 
//             text-white
//             animate-in 
//             slide-in-from-top-3 
//             duration-300
//           "
//         >
//     <Link to="/" className="block font-medium py-2 px-3 rounded-lg hover:bg-white/10 transition">
//       Home
//     </Link>

//     <Link to="/About" className="block text-base font-medium py-2 px-3 rounded-lg hover:bg-white/10 transition">
//       About
//     </Link>

//     <Link to="/Gallery" className="block text-base font-medium py-2 px-3 rounded-lg hover:bg-white/10 transition">
//       Gallery
//     </Link>

//     {/* Mobile Service Dropdown */}
//     <div className="rounded-lg overflow-hidden border border-white/10">
//       <button
//         className="flex justify-between items-center w-full py-2 px-3 font-medium hover:bg-white/10 transition"
//         onClick={() => setServiceOpen(!serviceOpen)}
//       >
//         <span>Service</span>
//         <ChevronDown
//           className={`transition-transform duration-300 ${serviceOpen ? "rotate-180" : ""}`}
//         />
//       </button>

//       {serviceOpen && (
//         <div className="bg-white/5 space-y-2 p-3">
//           <Link to="/services/wedding" className="block px-2 py-1 rounded hover:bg-white/10 transition">
//             Wedding
//           </Link>
//           <Link to="/services/birthday" className="block px-2 py-1 rounded hover:bg-white/10 transition">
//             Birthday
//           </Link>
//           <Link to="/services/party" className="block px-2 py-1 rounded hover:bg-white/10 transition">
//             Party
//           </Link>
//           <Link to="/services/corporate" className="block px-2 py-1 rounded hover:bg-white/10 transition">
//             Corporate
//           </Link>
//         </div>
//       )}
//     </div>

//     <Link to="/Contact" className="block text-base font-medium py-2 px-3 rounded-lg hover:bg-white/10 transition">
//       Contact
//     </Link>

//     <div className="pt-3 border-t border-white/10">
//       <SignedOut>
//         <SignInButton />
//       </SignedOut>
//       <SignedIn>
//         <UserButton />
//       </SignedIn>
//     </div>
//   </div>
// )}
// {/* ##########################################################################################################################3 */}
//         </div>
//       </section>


//       {/* ---------------------------- */}

//      <section>
//        {/* ================= HERO CONTENT ================= */}
//           <div className="flex flex-col flex-grow items-center justify-center text-center px-4">

//             <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
//               PlantFashion
//             </h1>

//             <p className="max-w-2xl text-base sm:text-lg md:text-xl text-white/90 mt-4">
//               Bringing nature closer to your lifestyle with elegant indoor plant setups,
//               stunning decorations, and customized botanical designs for events, homes,
//               and workspaces.
//             </p>

//             <div className="flex flex-wrap gap-4 mt-8 justify-center">
//               <Link
//                 to="/About"
//                 className="px-6 py-3 bg-white text-gray-900 font-medium rounded-xl hover:scale-105 transition"
//               >
//                 Learn More
//               </Link>

//               <Link
//                 to="/Contact"
//                 className="px-6 py-3 border border-white text-white font-medium rounded-xl hover:bg-white/10 transition"
//               >
//                 Contact Us
//               </Link>
//             </div>

//           </div>
//      </section>

//     </>
//   );
// };

// export default HomePreview;












// import { Link } from "react-router-dom";
// import Navbar from "./Navbar";








// import HomeNav from "./HomeNav";
// import HeroContent from "./HeroContent";

// const HomePreview = () => {
//   return (
//     <>
//        <div className="flex flex-col min-h-screen">
//        {/* <HomeNav /> */}
//        <HeroContent  />
// </div>


//     </>
//   )
// }

// export default HomePreview;