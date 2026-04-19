import {useEffect, useState} from "react";

export const useScrollPosition = () => {
    const [position, setPosition] = useState({
        isTop: true,
        isBottom: false,
    });

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;

            const isTop = scrollTop < 50;
            const isBottom = scrollTop + windowHeight >= docHeight - 50;

            setPosition({isTop, isBottom});
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return position;
}
