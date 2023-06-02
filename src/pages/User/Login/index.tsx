import {userLoginUsingPOST} from '@/services/openapi-web/userController';
import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProFormText,} from '@ant-design/pro-components';
import {useModel} from '@umijs/max';
import {message} from 'antd';
import React from 'react';
import {useSearchParams} from "react-router-dom";
import {Link} from "@@/exports";
import Logo from '@/assets/logo.svg';

const Login: React.FC = () => {
  const [searchParams] = useSearchParams();
  const {initialState, setInitialState} = useModel('@@initialState');

  /**
   * 用户登录
   * @param fields
   */
  const doUserLogin = async (fields: API.UserLoginRequest) => {
    const hide = message.loading('登录中');
    try {
      const res = await userLoginUsingPOST({...fields});
      message.success('登录成功');
      setInitialState({
        ...initialState,
        currentUser: res.data,
      });
      // 重定向到之前页面
      window.location.href = searchParams.get('redirect') ?? '/';
    } catch (e: any) {
      message.error(e.message);
    } finally {
      hide();
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        background:
          'url(https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png)',
        backgroundSize: '100% 100%',
      }}>
      <div>
        <LoginForm
          logo={Logo}
          title="API开放平台"
          subTitle='免费的API开放平台'
          onFinish={async (values) => {
            await doUserLogin(values);
          }}
        >
          <ProFormText
            name="userAccount"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={'prefixIcon'}/>,
            }}
            placeholder={'请输入账号'}
            rules={[
              {
                required: true,
                message: '账号是必填项！',
              },
            ]}
          />
          <ProFormText.Password
            name="userPassword"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={'prefixIcon'}/>,
            }}
            placeholder={'请输入密码'}
            rules={[
              {
                required: true,
                message: '密码是必填项！',
              },
            ]}
          />
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <Link to="/user/register">新用户注册</Link>
            <Link
              to="/"
              style={{
                float: 'right',
              }}
            >
              返回主页
            </Link>
          </div>
        </LoginForm>
      </div>
    </div>
  );
};
export default Login;
