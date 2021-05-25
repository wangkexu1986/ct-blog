import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { Link } from 'gatsby';

const menu = [
  { name: '全部', key: 'all'},
  { name: 'JavaScript', key: 'javascript'},
  { name: 'CSS', key: 'css' },
  { name: 'React', key: 'react' },
  { name: '算法', key: 'algorithm' },
  { name: 'Nodejs', key: 'nodejs' },
  { name: 'Mongodb', key: 'mongodb' },
  { name: 'iOS', key: 'ios' },
  { name: 'AWS', key: 'aws' },
  { name: 'Linux', key: 'linux' },
  { name: '工具', key: 'tool' },
  { name: '其他', key: 'other' },
];

const CNav = ({ location }) => {

  const { pathname } = location || {};
  const [selectedMenu, setSelectedMenu] = useState(['all']);

  useEffect(() => {
    const [pre, url, path, path2, ...other] = pathname.split('/');
    if (url === 'ct-blog') {
      setSelectedMenu([path2]);
    } else {
      setSelectedMenu([path]);
    }
  }, [pathname]);

  return (
    <Menu mode="horizontal" className='nav' selectedKeys={selectedMenu}>
      {menu.map((m) =>
        <Menu.Item key={m.key}>
          <Link to={`/blog/${m.key}/1`}>{m.name}</Link>
        </Menu.Item>
      )}
    </Menu>
  )
};

export default CNav;
