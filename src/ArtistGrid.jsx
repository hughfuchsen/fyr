import React, { useState, useEffect, useRef } from "react";
import artists from "./artists";

const ArtistGrid = () => {
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const modalRef = useRef(null);
    const [isBoxTemplateLoaded, setIsBoxTemplateLoaded] = useState(false);


    // Preload box-template image
    useEffect(() => {
        const img = new Image();
        img.src = "/box_template.jpg";
        img.onload = () => setIsBoxTemplateLoaded(true);
    }, []);

    const handleArtistClick = (artist) => {
        setSelectedArtist(artist);
        setCurrentImageIndex(0);
      };

    const handleClose = () => {
        setSelectedArtist(null);
    };


    const handleNext = () => {
        setCurrentImageIndex((prevIndex) =>
          (prevIndex + 1) % selectedArtist.images.length
        );
      };
      
      const handlePrev = () => {
        setCurrentImageIndex((prevIndex) =>
          (prevIndex - 1 + selectedArtist.images.length) % selectedArtist.images.length
        );
      };
      

    // Close when clicking outside the modal
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                handleClose();
            }
        };

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                handleClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    useEffect(() => {
        if (selectedArtist) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [selectedArtist]);


    return (
        
        <div className="artist-container">
            {artists.map((artist, index) => (
                <div 
                    key={index} 
                    className="artist-block"
                    onClick={() => handleArtistClick(artist)}
                >
                    <img src={artist.images[0]} alt={artist.name} className="artist-image"  />
                    <p style={{fontSize:"1rem",  margin: "0", marginBottom: "1rem"}} >{artist.name}</p>
                </div>
            ))}


            {selectedArtist && (
            <div className="expanded-artist-overlay">
                
                
                <div ref={modalRef} className="expanded-artist-modal">
                {isBoxTemplateLoaded && (<div className="box-template" alt="Background"></div>)}


                    <button onClick={handleClose} className="close-button">×</button>
                   

                    <div className="modal-content">
                        <div className="selected-artist-name-container">
                            <div className="selected-artist-name">{selectedArtist.name}</div>
                        </div>

                        {/* <div className="modal-image-container">
                            <img className="modal-image" src={selectedArtist.image} alt={selectedArtist.name} />
                        </div> */}

                        <div className="modal-image-container">
                            <div className="modal-image-wrapper">
                                <img 
                                src={selectedArtist.images[currentImageIndex]} 
                                alt={selectedArtist.name} 
                                className="modal-image"
                                />
                                {selectedArtist.images.length > 1 && (
                                <button onClick={handlePrev}>«</button>
                                )}
                                {selectedArtist.images.length > 1 && (
                                <button onClick={handleNext}>»</button>
                                )}
                            </div>
                        </div>

                        <div className="bio-section">
                        {selectedArtist.bio.split('\n\n').map((para, i) => (
                            <p key={i}>{para}</p>
                        ))}
                        </div>

                        <div className="modal-link-container">
                        {selectedArtist.website !== "null" && (
                            <a href={selectedArtist.website} className="modal-link" target="_blank" rel="noopener noreferrer">
                            Website
                            </a>
                        )}

                        {selectedArtist.productLink !== "null" && (
                            <a href={selectedArtist.productLink} className="modal-link" target="_blank" rel="noopener noreferrer">
                            Merch
                            </a>
                        )}
                    </div>

                    {/* <div className="modal-footer-container"></div> */}

                    </div>
                   
                </div>
            </div>
            )}
        </div>
    );
};

export default ArtistGrid;
