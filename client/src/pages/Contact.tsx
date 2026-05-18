import ContactForm from "@/components/ContactForm";
import FloatingButtons from "@/components/FloatingButtons";
import Footer from "@/components/Footer";

import CountUp from "@/components/Countup";


const Contact = () => {
  return (
    <>      
      <section className="bg-white py-24" id="contact-page">
        <div className="max-w-7xl mx-auto px-6 md:px-20">

          {/* Heading */}
          <div className="mb-16">
            <p className="text-sm uppercase tracking-widest text-gray-500 mb-3">
              Get In Touch
            </p>
            <h2 className="text-4xl md:text-5xl font-bold">
              Contact Us
            </h2>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="bg-gray-100 p-8 text-center shadow-sm">
              <h4 className="font-semibold mb-2">Email</h4>
              <p className="text-gray-600">plantfashion@gmail.com</p>
            </div>

            <div className="bg-gray-100 p-8 text-center shadow-sm">
              <h4 className="font-semibold mb-2">Phone</h4>
              <p className="text-gray-600">+91 98765 43210</p>
            </div>

            <div className="bg-gray-100 p-8 text-center shadow-sm">
              <h4 className="font-semibold mb-2">Location</h4>
              <p className="text-gray-600">
                Coimbatore, Tamil Nadu, India
              </p>
            </div>
          </div>

{/* <div className="absolute transform -scale-x-100 left-[-50] mt-90">
  <img src="/src/assets/lot2.png" alt="img" />
</div> */}

          {/* Form + Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Contact Form */}
            <div className="bg-gray-100 p-10 shadow-sm">
              <h3 className="text-2xl font-semibold mb-4">
                Let’s Plan Your Event
              </h3>
              <p className="text-gray-600 mb-8">
                Fill out the form and our team will contact you shortly.
              </p>

              <ContactForm />
            </div>

            {/* Map + Extra Content */}
            <div>
              {/* Map */}
              <div className="w-full h-[360px] mb-8 shadow-sm">
                <iframe
                  title="Google Map"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d503064.7675821068!2d78.1228236!3d9.9178369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1768159062063!5m2!1sen!2sin" width="600" height="450"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>

              {/* Trust Content */}
              <div className="bg-gray-100 p-10 shadow-sm">
                <h3 className="text-xl font-semibold mb-4">
                  Why Choose PlantFashion?
                </h3>

                <ul className="space-y-3 text-gray-600 mb-8">
                  <li>✔ 10+ years of expertise</li>
                  <li>✔ 500+ successful events</li>
                  <li>✔ Premium floral & stage décor</li>
                  <li>✔ Timely & stress-free execution</li>
                </ul>

                {/* <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <h4 className="text-2xl font-bold">500+</h4>
                    <p className="text-sm text-gray-500">Events</p>
                  </div>

                  <div>
                    <h4 className="text-2xl font-bold">10+</h4>
                    <p className="text-sm text-gray-500">Years</p>
                  </div>

                  <div>
                    <h4 className="text-2xl font-bold">100%</h4>
                    <p className="text-sm text-gray-500">Satisfaction</p>
                  </div>
                </div> */}

<div className="grid grid-cols-3 gap-6 text-center">
  <div>
    <h4 className="text-2xl font-bold">
      <CountUp end={500} suffix="+" />
    </h4>
    <p className="text-sm text-gray-500">Events</p>
  </div>

  <div>
    <h4 className="text-2xl font-bold">
      <CountUp end={10} suffix="+" />
    </h4>
    <p className="text-sm text-gray-500">Years</p>
  </div>

  <div>
    <h4 className="text-2xl font-bold">
      <CountUp end={100} suffix="%" />
    </h4>
    <p className="text-sm text-gray-500">Satisfaction</p>
  </div>
</div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Floating WhatsApp + Call */}
      <FloatingButtons />

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Contact;
