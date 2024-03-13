import { FC } from 'react';

import { Layout, Layout as LayoutTypes } from '@/enums';
import { UnknownProps } from '@/types';

import { IWithLayoutPageProps } from './types';

import dynamic from 'next/dynamic';

const EmptyLayout = dynamic(() => import('@/components/layout/EmptyLayout'));
const MainLayout = dynamic(() => import('@/components/layout/MainLayout'));
const AuthLayout = dynamic(() => import('@/components/layout/AuthLayout'));

const layoutMap = {
  [LayoutTypes.Main]: MainLayout,
  [LayoutTypes.Empty]: EmptyLayout,
  [LayoutTypes.Auth]: AuthLayout,
};

const withLayoutPage = <T extends UnknownProps>({PageComponent, layoutProps, layoutType = Layout.Main}: IWithLayoutPageProps<T>) => {
   const LayoutComponent = layoutMap[layoutType];
   
    const LayoutPage: FC<T> = (pageProps) =>  (
        <LayoutComponent {...layoutProps}>
          <PageComponent {...pageProps} />
        </LayoutComponent>
    );
  
    return LayoutPage;
};

export default withLayoutPage