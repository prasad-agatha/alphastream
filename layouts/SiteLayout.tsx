import React, {FC} from 'react';
// next
import {useRouter} from 'next/router';
// layouts
import {BasicLayout, DrawerLayout} from '../layouts';

const SiteLayout: FC<any> = ({children}: any) => {
  const router = useRouter();

  if (
    router.pathname.startsWith('/dashboard') ||
    router.pathname.startsWith('/create') ||
    router.pathname.startsWith('/company')
  ) {
    return <DrawerLayout>{children}</DrawerLayout>;
  }

  return <BasicLayout>{children}</BasicLayout>;
};

export default SiteLayout;
