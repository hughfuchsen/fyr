import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ArtistGrid from "./ArtistGrid";

export default function LandingPage() {
  const [expandedArtist, setExpandedArtist] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState("/background_image_fyr.jpg");

  const backgroundRef = useRef(null);
  const enterButtonRef = useRef(null);

  // Handle responsive background image
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setBackgroundImage("/background_image_fyr3.jpg"); // Change to your mobile image path
      } else {
        setBackgroundImage("/background_image_fyr.jpg");
      }
    };

    handleResize(); // Call once to set the initial state
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    document.body.style.overflow = expandedArtist ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [expandedArtist]);

  return (
    <>
      {/* Hero Section */}
      <div className="landing-page-container" ref={backgroundRef}>
        <img className="background-image" src={backgroundImage} alt="Background" />
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
