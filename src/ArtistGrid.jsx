import React, { useState, useEffect, useRef } from "react";
import artists from "./artists";

const ArtistGrid = () => {
    const [selectedArtist, setSelectedArtist] = useState(null);
    const modalRef = useRef(null);

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
                    <p>{artist.name}</p>
                </div>
            ))}

            {selectedArtist && (
                <div className="expanded-artist-overlay">
                    <div ref={modalRef} className="expanded-artist-modal">
                        <img src="/box_template.jpg" className="box-template" alt="Background"/>
                            <div style={{ 
                                    margin: "0 auto"  
                                }} >
                                <button onClick={handleClose} className="close-button">×</button>
                                <h2>{selectedArtist.name}</h2>

                                <img 
                                style={{ 
                                    maxWidth: "80%", 
                                    maxHeight: "90vh", 
                                    objectFit: "contain",  
                                    display: "inline-block", /* Ensures inline centering */
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
