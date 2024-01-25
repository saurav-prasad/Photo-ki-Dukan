import { ArrowUpFromDot } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Slide } from 'react-awesome-reveal';

function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show the button when the user scrolls down to a certain height
            const threshold = 500;
            const currentScrollY = window.scrollY;

            setIsVisible(currentScrollY > threshold);
        };

        // Add the scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener when the component is unmounted
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Use smooth scrolling
        });
    };

    return (
        <>
            {isVisible &&
                <Slide Slide direction='up' duration={200}>
                    <div
                        className={`cursor-pointer scroll-to-top-button rounded-full p-2 bg-[#fdcfcf] border-[4px] border-[#ff4747]`}
                        onClick={scrollToTop}
                    >
                        <ArrowUpFromDot className='text-[#000000]' size={30} />
                    </div>
                </Slide>
            }
        </>
    )
}

export default ScrollToTop