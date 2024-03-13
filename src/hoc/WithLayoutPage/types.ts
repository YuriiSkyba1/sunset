import { Layout } from '@/enums';
import { LayoutConfigProps, NextPageComponent } from '@/types';

export interface IWithLayoutPageProps<T> {
    PageComponent: NextPageComponent<T>;
    layoutProps?: LayoutConfigProps;
    layoutType?: Layout;
}