import { Link } from '@@/exports';
import { LogoutOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Avatar, Button, Dropdown, Menu, message } from 'antd';
import classNames from 'classnames';
import { stringify } from 'querystring';
import React from 'react';
import { history } from 'umi';
import styles from './index.less';
import {userLogoutUsingPOST} from "@/services/openapi-web/userController";

/**
 * 头像下拉菜单
 *
 * @constructor
 * @author yupi
 */
const AvatarDropdown: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;

  const onMenuClick = async (event: {
    key: React.Key;
    keyPath: React.Key[];
  }) => {
    const { key } = event;

    if (key === 'logout') {
      try {
        await userLogoutUsingPOST();
        message.success('已退出登录');
      } catch (e: any) {
        message.error('操作失败');
      }
      // @ts-ignore
      await setInitialState({ ...initialState, loginUser: undefined });
      history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: window.location.href,
        }),
      });
      return;
    }
  };

  /**
   * 下拉菜单
   */
  const menuHeaderDropdown = currentUser ? (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="current" disabled>
        {currentUser.userName}
      </Menu.Item>
      <Menu.Item key="logout">
        <span style={{ color: 'red' }}>
          <LogoutOutlined />
          退出登录
        </span>
      </Menu.Item>
    </Menu>
  ) : (
    <></>
  );

  return currentUser ? (
    <Dropdown
      overlayClassName={classNames(styles.container)}
      overlay={menuHeaderDropdown}
    >
      <div className={`${styles.action} ${styles.account}`}>
        <Avatar  src={currentUser.userAvatar? currentUser.userAvatar: 'https://pic.616pic.com/ys_img/00/08/69/bW7OT55QAA.jpg'}/>
      </div>
    </Dropdown>
  ) : (
    <Link to="/user/login">
      <Button type="primary" ghost>登录</Button>
    </Link>
  );
};

export default AvatarDropdown;
