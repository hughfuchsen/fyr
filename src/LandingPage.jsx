import { useState, useEffect, useRef } from "react";
import ArtistGrid from "./ArtistGrid";
import Footer from "./Footer";
import TourDates from "./TourDates";


export default function LandingPage() {
  const [expandedArtist, setExpandedArtist] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState("/flippinYeahSign.jpg");
  const backgroundRef = useRef(null);
  const lineRef = useRef(null);

  // Handle responsive background image
  useEffect(() => {
    if (typeof window === "undefined") return;
  
    const handleResize = () => {
      setBackgroundImage(window.innerWidth < 460 ? "/flippinYeahSignPhone.jpg" : "/flippinYeahSign.jpg");
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
      }, 500);
    }
  }, []);

  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = expandedArtist ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [expandedArtist]);


  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1200); // adjust duration to suit your content load time

    return () => clearTimeout(timeout);
}, []);

  return (
    <>
      {isLoading && (
        <div className="loading-overlay">
          {/* <p style={{ marginTop: "1rem", fontSize: "0.8rem", color: "#444" }}>
            Loading...
          </p> */}
          <div className="loading-bar-container">
         
            <div className="loading-bar"></div>

          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="landing-page-container" ref={backgroundRef}>
        <img className="background-image" src={backgroundImage} alt="Background" />
      </div>

      <hr className="performance-line-1" ref={lineRef}/>

      {/* Artists Section */}
      <p style={{fontSize:"1.5em", textAlign: "center", display: "block"}}>ARTISTS</p>

      <ArtistGrid setExpandedArtist={setExpandedArtist} />

      {/* <TourDates/> */}

      <Footer/>
    </>

  );
}
