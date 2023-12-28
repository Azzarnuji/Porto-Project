import { Link, useNavigate } from "react-router-dom";
import ImageComp from "../Components/Image";
import InputComp from "../Components/Input";
import { useRef, useState } from "react";
import Api from "../Helpers/Api";
import TResponseData from "../Types/TResponseData";
import { HTTP_CREATED } from "../Constant/HttpCode";
import Swal from "sweetalert2";
import CheckerField from "../Helpers/CheckerField";

type TRegister = {
    email: string | null;
    password: string | null;
    name: string | null;
};

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const [getValuesForm, setValuesForm] = useState<TRegister>({
        email: null,
        password: null,
        name: null
    });
    const [getErrors, setErrors] = useState<any[]>([]);
    const errorRef = useRef<HTMLDivElement | null>(null);
    const handleOnKeyUp = (event: React.KeyboardEvent<EventTarget>) => {
        const target = event.target as HTMLInputElement;

        setValuesForm({
            ...getValuesForm,
            [target.name]: target.value
        });
        if (getErrors.length > 0) {
            checkForm();
        }
    };

    const checkForm = async (event?: React.FormEvent | any) => {
        if (event != undefined) {
            event.preventDefault();
        }
        CheckerField<TRegister>({
            formData: getValuesForm,
            callback: (resultListError) => {
                setErrors(Object.values(resultListError));
                if (Object.values(resultListError).length == 0) {
                    setErrors([]);
                    processRegister();
                }
            }
        });
    };
    const processRegister = () => {
        Swal.fire({
            title: "Processing Your Request",
            timerProgressBar: true,
            didOpen: async () => {
                Swal.showLoading();
                const response: TResponseData = await Api.post({
                    url: import.meta.env.VITE_API_BASE_URL + "auth/register",
                    data: getValuesForm
                });
                console.log(response);

                if (response.httpCode === HTTP_CREATED) {
                    Swal.fire({
                        icon: "success",
                        title: response.message,
                        text: "Register Success, Please Login"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate("/");
                        }
                    });
                }
            }
        });
    };

    return (
        <>
            {console.log(getErrors)}
            <div className="container mx-auto h-screen w-screen flex flex-row items-center justify-center">
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
                        <form action="#" onSubmit={checkForm} method="POST">
                            <h2 className="card-title">Register Page</h2>
                            <div className="form-control">
                                <InputComp
                                    idElement="email"
                                    labelText="Email"
                                    inputType="text"
                                    className="w-full max-w-xs"
                                    required={true}
                                    callback={handleOnKeyUp}
                                />
                            </div>
                            <div className="form-control">
                                <InputComp
                                    idElement="password"
                                    labelText="Password"
                                    inputType="password"
                                    className="w-full max-w-xs"
                                    required={true}
                                    callback={handleOnKeyUp}
                                />
                            </div>
                            <div className="form-control">
                                <InputComp
                                    idElement="name"
                                    labelText="Your Name"
                                    inputType="text"
                                    className="w-full max-w-xs"
                                    required={true}
                                    callback={handleOnKeyUp}
                                />
                            </div>
                            <div className="flex flex-row justify-end items-end mt-4">
                                <button type="submit" className="btn btn-primary text-white mx-1" onClick={checkForm}>
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div id="errorAlert" ref={errorRef} className="mx-4">
                    {getErrors.length > 0
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

export default RegisterPage;
