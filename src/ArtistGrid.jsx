import React, { useState, useEffect, useRef } from "react";
import artists from "./artists";

const ArtistGrid = () => {
    const [selectedArtist, setSelectedArtist] = useState(null);
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
    };

    const handleClose = () => {
        setSelectedArtist(null);
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

    return (
        
        <div className="artist-container">
            {artists.map((artist, index) => (
                <div 
                    key={index} 
                    className="artist-block"
                    onClick={() => handleArtistClick(artist)}
                >
                    <img src={artist.image} alt={artist.name} className="artist-image"  />
                    <p style={{fontSize:"16px"}} >{artist.name}</p>
                </div>
            ))}

            {selectedArtist && (
                <div className="expanded-artist-overlay">
                    <div ref={modalRef} className="expanded-artist-modal">
                        {/* Only render the box-template when it's preloaded */}
                        {isBoxTemplateLoaded && (
                            <div className="box-template" alt="Background"></div>
                        )}
                        <div style={{ margin: "20px auto" }}>
                            <button onClick={handleClose} className="close-button">×</button>
                            <p style={{fontSize: "1rem"}} >{selectedArtist.name}</p>

                            <img 
                                style={{ 
                                    maxWidth: "40%",  
                                    objectFit: "contain",  
                                    display: "inline-block",
                                    margin: "0 auto"  
                                }} 
                                src={selectedArtist.image} 
                                alt={selectedArtist.name} 
                            />

                            <p>{selectedArtist.bio}</p>

                            <a href={selectedArtist.link} target="_blank" rel="noopener noreferrer">
                                Website
                            </a>
                            <a href={selectedArtist.link} target="_blank" rel="noopener noreferrer">
                                Merch
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArtistGrid;
