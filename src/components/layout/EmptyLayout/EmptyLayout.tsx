import { LayoutConfigProps } from "@/types";
import { FC, PropsWithChildren } from "react";

const EmptyLayout: FC<PropsWithChildren<LayoutConfigProps>> = ({ children }) => {
    return <>{children}</>
}

export default EmptyLayout;