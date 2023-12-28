import { Link, useNavigate } from "react-router-dom";
import ImageComp from "../Components/Image";
import InputComp from "../Components/Input";
import { FormEvent, useEffect, useState } from "react";
import Api from "../Helpers/Api";
import TResponseData from "../Types/TResponseData";
import { HTTP_OK } from "../Constant/HttpCode";
import { setCookie } from "cookies-next";
import Swal from "sweetalert2";
import CheckerField from "../Helpers/CheckerField";
import Alert from "../Components/Alert";
import GetParamsURL from "../Components/GetParamsURL";

type TLogin = {
    email: string;
    password: string;
};

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [getValuesForm, setValuesForm] = useState<TLogin>({
        email: "",
        password: ""
    });
    const getParam = GetParamsURL("status");
    const [getErrors, setErrors] = useState<any[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const handleOnKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        setValuesForm({
            ...getValuesForm,
            [target.name]: target.value
        });
        if (getErrors.length > 0) {
            CheckerField<TLogin>({
                formData: getValuesForm,
                callback: (resultListError) => {
                    setErrors(resultListError);
                }
            });
        }
    };

    const onSubmit = (event?: FormEvent) => {
        if (event != undefined) {
            event.preventDefault();
        }
        CheckerField<TLogin>({
            formData: getValuesForm,
            callback: (resultListError) => {
                setErrors(resultListError);
                if (Object.keys(resultListError).length == 0) {
                    processLogin();
                }
            }
        });
    };
    const processLogin = async () => {
        setLoading(true);

        const response: TResponseData = await Api.post({
            url: import.meta.env.VITE_API_BASE_URL + "auth/login",
            data: getValuesForm
        });
        console.log(response);
        if (response.httpCode == HTTP_OK) {
            setCookie("token", response?.data?.items?.profile?.token);
            navigate("/homepage");
        } else {
            Alert({ type: "error", title: "Error", text: response?.message ?? "Terjadi kesalahan pada server" });
            setLoading(false);
        }
    };

    useEffect(() => {
        if (getParam == "notauthorized") {
            Alert.confirmable({
                options: {
                    icon: "warning",
                    title: "Not Authorized",
                    text: "Anda harus login terlebih dahulu"
                },
                callback: (result) => {
                    if (result.isConfirmed) {
                        navigate("/");
                    }
                }
            });
        }
    }, [getParam]);
    return (
        <>
            {console.log(getErrors)}
            <div className="container mx-auto h-screen w-screen flex lg:flex-row flex-col items-center justify-center">
                <div className="card lg:card-side bg-base-100 shadow-xl">
                    <div className="w-full">
                        <figure>
                            <ImageComp
                                src={import.meta.env.VITE_APP_BASE_URL + "assets/images/login.png"}
                                className="rounded-lg text-center mt-10"
                                alt="Login"
                                height="300px"
                            />
                        </figure>
                    </div>

                    <div className="card-body w-full max-w-lg">
                        <form action="" onSubmit={onSubmit} method="POST">
                            <h2 className="card-title">Login Page {isLoading && <span className="loading loading-dots loading-md"></span>}</h2>
                            <div className="form-control">
                                <InputComp
                                    idElement="email"
                                    labelText="Email"
                                    inputType="text"
                                    className="w-full max-w-xs"
                                    callback={handleOnKeyUp}
                                />
                            </div>
                            <div className="form-control">
                                <InputComp
                                    idElement="password"
                                    labelText="Password"
                                    inputType="password"
                                    className="w-full max-w-xs"
                                    callback={handleOnKeyUp}
                                />
                            </div>
                            <div className="flex flex-row justify-end items-end mt-4">
                                <Link to={"/registrasi"}>
                                    <button type="button" className="btn btn-error text-white mx-1">
                                        Registrasi
                                    </button>
                                </Link>
                                <button type={"submit"} className="btn btn-primary mx-1">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="mx-4">
                    {Object.keys(getErrors).length > 0
                        ? getErrors.map((item, key) => {
                              return (
                                  <div role="alert" className="alert alert-warning my-4" key={Math.random()}>
                                      <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="stroke-current shrink-0 h-6 w-6"
                                          fill="none"
                                          viewBox="0 0 24 24">
                                          <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth="2"
                                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                          />
                                      </svg>
                                      <span>{item.error}</span>
                                  </div>
                              );
                          })
                        : null}
                </div>
            </div>
        </>
    );
};

export default LoginPage;
