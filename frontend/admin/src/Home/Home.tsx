import { KeyboardEventHandler, useEffect, useRef, useState } from "react";
import SideIFrameContent from "../Types/SideIFrameContent";
import { ElementID } from "../Types/ElementID";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { renderToString } from "react-dom/server";
import CreatableSelect from "react-select/creatable";
import Api from "../Helpers/Api";
import React from "react";
import { getCookie } from "cookies-next";
import { HTTP_CREATED, HTTP_OK } from "../Constant/HttpCode";
import Alert from "../Components/Alert";
import ImageComp from "../Components/Image";
const Home: React.FC = () => {
    const [getElementsForm, setElementsForm] = useState<any>([]);
    const [getRandomId, setRandomId] = useState<any>({});
    const [getRandomProjectId, setRandomProjectId] = useState<any>({});
    const [getValueProjectsElement, setValueProjectsElement] = useState<any>({
        projects: [
            {
                id: {
                    projectNameId: "projectName",
                    projectDescriptionId: "projectDescription",
                    projectImageId: "projectImage",
                    tagId: "projectTag"
                },
                value: {
                    projectName: null,
                    projectDescription: null,
                    projectImage: null,
                    tag: []
                }
            }
        ]
    });
    const [getProfile, setProfile] = useState<any>();
    const [getValueInputProjectElement, setValueInputProjectElement] = useState<any>({});
    const [getValuesProfile, setValuesProfile]: any = useState<SideIFrameContent>({
        profile: {
            email: null,
            h1Name: null,
            h2Name: null,
            githubLink: null,
            instagramLink: null,
            linkedinLink: null,
            mottoProfile: null,
            twitterLink: null,
            about: null
        }
    });
    const [successAddNewData, setSuccessAddNewData] = useState<boolean>(false);
    const [getValuesExperience, setValuesExperience]: any = useState<any>({
        experience: [
            {
                id: {
                    startWorkId: "dateWork",
                    workCompanyId: "workCompany",
                    jobTitleId: "jobTitle",
                    descriptionJobId: "descriptionJob",
                    tagId: "tagId"
                },
                value: {
                    startWork: null,
                    workCompany: null,
                    jobTitle: null,
                    descriptionJob: null,
                    tag: []
                }
            }
        ]
    });
    const [getPortoData, setPortoData]: any = useState<any>();
    const [showIframe, setIframe] = useState<boolean>(false);
    const iframeRef = useRef(null);
    const [getValuesProjects, setValuesProjects]: any = useState<any>({});
    const [getValuesTag, setValuesTag] = useState<any>([]);
    const style: any = {
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: "100%",
        height: "100%",
        border: "none",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        zIndex: "100"
    };
    const token: string | null = getCookie("token") ?? null;
    const changeValueProfile = (idElement: ElementID, value: any) => {
        setValuesProfile({
            profile: {
                ...getValuesProfile.profile,
                [idElement]: value,
                h1Name: getProfile?.name,
                email: getProfile?.email
            }
        });
        const element: any = iframeRef.current;
        element.contentWindow.document.getElementById(idElement).textContent = value;
    };
    const changeValueExperience = (idElement: ElementID | any, valueText: any, index: any = null) => {
        const element: any = iframeRef.current;
        element.contentWindow.document.getElementById(idElement).textContent = valueText;
    };

    const changeValueProjects = (idElement: ElementID | any, valueText: any, index: any = null) => {
        console.log(idElement);

        const element: any = iframeRef.current;
        element.contentWindow.document.getElementById(idElement).textContent = valueText;
    };
    const getAllData = () => {
        const projects = {
            profile: getValuesProfile.profile,
            experience: getValuesProjects,
            project: getValueInputProjectElement,
            randomProjectId: getRandomProjectId
        };
        const requestData = {
            data: {
                profile: getValuesProfile.profile,
                experience: getValuesProjects,
                project: getValueInputProjectElement
            }
        };
        console.log(requestData);
    };
    const sendData = async () => {
        const requestData = {
            data: {
                profile: getValuesProfile.profile,
                experience: getValuesProjects,
                project: getValueInputProjectElement
            }
        };
        const request = await Api.post({
            url: import.meta.env.VITE_API_BASE_URL + "portofolio/addNewData",
            data: requestData
        });
        if (request.httpCode == HTTP_CREATED) {
            Alert.confirmable({
                options: {
                    title: "Success!",
                    text: "Your data has been saved!"
                },
                callback: (result) => {
                    if (result.isConfirmed) {
                        setSuccessAddNewData(true);
                    }
                }
            });
        }
        console.log(request);
    };
    const changeValueLinkProfile = (idElement: ElementID, value: any) => {
        setValuesProfile({
            profile: {
                ...getValuesProfile.profile,
                [idElement]: value
            }
        });
        const element: any = iframeRef.current;
        element.contentWindow.document.getElementById(idElement).href = value;
    };
    const generateRandomId = () => {
        setRandomId({
            idOne: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
            idTwo: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
            idThree: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
            idFour: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
            idFive: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        });
    };
    const generateRandomIdElementProject = () => {
        setRandomProjectId({
            idOne: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
            idTwo: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
            idThree: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
            idFour: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
            idFive: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        });
    };
    const generateElementView = (randomId: any, data?: any) => {
        return (
            <>
                <li className="mb-12">
                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />
                        <header
                            className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2"
                            aria-label="2018 to Present"
                            id={randomId.idOne}
                            key={randomId.idOne}>
                            2018 - Present
                        </header>
                        <div className="z-10 sm:col-span-6">
                            <h3 className="font-medium leading-snug text-slate-200">
                                <div>
                                    <a
                                        className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base"
                                        href="https://upstatement.com"
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label="Lead Engineer at Upstatement">
                                        <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                                        <span id={randomId?.idTwo}>
                                            Lead Engineer ·{/* */}
                                            <span className="inline-block">
                                                Upstatement
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px"
                                                    aria-hidden="true">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </span>
                                        </span>
                                    </a>
                                </div>
                                <div>
                                    <div className="text-slate-500" aria-hidden="true" id={randomId?.idThree}>
                                        Senior Engineer
                                    </div>
                                </div>
                            </h3>
                            <p className="mt-2 text-sm leading-normal" id={randomId?.idFour}>
                                Deliver high-quality, robust production code for a diverse array of projects for clients including Harvard Business
                                School, Everytown for Gun Safety, Pratt Institute, Koala Health, Vanderbilt University, The 19th News, and more.
                                Provide leadership within engineering department through close collaboration, knowledge shares, and mentorship.
                            </p>
                            <ul className="mt-2 flex flex-wrap" aria-label="Technologies used" id={randomId?.idFive}></ul>
                        </div>
                    </div>
                </li>
            </>
        );
    };

    const generateElementProject = (randomId: any) => {
        return (
            <>
                <li className="mb-12">
                    <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />
                        <div className="z-10 sm:order-2 sm:col-span-6">
                            <h3>
                                <a
                                    className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base"
                                    href="https://www.newline.co/courses/build-a-spotify-connected-app"
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="Build a Spotify Connected App">
                                    <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                                    <span id={randomId?.idOne}>
                                        Build a Spotify Connected{/* */}
                                        <span className="inline-block">
                                            App
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px"
                                                aria-hidden="true">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </span>
                                    </span>
                                </a>
                            </h3>
                            <p className="mt-2 text-sm leading-normal" id={randomId?.idTwo}>
                                Video course that teaches how to build a web app with the Spotify Web API. Topics covered include the principles of
                                REST APIs, user auth flows, Node, Express, React, Styled Components, and more.
                            </p>
                            <ul className="mt-2 flex flex-wrap" aria-label="Technologies used:" id={randomId?.idFour}></ul>
                        </div>
                        <img
                            id={randomId?.idThree}
                            alt=""
                            loading="lazy"
                            width={200}
                            height={48}
                            decoding="async"
                            data-nimg={1}
                            className="rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1"
                            style={{ color: "transparent" }}
                            src=""
                        />
                    </div>
                </li>
            </>
        );
    };
    const addTag = (valueTag: any) => {
        return (
            <>
                <li className="mr-1.5 mt-2">
                    <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                        {valueTag}
                    </div>
                </li>
            </>
        );
    };
    const addElements = () => {
        generateRandomId();
        setValuesExperience({
            experience: [
                ...getValuesExperience.experience,
                {
                    id: {
                        startWorkId: getRandomId.idOne,
                        workCompanyId: getRandomId.idTwo,
                        jobTitleId: getRandomId.idThree,
                        descriptionJobId: getRandomId.idFour,
                        tagId: getRandomId.idFive
                    },
                    value: {
                        startWork: "",
                        workCompany: "",
                        jobTitle: "",
                        descriptionJob: "",
                        tag: []
                    }
                }
            ]
        });
        // setElementsForm([...getElementsForm, generateElementForm(getRandomId)]);
        const createOne = document.createElement("div");
        createOne.innerHTML = renderToString(generateElementView(getRandomId, getValuesExperience));
        const iframe: any = iframeRef.current;
        iframe.contentWindow.document.getElementById("workExperience").append(createOne.firstChild);
    };

    const addElementProject = () => {
        generateRandomIdElementProject();
        setValueProjectsElement({
            projects: [
                ...getValueProjectsElement.projects,
                {
                    id: {
                        projectNameId: getRandomProjectId.idOne,
                        projectDescriptionId: getRandomProjectId.idTwo,
                        projectImageId: getRandomProjectId.idThree,
                        tagId: getRandomProjectId.idFour
                    },
                    value: {
                        projectName: "",
                        projectDescription: "",
                        projectImage: "",
                        tag: []
                    }
                }
            ]
        });
        const createElement = document.createElement("div");
        createElement.innerHTML = renderToString(generateElementProject(getRandomProjectId));
        const iframe: any = iframeRef.current;
        iframe.contentWindow.document.getElementById("projectsList").append(createElement.firstChild);
    };

    const handleChangeFileInput = (e: any, targetId: any, key: any) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            const element: any = iframeRef.current;
            element.contentWindow.document.getElementById(targetId).src = fileReader.result;
            setValueInputProjectElement((prevState: any) => {
                return {
                    ...prevState,
                    [key]: {
                        id: {
                            ...getValueProjectsElement.projects[key].id
                        },
                        value: {
                            ...prevState[key].value,
                            projectImage: fileReader.result
                        }
                    }
                };
            });
        };
        fileReader.readAsDataURL(e.target.files[0]);
        // console.log(e.target.files[0]);
    };

    const getProfileData = async () => {
        const response = await Api.post({
            url: import.meta.env.VITE_API_BASE_URL + "auth/getData",
            data: {
                token: token
            }
        });
        console.log(response);

        setProfile(response?.data?.items?.profile);
    };
    const getDataPortofolio = async () => {
        const response = await Api.get({
            url: import.meta.env.VITE_API_BASE_URL + "portofolio/getData",
            params: {
                email: getProfile?.email
            }
        });
        if (response.httpCode == HTTP_OK) {
            setPortoData(response?.data?.items);
            setSuccessAddNewData(true);
        }
    };
    useEffect(() => {
        generateRandomId();
        generateRandomIdElementProject();
        getProfileData();
    }, []);

    useEffect(() => {
        getDataPortofolio();
    }, [getProfile]);

    return (
        <>
            {showIframe && (
                <div className="flex justify-start items-start z-[200] fixed p-2 overflow-hidden">
                    <FontAwesomeIcon icon={faXmark} size="2x" className="text-white hover:cursor-pointer" onClick={() => setIframe(!showIframe)} />
                </div>
            )}
            <div
                style={{
                    padding: 24
                }}>
                <h2 className="text-xl font-bold mb-2">Biodata</h2>
                <div className="dataOne">
                    <div className="flex lg:flex-row flex-col gap-4">
                        <div className="form-control w-full max-w-xs mb-3">
                            <label className="label">
                                <span className="label-text">Nama Anda ?</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                                onKeyUp={(event: React.KeyboardEvent<EventTarget>) => {
                                    const target = event.target as HTMLInputElement;
                                    changeValueProfile("h1Name", target.value);
                                }}
                            />
                        </div>
                        <div className="form-control w-full max-w-xs mb-3">
                            <label className="label">
                                <span className="label-text">Bidang Anda ?</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                                onKeyUp={(event: React.KeyboardEvent<EventTarget>) => {
                                    const target = event.target as HTMLInputElement;
                                    changeValueProfile("h2Name", target.value);
                                }}
                            />
                        </div>
                        <div className="form-control w-full max-w-xs mb-3">
                            <label className="label">
                                <span className="label-text">Motto Anda ?</span>
                            </label>
                            <input
                                type="textarea"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                                onKeyUp={(event: React.KeyboardEvent<EventTarget>) => {
                                    const target = event.target as HTMLInputElement;
                                    changeValueProfile("mottoProfile", target.value);
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="dataTwo">
                    <div className="flex lg:flex-row flex-col gap-4">
                        <div className="form-control w-full max-w-xs mb-3">
                            <label className="label">
                                <span className="label-text">Link LinkedIn ?</span>
                            </label>
                            <input
                                type="textarea"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                                onKeyUp={(event: React.KeyboardEvent<EventTarget>) => {
                                    const target = event.target as HTMLInputElement;
                                    changeValueLinkProfile("linkedinLink", target.value);
                                }}
                            />
                        </div>
                        <div className="form-control w-full max-w-xs mb-3">
                            <label className="label">
                                <span className="label-text">Github Link ?</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                                onKeyUp={(event: React.KeyboardEvent<EventTarget>) => {
                                    const target = event.target as HTMLInputElement;
                                    changeValueLinkProfile("githubLink", target.value);
                                }}
                            />
                        </div>
                        <div className="form-control w-full max-w-xs mb-3">
                            <label className="label">
                                <span className="label-text">Instagram Link ?</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                                onKeyUp={(event: React.KeyboardEvent<EventTarget>) => {
                                    const target = event.target as HTMLInputElement;
                                    changeValueLinkProfile("instagramLink", target.value);
                                }}
                            />
                        </div>
                        <div className="form-control w-full max-w-xs mb-3">
                            <label className="label">
                                <span className="label-text">Twitter Link ?</span>
                            </label>
                            <input
                                type="textarea"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                                onKeyUp={(event: React.KeyboardEvent<EventTarget>) => {
                                    const target = event.target as HTMLInputElement;
                                    changeValueLinkProfile("twitterLink", target.value);
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex lg:flex-row flex-col">
                    <div className="form-control w-full mb-3">
                        <label className="label">
                            <span className="label-text">Deskripsi Anda ?</span>
                        </label>
                        <textarea
                            className="textarea textarea-bordered w-full"
                            rows={4}
                            placeholder="Deskripsi"
                            onKeyUp={(event: React.KeyboardEvent<EventTarget>) => {
                                const target = event.target as HTMLInputElement;
                                changeValueProfile("about", target.value);
                            }}></textarea>
                    </div>
                </div>
                <div className="divider"></div>
                <h2 className="text-xl font-bold mb-2">Pengalaman</h2>
                {getValuesExperience?.experience?.map((id: any, key: any) => {
                    return (
                        <React.Fragment key={key}>
                            <div className={`dataThree${key}`} id={key}>
                                <div className="flex lg:flex-row flex-col gap-4" key={key}>
                                    <div className="form-control w-full max-w-xs mb-3">
                                        <label className="label">
                                            <span className="label-text">Mulai Kerja ?</span>
                                        </label>
                                        <input
                                            type="textarea"
                                            placeholder="Type here"
                                            className="input input-bordered w-full max-w-xs"
                                            onKeyUp={(event: React.KeyboardEvent<EventTarget>) => {
                                                const target = event.target as HTMLInputElement;
                                                setValuesProjects((prevState: any) => {
                                                    return {
                                                        ...prevState,
                                                        [key]: {
                                                            id: {
                                                                ...getValuesExperience.experience[key].id
                                                            },
                                                            value: {
                                                                ...prevState.value,
                                                                startWork: target.value
                                                            }
                                                        }
                                                    };
                                                });
                                                changeValueExperience(getValuesExperience.experience[key].id.startWorkId, target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="form-control w-full max-w-xs mb-3">
                                        <label className="label">
                                            <span className="label-text">Perusahaan ?</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="input input-bordered w-full max-w-xs"
                                            onKeyUp={(event: React.KeyboardEvent<EventTarget>) => {
                                                const target = event.target as HTMLInputElement;
                                                setValuesProjects((prevState: any) => {
                                                    return {
                                                        ...prevState,
                                                        [key]: {
                                                            id: {
                                                                ...getValuesExperience.experience[key].id
                                                            },
                                                            value: {
                                                                ...prevState[key].value,
                                                                workCompany: target.value
                                                            }
                                                        }
                                                    };
                                                });
                                                changeValueExperience(getValuesExperience.experience[key].id.workCompanyId, target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="form-control w-full max-w-xs mb-3">
                                        <label className="label">
                                            <span className="label-text">Jabatan ?</span>
                                        </label>
                                        <input
                                            type="textarea"
                                            placeholder="Type here"
                                            className="input input-bordered w-full max-w-xs"
                                            onKeyUp={(event: React.KeyboardEvent<EventTarget>) => {
                                                const target = event.target as HTMLInputElement;
                                                setValuesProjects((prevState: any) => {
                                                    return {
                                                        ...prevState,
                                                        [key]: {
                                                            id: {
                                                                ...getValuesExperience.experience[key].id
                                                            },
                                                            value: {
                                                                ...prevState[key].value,
                                                                jobTitle: target.value
                                                            }
                                                        }
                                                    };
                                                });
                                                changeValueExperience(getValuesExperience.experience[key].id.jobTitleId, target.value);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="form-control w-full mb-3">
                                    <label className="label">
                                        <span className="label-text">Deskripsi Pekerjaan ?</span>
                                    </label>
                                    <textarea
                                        className="textarea textarea-bordered w-full"
                                        rows={4}
                                        placeholder="Deskripsi"
                                        onKeyUp={(event: React.KeyboardEvent<EventTarget>) => {
                                            const target = event.target as HTMLInputElement;
                                            setValuesProjects((prevState: any) => {
                                                return {
                                                    ...prevState,
                                                    [key]: {
                                                        id: {
                                                            ...getValuesExperience.experience[key].id
                                                        },
                                                        value: {
                                                            ...prevState[key].value,
                                                            descriptionJob: target.value
                                                        }
                                                    }
                                                };
                                            });
                                            changeValueExperience(getValuesExperience.experience[key].id.descriptionJobId, target.value);
                                        }}></textarea>
                                </div>
                                <div className="form-control w-full mb-3">
                                    <label className="label">
                                        <span className="label-text">Keahlian ?</span>
                                    </label>
                                    <CreatableSelect
                                        isMulti
                                        onChange={(valueSelect: any) => {
                                            const createTagElement = document.createElement("div");
                                            valueSelect.map((item: any) => {
                                                createTagElement.innerHTML = renderToString(addTag(item.value));
                                            });
                                            const iframe: any = iframeRef.current;
                                            iframe.contentWindow.document
                                                .getElementById(getValuesExperience.experience[key].id.tagId)
                                                .append(createTagElement.firstChild);

                                            setValuesTag([key, { ...valueSelect }]);
                                            setValuesProjects((prevState: any) => {
                                                return {
                                                    ...prevState,
                                                    [key]: {
                                                        id: {
                                                            ...getValuesExperience.experience[key].id
                                                        },
                                                        value: {
                                                            ...prevState[key].value,
                                                            tag: valueSelect
                                                        }
                                                    }
                                                };
                                            });
                                            // setFinalValues(getValuesExperience);
                                        }}
                                    />
                                </div>
                            </div>
                        </React.Fragment>
                    );
                })}
                <button className="btn btn-primary" onClick={() => addElements()}>
                    Tambah Pengalaman
                </button>

                <div className="divider"></div>
                <h2 className="text-xl font-bold mb-2">Project</h2>
                {getValueProjectsElement?.projects?.map((id: any, key: any) => {
                    return (
                        <React.Fragment key={key}>
                            <div className="flex lg:flex-row flex-col gap-4">
                                <div className="form-control mb-3">
                                    <label className="form-control w-full max-w-xs">
                                        <div className="label">
                                            <span className="label-text">Nama Project</span>
                                        </div>
                                        <input
                                            type="text"
                                            className="file-input file-input-bordered w-full max-w-xs"
                                            onKeyUp={(event: React.KeyboardEvent<EventTarget>) => {
                                                const target = event.target as HTMLInputElement;
                                                setValueInputProjectElement((prevState: any) => {
                                                    return {
                                                        ...prevState,
                                                        [key]: {
                                                            id: {
                                                                ...getValueProjectsElement.projects[key].id
                                                            },
                                                            value: {
                                                                ...prevState.value,
                                                                projectName: target.value
                                                            }
                                                        }
                                                    };
                                                });
                                                changeValueProjects(getValueProjectsElement.projects[key].id.projectNameId, target.value);
                                            }}
                                        />
                                    </label>
                                </div>

                                <div className="form-control mb-3">
                                    <label className="form-control w-full max-w-xs">
                                        <div className="label">
                                            <span className="label-text">Foto Project</span>
                                        </div>
                                        <input
                                            type="file"
                                            className="file-input file-input-bordered w-full max-w-xs"
                                            onChange={(event: any) =>
                                                handleChangeFileInput(event, getValueProjectsElement.projects[key].id.projectImageId, key)
                                            }
                                        />
                                    </label>
                                </div>
                                <div className="form-control w-full max-w-4xl mb-3">
                                    <label className="form-control">
                                        <div className="label">
                                            <span className="label-text">Keahlian ?</span>
                                        </div>
                                        <CreatableSelect
                                            isMulti
                                            onChange={(valueSelect: any) => {
                                                const createTagElement = document.createElement("div");
                                                valueSelect.map((item: any) => {
                                                    createTagElement.innerHTML = renderToString(addTag(item.value));
                                                });
                                                const iframe: any = iframeRef.current;
                                                iframe.contentWindow.document
                                                    .getElementById(getValueProjectsElement.projects[key].id.tagId)
                                                    .append(createTagElement.firstChild);

                                                // setValuesTag([key, { ...valueSelect }]);
                                                setValueInputProjectElement((prevState: any) => {
                                                    return {
                                                        ...prevState,
                                                        [key]: {
                                                            id: {
                                                                ...getValueProjectsElement.projects[key].id
                                                            },
                                                            value: {
                                                                ...prevState[key].value,
                                                                tag: valueSelect
                                                            }
                                                        }
                                                    };
                                                });
                                                // setFinalValues(getValuesExperience);
                                            }}
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className="form-control w-full mb-3">
                                <label className="label">
                                    <span className="label-text">Deskripsi Project ?</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered w-full"
                                    rows={4}
                                    placeholder="Deskripsi"
                                    onKeyUp={(event: React.KeyboardEvent<EventTarget>) => {
                                        const target = event.target as HTMLInputElement;
                                        setValueInputProjectElement((prevState: any) => {
                                            return {
                                                ...prevState,
                                                [key]: {
                                                    id: {
                                                        ...getValueProjectsElement.projects[key].id
                                                    },
                                                    value: {
                                                        ...prevState[key].value,
                                                        projectDescription: target.value
                                                    }
                                                }
                                            };
                                        });
                                        changeValueProjects(getValueProjectsElement.projects[key].id.projectDescriptionId, target.value);
                                    }}></textarea>
                            </div>
                        </React.Fragment>
                    );
                })}
                <button className="btn btn-primary" onClick={() => addElementProject()}>
                    Tambah Project
                </button>
                <div className="btnPreview my-3">
                    <button className="btn btn-primary" onClick={() => setIframe(!showIframe)}>
                        Preview
                    </button>
                    <button className="btn btn-primary" onClick={() => getAllData()}>
                        GetData
                    </button>
                    <button className="btn btn-primary" onClick={() => sendData()}>
                        Simpan Data
                    </button>
                </div>

                <iframe
                    src="http://localhost:5173/iframe/portofolio"
                    className="w-full h-screen"
                    ref={iframeRef}
                    style={showIframe ? style : null}></iframe>
            </div>
            {/* {!successAddNewData ? (
                <div
                    style={{
                        padding: 24
                    }}>
                    <h2 className="text-xl font-bold mb-2">Biodata</h2>
                    <div className="dataOne">
                        <div className="flex lg:flex-row flex-col gap-4">
                            <div className="form-control w-full max-w-xs mb-3">
                                <label className="label">
                                    <span className="label-text">Nama Anda ?</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    className="input input-bordered w-full max-w-xs"
                                    onKeyUp={(event: React.KeyboardEvent<EventTarget>) => {
                                        const target = event.target as HTMLInputElement;
                                        changeValueProfile("h1Name", target.value);
                                    }}
                                />
                            </div>
                            <div className="form-control w-full max-w-xs mb-3">
                                <label className="label">
                                    <span className="label-text">Bidang Anda ?</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    className="input input-bordered w-full max-w-xs"
                                    onKeyUp={(event: React.KeyboardEvent<EventTarget>) => {
                                        const target = event.target as HTMLInputElement;
                                        changeValueProfile("h2Name", target.value);
                                    }}
                                />
                            </div>
                            <div className="form-control w-full max-w-xs mb-3">
                                <label className="label">
                                    <span className="label-text">Motto Anda ?</span>
                                </label>
                                <input
                                    type="textarea"
                                    placeholder="Type here"
                                    className="input input-bordered w-full max-w-xs"
                                    onKeyUp={(event: React.KeyboardEvent<EventTarget>) => {
                                        const target = event.target as HTMLInputElement;
                                        changeValueProfile("mottoProfile", target.value);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="dataTwo">
                        <div className="flex lg:flex-row flex-col gap-4">
                            <div className="form-control w-full max-w-xs mb-3">
                                <label className="label">
                                    <span className="label-text">Link LinkedIn ?</span>
                                </label>
                                <input
                                    type="textarea"
                                    placeholder="Type here"
                                    className="input input-bordered w-full max-w-xs"
                                    onKeyUp={(event: React.KeyboardEvent<EventTarget>) => {
                                        const target = event.target as HTMLInputElement;
                                        changeValueLinkProfile("linkedinLink", target.value);
                                    }}
                                />
                            </div>
                            <div className="form-control w-full max-w-xs mb-3">
                                <label className="label">
                                    <span className="label-text">Github Link ?</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    className="input input-bordered w-full max-w-xs"
                                    onKeyUp={(event: React.KeyboardEvent<EventTarget>) => {
                                        const target = event.target as HTMLInputElement;
                                        changeValueLinkProfile("githubLink", target.value);
                                    }}
                                />
                            </div>
                            <div className="form-control w-full max-w-xs mb-3">
                                <label className="label">
                                    <span className="label-text">Instagram Link ?</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    className="input input-bordered w-full max-w-xs"
                                    onKeyUp={(event: React.KeyboardEvent<EventTarget>) => {
                                        const target = event.target as HTMLInputElement;
                                        changeValueLinkProfile("instagramLink", target.value);
                                    }}
                                />
                            </div>
                            <div className="form-control w-full max-w-xs mb-3">
                                <label className="label">
                                    <span className="label-text">Twitter Link ?</span>
                                </label>
                                <input
                                    type="textarea"
                                    placeholder="Type here"
                                    className="input input-bordered w-full max-w-xs"
                                    onKeyUp={(event: React.KeyboardEvent<EventTarget>) => {
                                        const target = event.target as HTMLInputElement;
                                        changeValueLinkProfile("twitterLink", target.value);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex lg:flex-row flex-col">
                        <div className="form-control w-full mb-3">
                            <label className="label">
                                <span className="label-text">Deskripsi Anda ?</span>
                            </label>
                            <textarea
                                className="textarea textarea-bordered w-full"
                                rows={4}
                                placeholder="Deskripsi"
                                onKeyUp={(event: React.KeyboardEvent<EventTarget>) => {
                                    const target = event.target as HTMLInputElement;
                                    changeValueProfile("about", target.value);
                                }}></textarea>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <h2 className="text-xl font-bold mb-2">Pengalaman</h2>
                    {getValuesExperience?.experience?.map((id: any, key: any) => {
                        return (
                            <React.Fragment key={key}>
                                <div className={`dataThree${key}`} id={key}>
                                    <div className="flex lg:flex-row flex-col gap-4" key={key}>
                                        <div className="form-control w-full max-w-xs mb-3">
                                            <label className="label">
                                                <span className="label-text">Mulai Kerja ?</span>
                                            </label>
                                            <input
                                                type="textarea"
                                                placeholder="Type here"
                                                className="input input-bordered w-full max-w-xs"
                                                onKeyUp={(event: React.KeyboardEvent<EventTarget>) => {
                                                    const target = event.target as HTMLInputElement;
                                                    setValuesProjects((prevState: any) => {
                                                        return {
                                                            ...prevState,
                                                            [key]: {
                                                                id: {
                                                                    ...getValuesExperience.experience[key].id
                                                                },
                                                                value: {
                                                                    ...prevState.value,
                                                                    startWork: target.value
                                                                }
                                                            }
                                                        };
                                                    });
                                                    changeValueExperience(getValuesExperience.experience[key].id.startWorkId, target.value);
                                                }}
                                            />
                                        </div>
                                        <div className="form-control w-full max-w-xs mb-3">
                                            <label className="label">
                                                <span className="label-text">Perusahaan ?</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Type here"
                                                className="input input-bordered w-full max-w-xs"
                                                onKeyUp={(event: React.KeyboardEvent<EventTarget>) => {
                                                    const target = event.target as HTMLInputElement;
                                                    setValuesProjects((prevState: any) => {
                                                        return {
                                                            ...prevState,
                                                            [key]: {
                                                                id: {
                                                                    ...getValuesExperience.experience[key].id
                                                                },
                                                                value: {
                                                                    ...prevState[key].value,
                                                                    workCompany: target.value
                                                                }
                                                            }
                                                        };
                                                    });
                                                    changeValueExperience(getValuesExperience.experience[key].id.workCompanyId, target.value);
                                                }}
                                            />
                                        </div>
                                        <div className="form-control w-full max-w-xs mb-3">
                                            <label className="label">
                                                <span className="label-text">Jabatan ?</span>
                                            </label>
                                            <input
                                                type="textarea"
                                                placeholder="Type here"
                                                className="input input-bordered w-full max-w-xs"
                                                onKeyUp={(event: React.KeyboardEvent<EventTarget>) => {
                                                    const target = event.target as HTMLInputElement;
                                                    setValuesProjects((prevState: any) => {
                                                        return {
                                                            ...prevState,
                                                            [key]: {
                                                                id: {
                                                                    ...getValuesExperience.experience[key].id
                                                                },
                                                                value: {
                                                                    ...prevState[key].value,
                                                                    jobTitle: target.value
                                                                }
                                                            }
                                                        };
                                                    });
                                                    changeValueExperience(getValuesExperience.experience[key].id.jobTitleId, target.value);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-control w-full mb-3">
                                        <label className="label">
                                            <span className="label-text">Deskripsi Pekerjaan ?</span>
                                        </label>
                                        <textarea
                                            className="textarea textarea-bordered w-full"
                                            rows={4}
                                            placeholder="Deskripsi"
                                            onKeyUp={(event: React.KeyboardEvent<EventTarget>) => {
                                                const target = event.target as HTMLInputElement;
                                                setValuesProjects((prevState: any) => {
                                                    return {
                                                        ...prevState,
                                                        [key]: {
                                                            id: {
                                                                ...getValuesExperience.experience[key].id
                                                            },
                                                            value: {
                                                                ...prevState[key].value,
                                                                descriptionJob: target.value
                                                            }
                                                        }
                                                    };
                                                });
                                                changeValueExperience(getValuesExperience.experience[key].id.descriptionJobId, target.value);
                                            }}></textarea>
                                    </div>
                                    <div className="form-control w-full mb-3">
                                        <label className="label">
                                            <span className="label-text">Keahlian ?</span>
                                        </label>
                                        <CreatableSelect
                                            isMulti
                                            onChange={(valueSelect: any) => {
                                                const createTagElement = document.createElement("div");
                                                valueSelect.map((item: any) => {
                                                    createTagElement.innerHTML = renderToString(addTag(item.value));
                                                });
                                                const iframe: any = iframeRef.current;
                                                iframe.contentWindow.document
                                                    .getElementById(getValuesExperience.experience[key].id.tagId)
                                                    .append(createTagElement.firstChild);

                                                setValuesTag([key, { ...valueSelect }]);
                                                setValuesProjects((prevState: any) => {
                                                    return {
                                                        ...prevState,
                                                        [key]: {
                                                            id: {
                                                                ...getValuesExperience.experience[key].id
                                                            },
                                                            value: {
                                                                ...prevState[key].value,
                                                                tag: valueSelect
                                                            }
                                                        }
                                                    };
                                                });
                                                // setFinalValues(getValuesExperience);
                                            }}
                                        />
                                    </div>
                                </div>
                            </React.Fragment>
                        );
                    })}
                    <button className="btn btn-primary" onClick={() => addElements()}>
                        Tambah Pengalaman
                    </button>

                    <div className="divider"></div>
                    <h2 className="text-xl font-bold mb-2">Project</h2>
                    {getValueProjectsElement?.projects?.map((id: any, key: any) => {
                        return (
                            <React.Fragment key={key}>
                                <div className="flex lg:flex-row flex-col gap-4">
                                    <div className="form-control mb-3">
                                        <label className="form-control w-full max-w-xs">
                                            <div className="label">
                                                <span className="label-text">Nama Project</span>
                                            </div>
                                            <input
                                                type="text"
                                                className="file-input file-input-bordered w-full max-w-xs"
                                                onKeyUp={(event: React.KeyboardEvent<EventTarget>) => {
                                                    const target = event.target as HTMLInputElement;
                                                    setValueInputProjectElement((prevState: any) => {
                                                        return {
                                                            ...prevState,
                                                            [key]: {
                                                                id: {
                                                                    ...getValueProjectsElement.projects[key].id
                                                                },
                                                                value: {
                                                                    ...prevState.value,
                                                                    projectName: target.value
                                                                }
                                                            }
                                                        };
                                                    });
                                                    changeValueProjects(getValueProjectsElement.projects[key].id.projectNameId, target.value);
                                                }}
                                            />
                                        </label>
                                    </div>

                                    <div className="form-control mb-3">
                                        <label className="form-control w-full max-w-xs">
                                            <div className="label">
                                                <span className="label-text">Foto Project</span>
                                            </div>
                                            <input
                                                type="file"
                                                className="file-input file-input-bordered w-full max-w-xs"
                                                onChange={(event: any) =>
                                                    handleChangeFileInput(event, getValueProjectsElement.projects[key].id.projectImageId, key)
                                                }
                                            />
                                        </label>
                                    </div>
                                    <div className="form-control w-full max-w-4xl mb-3">
                                        <label className="form-control">
                                            <div className="label">
                                                <span className="label-text">Keahlian ?</span>
                                            </div>
                                            <CreatableSelect
                                                isMulti
                                                onChange={(valueSelect: any) => {
                                                    const createTagElement = document.createElement("div");
                                                    valueSelect.map((item: any) => {
                                                        createTagElement.innerHTML = renderToString(addTag(item.value));
                                                    });
                                                    const iframe: any = iframeRef.current;
                                                    iframe.contentWindow.document
                                                        .getElementById(getValueProjectsElement.projects[key].id.tagId)
                                                        .append(createTagElement.firstChild);

                                                    // setValuesTag([key, { ...valueSelect }]);
                                                    setValueInputProjectElement((prevState: any) => {
                                                        return {
                                                            ...prevState,
                                                            [key]: {
                                                                id: {
                                                                    ...getValueProjectsElement.projects[key].id
                                                                },
                                                                value: {
                                                                    ...prevState[key].value,
                                                                    tag: valueSelect
                                                                }
                                                            }
                                                        };
                                                    });
                                                    // setFinalValues(getValuesExperience);
                                                }}
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className="form-control w-full mb-3">
                                    <label className="label">
                                        <span className="label-text">Deskripsi Project ?</span>
                                    </label>
                                    <textarea
                                        className="textarea textarea-bordered w-full"
                                        rows={4}
                                        placeholder="Deskripsi"
                                        onKeyUp={(event: React.KeyboardEvent<EventTarget>) => {
                                            const target = event.target as HTMLInputElement;
                                            setValueInputProjectElement((prevState: any) => {
                                                return {
                                                    ...prevState,
                                                    [key]: {
                                                        id: {
                                                            ...getValueProjectsElement.projects[key].id
                                                        },
                                                        value: {
                                                            ...prevState[key].value,
                                                            projectDescription: target.value
                                                        }
                                                    }
                                                };
                                            });
                                            changeValueProjects(getValueProjectsElement.projects[key].id.projectDescriptionId, target.value);
                                        }}></textarea>
                                </div>
                            </React.Fragment>
                        );
                    })}
                    <button className="btn btn-primary" onClick={() => addElementProject()}>
                        Tambah Project
                    </button>
                    <div className="btnPreview my-3">
                        <button className="btn btn-primary" onClick={() => setIframe(!showIframe)}>
                            Preview
                        </button>
                        <button className="btn btn-primary" onClick={() => getAllData()}>
                            GetData
                        </button>
                        <button className="btn btn-primary" onClick={() => sendData()}>
                            Simpan Data
                        </button>
                    </div>

                    <iframe
                        src="http://localhost:5173/iframe/portofolio"
                        className="w-full h-screen"
                        ref={iframeRef}
                        style={showIframe ? style : null}></iframe>
                </div>
            ) : (
                getPortoData.map((item: any, key: any) => {
                    return (
                        <>
                            {item.project.map((itemProject: any, key: any) => {
                                console.log(itemProject);

                                return (
                                    <>
                                        <h1>Halo</h1>
                                        <ImageComp src={itemProject.value.projectImage} className="mx-4" />;
                                    </>
                                );
                            })}
                        </>
                    );
                })
            )} */}
        </>
    );
};
export default Home;
