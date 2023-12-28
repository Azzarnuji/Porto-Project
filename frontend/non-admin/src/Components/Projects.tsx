import { Fragment } from "react";

const Projects = ({ dataPortofolio }: { dataPortofolio?: any }) => {
    return (
        <>
            <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
                    Projects
                </h2>
            </div>
            <div>
                <ul className="group/list">
                    {dataPortofolio?.map((data: any) => {
                        console.log(data?.project);

                        return (
                            <Fragment key={Math.random()}>
                                {data?.project?.map((project: any) => (
                                    <li className="mb-12" key={Math.random()}>
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
                                                        <span>{project?.value?.projectName}</span>
                                                    </a>
                                                </h3>
                                                <p className="mt-2 text-sm leading-normal">
                                                    {project?.value?.projectDescription}
                                                </p>
                                            </div>
                                            <img
                                                alt=""
                                                loading="lazy"
                                                width={200}
                                                height={48}
                                                decoding="async"
                                                data-nimg={1}
                                                className="rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1"
                                                style={{ color: "transparent" }}
                                                src={project?.value?.projectImage}
                                            />
                                        </div>
                                    </li>
                                ))}
                            </Fragment>
                        );
                    })}
                </ul>
                <div className="mt-12">
                    <a
                        className="inline-flex items-center leading-tight font-semibold text-slate-200 group"
                        aria-label="View Full Project Archive"
                        href="/archive">
                        <span>
                            <span className="border-b border-transparent pb-px transition group-hover:border-teal-300 motion-reduce:transition-none">
                                View Full Project{/* */}{" "}
                            </span>
                            <span className="whitespace-nowrap">
                                <span className="border-b border-transparent pb-px transition group-hover:border-teal-300 motion-reduce:transition-none">
                                    Archive
                                </span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="ml-1 inline-block h-4 w-4 shrink-0 -translate-y-px transition-transform group-hover:translate-x-2 group-focus-visible:translate-x-2 motion-reduce:transition-none"
                                    aria-hidden="true">
                                    <path
                                        fillRule="evenodd"
                                        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                        </span>
                    </a>
                </div>
            </div>
        </>
    );
};
export default Projects;
