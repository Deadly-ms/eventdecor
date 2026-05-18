import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronDown, Menu, X, ChevronRight, Settings, LogIn} from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";

// import PageTransition from "@/animation/PageTransition";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);


  const { user } = useUser();
  const role = (user?.publicMetadata as { role?: string })?.role;
// ########################################################################
  const closeMenus = () => {
  setMenuOpen(false);
  setServiceOpen(false);
};

  const location = useLocation();
useEffect(() => {
  closeMenus();
}, [location.pathname]);

// ###################################################################
  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-black/40 backdrop-blur-md px-6 md:px-20 py-4">
      <div className="flex justify-between items-center text-sm tracking-wide">

        {/* ✅ LOGO */}
        <h1 className="text-xl font-semibold text-white">PlantFashion</h1>

        {/* ✅ DESKTOP MENU */}
        <ul className="hidden md:flex gap-6 items-center text-white font-medium">
          <li>
            <Link className="hover:text-gray-300 transition" to="/" onClick={closeMenus}>Home</Link>
          </li>
          <li>
            <Link className="hover:text-gray-300 transition" to="/About" onClick={closeMenus}>About</Link>
          </li>
          <li>
            <Link className="hover:text-gray-300 transition" to="/Gallery" onClick={closeMenus}>Gallery</Link>
          </li>

          {/* ✅ SERVICE DROPDOWN */}
          <li className="relative group">
                <button className="flex items-center gap-1">
                  Service
                  <ChevronDown className="size-4 transition-transform group-hover:rotate-180" />
                </button>

               <div className="absolute left-0 right-0 h-10 group-hover:block"></div>
                <div
            className="
            text-black
              absolute
              opacity-0
              pointer-events-none
              group-hover:opacity-100
              group-hover:pointer-events-auto
              mt-5 w-80 bg-white shadow-lg rounded-lg border
              transition-opacity duration-200
            "
          >
          <ul className="text-sm">
            <div className="p-4 border-b">
              <Link to="/services">
                <div className="flex items-center justify-between">
                 <h1 className="text-xl font-semibold">Our services</h1>
                  <ChevronRight className="size-5 text-gray-400" />
                   </div>
                    </Link>
               <p className="text-gray-500 text-xs">We design the moments you’ll remember forever.</p>
            </div>

              <li><Link to="/services/wedding"className="block px-4 py-2 hover:bg-gray-100 rounded-lg">Wedding</Link></li>
              <li><Link to="/services/birthday" className="block px-4 py-2 hover:bg-gray-100 rounded-lg">Birthday</Link></li>
              <li><Link to="/services/party" className="block px-4 py-2 hover:bg-gray-100 rounded-lg">Party</Link></li>
              <li><Link to="/services/corporate" className="block px-4 py-2 hover:bg-gray-100 rounded-lg">Corporate</Link></li>
          </ul>
        </div>
              </li>

          <li><Link className="hover:text-gray-300 transition" to="/Contact" onClick={closeMenus}>Contact</Link></li>

     {role === "admin" && (
  <li>
    <Link
      to="/admin"
      onClick={closeMenus}
      className="hover:text-gray-300 transition flex items-center gap-1">
       <Settings className="size-5" />
      Admin Panel
    </Link>
  </li>
)}

          {/* <li>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </li> */}

          <li>
  <SignedOut>
    <SignInButton mode="modal">
      <button className="flex items-center gap-2 bg-white/90 text-black px-4 py-1 rounded-sm shadow cursor-pointer hover:scale-105 transition">
        <LogIn size={16} />
        Sign In
      </button>
    </SignInButton>
  </SignedOut>

  <SignedIn>
    <UserButton />
  </SignedIn>
</li>
        </ul>

        {/* ✅ MOBILE TOGGLE */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* ✅ MOBILE MENU */}
     {menuOpen && (
        <div
          className="
            md:hidden
            mt-4
            rounded-2xl
            border border-white/20
            bg-white/20
            backdrop-blur-xl
            shadow-2xl
            p-5
            space-y-4
            text-white
            animate-in
            slide-in-from-top-3
            duration-300
          "
        >
    <Link to="/" className="block font-medium py-2 px-3 rounded-lg hover:bg-white/10 transition">
      Home
    </Link>

    <Link to="/About" className="block text-base font-medium py-2 px-3 rounded-lg hover:bg-white/10 transition">
      About
    </Link>

    <Link to="/Gallery" className="block text-base font-medium py-2 px-3 rounded-lg hover:bg-white/10 transition">
      Gallery
    </Link>

    {/* Mobile Service Dropdown */}
    <div className="rounded-lg overflow-hidden border border-white/10">
      <button
        className="flex justify-between items-center w-full py-2 px-3 font-medium hover:bg-white/10 transition"
        onClick={() => setServiceOpen(!serviceOpen)}
      >
        <div>
          <Link to="/services"><span>Service</span></Link>
        </div>
        {/* <span>Service</span> */}
        <ChevronDown
          className={`transition-transform duration-300 ${serviceOpen ? "rotate-180" : ""}`}
        />
      </button>

      {serviceOpen && (
        <div className="bg-white/5 space-y-2 p-3">
          <Link to="/services/wedding" className="block px-2 py-1 rounded hover:bg-white/10 transition">
            Wedding
          </Link>
          <Link to="/services/birthday" className="block px-2 py-1 rounded hover:bg-white/10 transition">
            Birthday
          </Link>
          <Link to="/services/party" className="block px-2 py-1 rounded hover:bg-white/10 transition">
            Party
          </Link>
          <Link to="/services/corporate" className="block px-2 py-1 rounded hover:bg-white/10 transition">
            Corporate
          </Link>

          <Link
              to="/services"
              className="flex items-center justify-between px-4 py-2 rounded-lg hover:bg-white/10 transition"
            >
              <span>Services</span>
              <ChevronRight className="size-5 text-gray-400" />
            </Link>

        </div>
      )}
    </div>

    <Link to="/Contact" className="block text-base font-medium py-2 px-3 rounded-lg hover:bg-white/10 transition">
      Contact
    </Link>

    {/* <div className="pt-3 border-t border-white/10">
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div> */}


    <div className="flex ms-3 border-t border-white/10">

    <div className="pt-3 border-t border-white/10">
        <SignedOut>
    <SignInButton mode="modal">
      <button className="flex items-center gap-2 bg-white/10 text-white px-4 py-1 rounded-lg shadow cursor-pointer">
        <LogIn size={16} />
        Sign In
      </button>
    </SignInButton>
        </SignedOut>
  <SignedIn>
    <UserButton />
  </SignedIn>
    </div>

     {role === "admin" && (
  <Link to="/admin" className="block text-base font-medium mt-1 py-2 px-5 rounded-lg transition flex items-center gap-1">
    <Settings className="size-5" />
    Admin
  </Link>
)}
</div>




  </div>
)}
    </nav>
  );
};

export default Navbar;
