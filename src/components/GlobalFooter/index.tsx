import { CrownOutlined, GithubOutlined, UserOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';
import './index.less';

/**
 * 全局 Footer
 *
 * @author yupi
 */
const GlobalFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      className="default-footer"
      copyright={`${currentYear} 沈泽辉 `}
      links={[
        {
          key: '1',
          title: (
            <>
              <UserOutlined /> 站长：沈泽辉
            </>
          ),
          href: 'https://github.com/shenzehui/\'',
          blankTarget: true,
        },
        {
          key: '2',
          title: (
            <>
              <GithubOutlined /> 开源地址
            </>
          ),
          href: 'https://github.com/shenzehui/',
          blankTarget: true,
        },
        {
          key: '3',
          title: (
            <>
              <CrownOutlined /> Java达摩院
            </>
          ),
          href: 'http://120.55.86.83/',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default GlobalFooter;
