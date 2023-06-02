import {getLoginUserUsingGET} from '@/services/openapi-web/userController';
import type {Settings as LayoutSettings} from '@ant-design/pro-components';
import type {RunTimeLayoutConfig} from '@umijs/max';
import {requestConfig} from './requestConfig';
import defaultSettings from "../config/defaultSettings";
import Logo from '@/assets/logo.svg';
import RightContent from "@/components/GlobalHeader/RightContent";
import GlobalFooter from "@/components/GlobalFooter";


export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.UserVO;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.UserVO | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const res = await getLoginUserUsingGET();
      const result = res.data;
      return {
        ...result,
      };
    } catch (error) {

    }
    return undefined;
  };
  const currentUser = await fetchUserInfo();
  return {
    fetchUserInfo,
    currentUser,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

/**
 * 全局布局配置
 */
export const layout: RunTimeLayoutConfig = () => {
  return {
    title: 'API开放平台',
    logo: Logo,
    menu: {
      locale: false,
    },
    fixedHeader: false,
    layout: 'top',
    contentStyle: {
      paddingBottom: 120,
    },
    rightContentRender: () => <RightContent/>,
    footerRender: () => <GlobalFooter/>,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = requestConfig;
