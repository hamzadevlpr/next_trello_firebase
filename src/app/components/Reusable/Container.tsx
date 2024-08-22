import React from "react";

type ContainerProps = {
    children: React.ReactNode;
};
function Container({ children }: ContainerProps) {
    return (
        <div className="fixed grid place-items-center backdrop-blur-sm top-0 right-0 left-0 z-50 w-full inset-0 h-modal h-full justify-center items-center">
            {children}
        </div>
    );
}

export default Container;
