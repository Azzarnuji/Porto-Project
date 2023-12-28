import { useEffect, useRef, useState } from "react";
import { useIsVisible } from "../Hooks/useIsVisible";
import About from "./About";
import Experience from "./Experience";
import Projects from "./Projects";
const Content: React.FC | any = ({ callback, scrollPosition }: { callback: Function; scrollPosition: Function }) => {
    const content = useRef<any>(null);
    const section: any = {
        1: useRef(null),
        2: useRef(null),
        3: useRef(null)
    };
    const isVisible = {
        sectionOne: {
            isVisible: useIsVisible(section[1])
        },
        sectionTwo: {
            isVisible: useIsVisible(section[2])
        },
        sectionThree: {
            isVisible: useIsVisible(section[3])
        }
    };
    useEffect(() => {
        // callback(isVisible);
        callback({
            sectionOne: {
                positionX: section[1].current.getBoundingClientRect().x,
                positionY: section[1].current.getBoundingClientRect().y
            },
            sectionTwo: {
                positionX: section[2].current.getBoundingClientRect().x,
                positionY: section[2].current.getBoundingClientRect().y
            },
            sectionThree: {
                positionX: section[3].current.getBoundingClientRect().x,
                positionY: section[3].current.getBoundingClientRect().y - 100
            }
        });
        // console.log(document.getElementById("content")?.getBoundingClientRect().y);
    }, [content]);
    return (
        <>
            {/* {console.log(content?.current?.getBoundingClientRect().y)} */}
            <main id="content" className="pt-24 lg:w-1/2 lg:py-24 font-sans" ref={content}>
                <section id="about" ref={section[1]} className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label="About me">
                    <About />
                </section>
                <section
                    id="experience"
                    ref={section[2]}
                    className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
                    aria-label="Work experience">
                    <Experience />
                </section>
                <section
                    id="projects"
                    ref={section[3]}
                    className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
                    aria-label="Selected projects">
                    <Projects />
                </section>

                <footer className="max-w-md pb-16 text-sm text-slate-500 sm:pb-0">
                    <p>
                        Loosely designed in{/* */}
                        <a
                            href="https://www.figma.com/"
                            className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300"
                            target="_blank"
                            rel="noreferrer">
                            Figma
                        </a>
                        {/* */}and coded in{/* */}
                        <a
                            href="https://code.visualstudio.com/"
                            className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300"
                            target="_blank"
                            rel="noreferrer">
                            Visual Studio Code
                        </a>
                        {/* */}by yours truly. Built with{/* */}
                        <a
                            href="https://nextjs.org/"
                            className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300"
                            target="_blank"
                            rel="noreferrer">
                            Next.js
                        </a>
                        {/* */}and{/* */}
                        <a
                            href="https://tailwindcss.com/"
                            className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300"
                            target="_blank"
                            rel="noreferrer">
                            Tailwind CSS
                        </a>
                        , deployed with{/* */}
                        <a
                            href="https://vercel.com/"
                            className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300"
                            target="_blank"
                            rel="noreferrer">
                            Vercel
                        </a>
                        . All text is set in the{/* */}
                        <a
                            href="https://rsms.me/inter/"
                            className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300"
                            target="_blank"
                            rel="noreferrer">
                            Inter
                        </a>
                        {/* */}typeface.
                    </p>
                </footer>
            </main>
        </>
    );
};

export default Content;
