import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface CardImageParallaxProps {
  src: string;
  alt?: string;
}

const CardImageParallax = ({ src, alt }: CardImageParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // subtle parallax (safe for mobile)
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={ref} className="relative h-44 sm:h-48 overflow-hidden">
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="
          absolute inset-0
          h-[120%] w-full
          object-cover
          will-change-transform
        "
      />
    </div>
  );
};

export default CardImageParallax;
