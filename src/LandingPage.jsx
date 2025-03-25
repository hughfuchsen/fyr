import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ArtistGrid from "./ArtistGrid";

export default function LandingPage() {
  const [expandedArtist, setExpandedArtist] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState("/background_image_fyr.jpg");
  const [addMarginTop, setAddMarginTop] = useState(false);

  const backgroundRef = useRef(null);
  const enterButtonRef = useRef(null);

  // Handle responsive background image
  useEffect(() => {
    if (typeof window === "undefined") return;
  
    const handleResize = () => {
      setBackgroundImage(window.innerWidth < 460 ? "/background_image_fyr3.jpg" : "/background_image_fyr.jpg");
      setAddMarginTop(window.innerWidth < 460);
    };
  
    handleResize();
    window.addEventListener("resize", handleResize);
  
    return () => window.removeEventListener("resize", handleResize);
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
        <img className="background-image" src={backgroundImage} alt="Background" 
          style={{ marginTop: addMarginTop ? "7em" : "0" }}
        />
        <motion.div
          ref={enterButtonRef}
          className="enter-site-button"
          onClick={() => window.scrollTo({ top: backgroundRef.current.scrollHeight, behavior: "smooth" })}
        >
          ↓ Artists ↓
        </motion.div>
      </div>

      <hr style={{ marginTop: addMarginTop ? "20em" : "5em" }} />
      {/* Artists Section */}
      <ArtistGrid setExpandedArtist={setExpandedArtist} />
    </>
  );
}
