const GetSubdomain = () => {
    const host = window.location.host;

    return host.split(".")[0];
};

export default GetSubdomain;
