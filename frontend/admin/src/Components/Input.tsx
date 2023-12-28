const InputComp = ({
    labelText,
    inputType,
    idElement,
    placeholderText,
    className,
    required,
    callback = () => {} // Provide a default empty function as the initializer
}: {
    labelText: string;
    inputType: string;
    idElement: string;
    placeholderText?: string;
    className?: string;
    required?: boolean;
    callback?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}) => {
    return (
        <>
            <label className="form-control w-full max-w-lg">
                <div className="label">
                    <span className="label-text">{labelText}</span>
                </div>
                <input
                    id={idElement}
                    name={idElement}
                    className={`input input-bordered ${className ?? "w-full max-w-xs"}`}
                    type={inputType}
                    placeholder={placeholderText}
                    required={required}
                    onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => {
                        callback(event);
                    }}
                />
            </label>
        </>
    );
};

export default InputComp;
