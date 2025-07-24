import { useState, useEffect, useRef } from "react";
import ArtistGrid from "./ArtistGrid";
import Footer from "./Footer";
// import TourDates from "./TourDates";


export default function LandingPage() {
  const [expandedArtist, setExpandedArtist] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState("/flippinYeahSign.jpg");
  const backgroundRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);



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



  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1200); // adjust duration to suit your content load time

    return () => clearTimeout(timeout);
}, []);

useEffect(() => {
  function onScroll() {
    if (window.scrollY > 40 && showOverlay && !fadeOut) {
      // Trigger fade out animation once scrolled past 30px
      setFadeOut(true);
      setTimeout(() => {
        setShowOverlay(false);
        setFadeOut(false);
      }, 500); // duration matches CSS transition
    }
  }

  window.addEventListener('scroll', onScroll);
  return () => window.removeEventListener('scroll', onScroll);
}, [showOverlay, fadeOut]);


function handleHideOverlay() {
  setFadeOut(true);
  // After animation duration, hide overlay completely
  setTimeout(() => {
    setShowOverlay(false);
    setFadeOut(false);
  }, 500); // match the CSS transition duration
}

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
      <div  className="landing-page-container" ref={backgroundRef}>
        <img className="background-image" src={backgroundImage} style={{ position: 'relative', zIndex: 10 }} alt="Background" />
      </div>

      {/* <hr className="performance-line-1" ref={lineRef}/> */}

      {/* Artists Section */}
      <p className={`landing-page-artist-text ${fadeOut ? 'fade-out' : ''}`}  onClick={() => handleHideOverlay()}>ARTISTS</p>
      
      {showOverlay && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: fadeOut ? 'rgba(255,255,255,0)' : 'rgba(255,255,255,0.6)',
            backdropFilter: fadeOut ? 'blur(0px)' : 'blur(8px)',
            WebkitBackdropFilter: fadeOut ? 'blur(0px)' : 'blur(8px)',
            transition: 'background-color 0.5s ease, backdrop-filter 0.5s ease',
            zIndex: 1,
            objectFit: 'contain',
          }}
          onClick={() => handleHideOverlay()}
        />
      
      )}
      <ArtistGrid style={{zIndex: -1,}} setExpandedArtist={setExpandedArtist} />

      {/* <TourDates/> */}

      <Footer/>
    </>

  );
}
