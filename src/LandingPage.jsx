import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ArtistGrid from "./ArtistGrid";

export default function LandingPage() {
  const [expandedArtist, setExpandedArtist] = useState(null);
  
  const backgroundRef = useRef(null);
  const enterButtonRef = useRef(null);

  // Handle scrolling on load
  useEffect(() => {
    if (backgroundRef.current) {
      setTimeout(() => {
        window.scrollTo({
          top: backgroundRef.current.offsetHeight - (window.innerHeight + 25),
          behavior: "smooth",
        });
      }, 200);
    }
  }, []);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (expandedArtist) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [expandedArtist]);

  return (
    <>
      {/* Hero Section */}
      <div className="landing-page-container" ref={backgroundRef}>
        <img className="background-image" src="/background_image_fyr.jpg" alt="Background Image" />
        <motion.div
          ref={enterButtonRef}
          className="enter-site-button"
          onClick={() => window.scrollTo({ top: backgroundRef.current.scrollHeight, behavior: "smooth" })}
        >
          ↓ Artists ↓
        </motion.div>
      </div>

      {/* Artists Section */}
      <ArtistGrid setExpandedArtist={setExpandedArtist} />
    </>
  );
}
