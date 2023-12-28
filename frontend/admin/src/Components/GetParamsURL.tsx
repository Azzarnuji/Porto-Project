import { useSearchParams } from "react-router-dom";

const GetParamsURL = (name: string) => {
    const [searchParams, setSearchParams] = useSearchParams();
    return searchParams.get(name);
};
export default GetParamsURL;
