export type Service = {
  slug: string;
  title: string;
  description: string;
  heroImage: string;
  gallery: string[];
  features: string[];
};

export const services: Service[] = [
  {
    slug: "wedding",
    title: "Wedding Decoration",
    description:
      "Elegant wedding stage décor, mandap setups, floral arrangements, lighting & premium themes.",
    heroImage: "/wedding.jpg",
    gallery: ["/wedding1.jpg", "/wedding2.jpg", "/wedding3.jpg"],
    features: [
      "Wedding Stage Decoration",
      "Mandap Decoration",
      "Floral Arrangements",
      "Premium Lighting",
      "Entrance & Walkway Decor",
      "Reception Setup",
    ],
  },

  {
    slug: "birthday",
    title: "Birthday Party Decoration",
    description:
      "Colorful balloon decoration, kids themes, surprise party setups & customized designs.",
    heroImage: "/birthday.jpg",
    gallery: ["/birthday1.jpg", "/birthday2.jpg", "/birthday3.jpg"],
    features: [
      "Balloon Decoration",
      "Kids Theme Setup",
      "Backdrop Decoration",
      "Cake Table Setup",
      "Lighting & Props",
    ],
  },

  {
    slug: "party",
    title: "Party Decoration",
    description:
      "House parties, DJ nights, bachelor parties with modern lighting and themes.",
    heroImage: "/party.jpg",
    gallery: ["/party1.jpg", "/party2.jpg", "/party3.jpg"],
    features: [
      "Theme Party Setup",
      "DJ Lighting",
      "Stage Decoration",
      "Photo Booth Setup",
    ],
  },

  {
    slug: "corporate",
    title: "Corporate Event Decoration",
    description:
      "Professional decoration for conferences, product launches & office events.",
    heroImage: "/corporate.jpg",
    gallery: ["/corporate1.jpg", "/corporate2.jpg", "/corporate3.jpg"],
    features: [
      "Stage Branding",
      "Conference Setup",
      "LED Screens",
      "Product Launch Decoration",
    ],
  },
];
