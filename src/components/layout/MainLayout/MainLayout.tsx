import { LayoutConfigProps } from "@/types";
import { FC, PropsWithChildren } from "react";

const MainLayout: FC<PropsWithChildren<LayoutConfigProps>> = ({ children, className }) => {
    return (
        <div>{children}</div>
    )
}

export default MainLayout;