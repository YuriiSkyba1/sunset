import { LayoutConfigProps } from "@/types";
import { FC, PropsWithChildren } from "react";

const AuthLayout: FC<PropsWithChildren<LayoutConfigProps>> = ({ children }) => {
    return (
        <div>{children}</div>
    )
}

export default AuthLayout;