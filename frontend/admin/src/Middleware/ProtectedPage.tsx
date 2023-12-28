import { getCookie } from "cookies-next";
import { ReactNode, useEffect, useState } from "react";
import Api from "../Helpers/Api";
import { useNavigate } from "react-router-dom";
import { HTTP_OK } from "../Constant/HttpCode";

const ProtectedPage = ({ children }: { children?: ReactNode }) => {
    const getToken = getCookie("token") ?? null;
    const [isValid, setValid] = useState<boolean>(false);
    const navigate = useNavigate();
    const requestCheckToken = async () => {
        const response = await Api.post({
            url: import.meta.env.VITE_API_BASE_URL + "auth/checkStatus",
            data: {
                token: getToken
            }
        });

        if (response.httpCode == HTTP_OK) {
            setValid(true);
            console.log(response);
        } else {
            setValid(false);
            navigate("/?status=notauthorized");
        }
    };
    useEffect(() => {
        requestCheckToken();
    }, [getToken]);
    if (isValid) {
        return children;
    }
};

export default ProtectedPage;
