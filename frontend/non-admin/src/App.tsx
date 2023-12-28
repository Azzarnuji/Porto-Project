import { useEffect, useState } from "react";
import Side from "./Components/Side";
import Content from "./Components/Content";
import ISide from "./Interfaces/SideInterface";
import Api from "./Helpers/Api";
import GetSubdomain from "./Helpers/GetSubdomain";

function App() {
    const [getSectionPosisition, setSectionPosisition] = useState<any>();
    const [scrollPosition, setScrollPosition] = useState<number>(0);
    const [getActiveClass, setActiveClass] = useState<ISide>({
        about: false,
        experience: false,
        projects: false
    });
    const [getPointer, setPointer] = useState<Record<string, number>>({
        pointerX: 0,
        pointerY: 0
    });

    const [getDataPortofolio, setDataPortofolio] = useState<any>();
    const handleScroll: EventListener = () => {
        // const position = window.screenTop;
        const position: number = window.scrollY;
        setScrollPosition(position);
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]);

    const getDataPorto = async () => {
        const response = await Api.get({
            url: import.meta.env.VITE_API_BASE_URL + "portofolio/getDataBySlug",
            params: {
                slug: btoa(GetSubdomain())
            }
        });
        setDataPortofolio(response?.data.items);
    };
    useEffect(() => {
        getDataPorto();
    }, []);
    useEffect(() => {
        if (
            scrollPosition > getSectionPosisition?.sectionOne.positionY &&
            scrollPosition <= getSectionPosisition?.sectionTwo.positionY
        ) {
            setActiveClass({
                about: true,
                experience: false,
                projects: false
            });
        } else if (
            scrollPosition > getSectionPosisition?.sectionTwo.positionY &&
            scrollPosition < getSectionPosisition?.sectionThree.positionY
        ) {
            setActiveClass({
                about: false,
                experience: true,
                projects: false
            });
        } else if (scrollPosition > getSectionPosisition?.sectionTwo.positionY) {
            setActiveClass({
                about: false,
                experience: false,
                projects: true
            });
        } else {
            setActiveClass({
                about: true,
                experience: false,
                projects: false
            });
        }
    }, [getSectionPosisition, scrollPosition]);

    return (
        <>
            <div
                className="pointer-events-none !fixed inset-0 z-50 transition duration-300 lg:absolute "
                style={{
                    background: `radial-gradient(600px circle at ${getPointer.pointerX}px ${getPointer.pointerY}px ,rgba(29, 78, 216, 0.15),transparent 80%)`
                }}
            />

            <div
                className="container mx-auto h-screen w-screen font-sans"
                onMouseMove={(e) => setPointer({ pointerX: e.clientX, pointerY: e.clientY })}>
                <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
                    <a
                        href="#content"
                        className="absolute left-0 top-0 block -translate-x-full rounded bg-gradient-to-br from-teal-400 via-blue-500 to-purple-600 px-4 py-3 text-sm font-bold uppercase tracking-widest text-white focus-visible:translate-x-0">
                        Skip to Content
                    </a>
                    <div className="lg:flex lg:justify-between lg:gap-4">
                        <Side
                            activeClass={{ ...getActiveClass }}
                            dataPortofolio={getDataPortofolio}
                        />
                        <Content
                            callback={(result: any) => setSectionPosisition(result)}
                            dataPortofolio={getDataPortofolio}
                            // scrollPosition={(result: any) => setScrollPosition(result)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
