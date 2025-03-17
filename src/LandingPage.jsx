import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./LandingPage.css";
import artists from './artists.js';


export default function LandingPage() {
  const [showArtists, setShowArtists] = useState(false);

  // Reference for the section you want to scroll to
  const artistSectionRef = useRef(null);

  useEffect(() => {
    const handleEnterSite = () => {
      if (window.scrollY > 200) {
        setShowArtists(true);
      } else if (window.scrollY === 0) {
        setShowArtists(false);
      }
    };
  
    window.addEventListener("scroll", handleEnterSite, { passive: true });
  
    return () => window.removeEventListener("scroll", handleEnterSite);
  }, []);

  // Function to handle scrolling to the artist section
  const handleScrollToArtists = () => {
    if (artistSectionRef.current) {
      artistSectionRef.current.scrollIntoView({
        behavior: "smooth", // Smooth scroll effect
        block: "start",     // Aligns the target div at the top of the screen
        inline: "nearest",  // Ensures it doesn't scroll horizontally
      });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div
        className="landing-page-container"
        // style={{ backgroundImage: "url('/background_image_fyr.jpg')" }}
      >
        <img
         className="background-image"
         src="/background_image_fyr.jpg" 
         alt="Background Image" 
        />
        <motion.div
          animate={{ y: [5, -5, 5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="enter-site-button"
          onClick={handleScrollToArtists}  // Add the click handler here
        >
          ↓ Artists/Enter ↓
        </motion.div>
      </div>

      {/* Artists Section */}
      <div ref={artistSectionRef}>
        <div className="artist-container">
          {artists.map((artist, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={showArtists ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="artist-block"
            >
              <img
                src={artist.image}
                alt={artist.name}
                className="artist-image"
              />
              <h3>{artist.name}</h3>
              <p>{artist.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
