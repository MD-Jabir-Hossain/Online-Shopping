import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useEffect, useRef } from "react";
import NewsletterPopup from "./NewsletterPopupNewsletterPopup";

const Layout = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.8; 
        }
    }, []);

    return (
        <div className="relative min-h-screen">
            
            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="fixed top-0 left-0 w-full h-full object-cover z-0"
            >
                <source src="/videos/1730393-uhd_3840_2160_25fps.mp4" type="video/mp4" />
            </video>

    
            <div className="fixed inset-0 bg-gradient-to-b from-black/70 to-black/30 z-1"></div>

            
            <div className="relative z-10">
                
                <div className="sticky top-0 z-50 w-full">
                    <Navbar />
                </div>

                
                <main className="relative z-20 container mx-auto py-1 ">
                    <Outlet />
                </main>
            </div>
            
            <NewsletterPopup  />
        </div>
    );
};

export default Layout;