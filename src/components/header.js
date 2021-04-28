import React, { useState, useEffect } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { Menu, Layout, Row, Col } from 'antd';

import Search from "./search"
import Logo from '../images/logo.png';

const { Header } = Layout;
const searchIndices = [{ name: `Pages`, title: `Pages` }];

const menu = [
  { name: '主页', href: "/blog/all/1", key: 'blog'},
  { name: '力扣解题', href: "/leetcode/1", key: 'leetcode' },
  { name: '读书笔记', href: "/notes", key: 'notes' },
  { name: '编码规范', href: "/styles", key: 'styles' },
  { name: '好书推荐', href: "/books", key: 'books' },
];

const CHeader = ({ location }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );
  const { pathname } = location || {};
  const [selectedMenu, setSelectedMenu] = useState(['blog']);

  useEffect(() => {
    try {
      const [pre, url, path, ...other] = pathname.split('/');
      if (url === 'ct-blog') {
        setSelectedMenu([path]);
      } else {
        setSelectedMenu([url]);
      }
    } catch (e) {
      setSelectedMenu(['blog']);
    }

  }, [pathname]);

  return (
    <Header className="header">
      <Row gutter={24} className="header-container">
        <Col span={4} offset={1}>
          <div className="logo">
            <Link to={`/blog/all/1`}>
              <img src={Logo} alt={site.siteMetadata.title} width={120} height={52}/>
            </Link>
          </div>
        </Col>
        <Col span={12}>
          <Menu mode="horizontal" selectedKeys={selectedMenu}>
            {menu.map((m) =>
              <Menu.Item key={m.key}>
                <Link to={m.href}>{m.name}</Link>
              </Menu.Item>
            )}
          </Menu>
        </Col>
        <Col span={6}>
          {/*<Input size="middle" placeholder="检索" prefix={<SearchOutlined />} />*/}
          <Search indices={searchIndices} />
        </Col>
      </Row>
    </Header>
  )
};

export default CHeader;
