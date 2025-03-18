import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./LandingPage.css";
import artists from './artists.js';

export default function LandingPage() {
  const [showArtists, setShowArtists] = useState(false);
  const backgroundRef = useRef(null); // Reference for background image
  const artistSectionRef = useRef(null);
  const enterButtonRef = useRef(null);

  useEffect(() => {
    const handleEnterSite = () => {
      console.log(window.scrollY);
      if (window.innerWidth >= 1200)
      {
        if (window.scrollY > (window.innerHeight*0.8)) {
          setShowArtists(true);
        } else if (window.scrollY < 100) {
          setShowArtists(false);
        }
      }
      else
      {
        if (window.scrollY > 200) {
          setShowArtists(true);
        } else if (window.scrollY < 100) {
          setShowArtists(false);
        }
      }

    };

    window.addEventListener("scroll", handleEnterSite, { passive: true });

    return () => window.removeEventListener("scroll", handleEnterSite);
  }, []);

  // Auto-scroll to the bottom of the background image on page load (desktop only)
  useEffect(() => {
    if (backgroundRef.current) {
      setTimeout(() => {
        window.scrollTo({
          top: backgroundRef.current.offsetHeight - (window.innerHeight + 25),
          behavior: "smooth",
        });
      }, 200); // Small delay to ensure rendering is complete
    }
  }, []);

  // Function to handle scrolling to the artist section
  const handleScrollToArtists = () => {
    if (enterButtonRef.current) {
      enterButtonRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="landing-page-container" ref={backgroundRef}>
        <img
          className="background-image"
          src="/background_image_fyr.jpg"
          alt="Background Image"
        />
        <motion.div
          ref={enterButtonRef}
          style={showArtists ? {cursor: "default"} : {display: "inline-block", cursor: "pointer"}}
          animate={showArtists ? {opacity: 0} : { opacity: 0.9, y: [5, -5, 5] }}
          transition={showArtists ? {repeat: 0,  duration: 0.5 } : { repeat: 0, duration: 0.5 }}
          className="enter-site-button"
          onClick={handleScrollToArtists}
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
              <h5>{artist.name}</h5>
              <p>{artist.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
