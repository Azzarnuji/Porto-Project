import React, { useState, useEffect } from "react";

function useIsVisible(ref: React.RefObject<any>) {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIntersecting(entry.isIntersecting);
        });

        if (ref.current) {
            observer.observe(ref.current);

            return () => {
                observer.disconnect();
            };
        }
    }, [ref]);

    return isIntersecting;
}

export { useIsVisible };
