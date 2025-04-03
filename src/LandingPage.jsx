import { useState, useEffect, useRef } from "react";
import ArtistGrid from "./ArtistGrid";
import Footer from "./Footer";

export default function LandingPage() {
  const [expandedArtist, setExpandedArtist] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState("/flippinYeahSign.jpg");
  const backgroundRef = useRef(null);
  const lineRef = useRef(null);

  // Handle responsive background image
  useEffect(() => {
    if (typeof window === "undefined") return;
  
    const handleResize = () => {
      setBackgroundImage(window.innerWidth < 460 ? "/bflippinYeahSignPhone.jpg" : "/flippinYeahSign.jpg");
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
        <img className="background-image" src={backgroundImage} alt="Background" />
        {/* <motion.div
          ref={enterButtonRef}
          className="enter-site-button"
          onClick={() => lineRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
        >
          ↓ Artists ↓
        </motion.div> */}
      </div>

      <hr className="performance-line-1" ref={lineRef}/>
      {/* Artists Section */}
      <p
            style={{fontSize:"1.5em", textAlign: "center", display: "block"}}
                >ARTISTS</p>
      <ArtistGrid setExpandedArtist={setExpandedArtist} />
      <Footer/>
    </>

  );
}
