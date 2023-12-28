import React, { FC, ReactNode } from "react";
import Swal, { SweetAlertOptions, SweetAlertResult } from "sweetalert2";

type TAlertProccess = {
    type?: "success" | "error" | "warning" | "info" | "question";
    text?: string;
    title?: string;
    options?: SweetAlertOptions;
    callback?: (result: SweetAlertResult<any>) => void;
};

type TAlertConfirmable = {
    confirmable: (params: TAlertProccess) => void;
};

/**
 * A function that displays an alert using the Swal library.
 *
 * @param {TAlertProccess} type - The type of alert to display.
 * @param {TAlertProccess} text - The text to display in the alert.
 * @param {TAlertProccess} title - The title of the alert.
 * @param {TAlertProccess} options - Additional options for the alert.
 * @return {ReactNode} The rendered alert component.
 */
const Alert: FC<TAlertProccess> & TAlertConfirmable = ({ type, text, title, options }: TAlertProccess): ReactNode => {
    return (
        <>
            {Swal.fire({
                icon: type,
                title: title,
                text: text,
                ...options
            })}
        </>
    );
};

/**
 * Creates a confirmable alert using the provided options and invokes the callback function with the result.
 *
 * @param {TAlertProccess} options - The options for the alert.
 * @param {Function} callback - The function to be invoked with the result of the alert.
 * @returns {void} void
 */
Alert.confirmable = ({ options, callback }: TAlertProccess): void => {
    Swal.fire({
        ...(options || {})
    }).then((result) => callback && callback(result));
};
export default Alert;
