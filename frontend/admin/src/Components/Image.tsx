import React, { ReactElement } from "react";

const ImageComp = ({
    src,
    className,
    alt,
    width,
    height
}: {
    src: string;
    className: string;
    alt?: string;
    width?: string;
    height?: string;
}): ReactElement => {
    return <img src={src} className={className} alt={alt} width={width} height={height} />;
};
export default ImageComp;
