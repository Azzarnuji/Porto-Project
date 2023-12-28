function CheckerField<T extends {}>({ formData, callback }: { formData: T; callback: (resultListError: any) => void }) {
    type TCheckerFieldErrors = {
        [key in keyof T]: string;
    };
    const formDataValue = { ...formData };

    const errors: TCheckerFieldErrors = Object.keys(formDataValue).reduce((acc, key: any) => {
        if (formDataValue[key as keyof T] === null || formData[key as keyof T] === "") {
            return {
                ...acc,
                [key]: {
                    error: `Form ${key} is required`
                }
            };
        }
        return acc;
    }, {} as { [key in keyof T]: string });
    callback(Object.values(errors).length == 0 ? [] : Object.values(errors));
}
export default CheckerField;
