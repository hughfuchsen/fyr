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
                    <img src={artist.image} alt={artist.name} className="artist-image"  />
                    <p style={{fontSize:"16px",  margin: "0", marginBottom: "1rem"}} >{artist.name}</p>
                </div>
            ))}

            {selectedArtist && (
                <div className="expanded-artist-overlay">
                    <div ref={modalRef} className="expanded-artist-modal">
                        {/* Only render the box-template when it's preloaded */}
                        {isBoxTemplateLoaded && (
                            <div className="box-template" alt="Background"></div>
                        )}
                        <div>
                            <button onClick={handleClose} className="close-button">×</button>
                            <div className="selected-artist-name">{selectedArtist.name}</div>
                            <img 
                                className="modal-image"
                                src={selectedArtist.image} 
                                alt={selectedArtist.name} 
                            />

                            <p className="artist-bio-text">{selectedArtist.bio}</p>

                            {selectedArtist.website !== "null" && (
                            <a href={selectedArtist.website} target="_blank" rel="noopener noreferrer">
                                Website
                            </a>
                            )}

                            {/* Only show merch link if it's not "null" */}
                            {selectedArtist.productLink !== "null" && (
                            <a href={selectedArtist.productLink} target="_blank" rel="noopener noreferrer">
                                Merch
                            </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArtistGrid;
