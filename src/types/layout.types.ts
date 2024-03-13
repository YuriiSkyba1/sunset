import { NextPage } from "next";

export interface LayoutConfigProps {
    className?: string;
}

export type NextPageComponent<T> = NextPage<T>;

export type UnknownProps = Record<string, any>;