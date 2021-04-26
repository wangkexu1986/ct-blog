import React from 'react';
import { Menu } from 'antd';
import { Link } from 'gatsby';

const menu = [
  { name: '全部', key: 'all'},
  { name: 'JavaScript', key: 'javascript'},
  { name: 'CSS', key: 'css' },
  { name: 'React', key: 'react' },
  { name: 'TypeScript', key: 'typescript' },
  { name: 'Nodejs', key: 'nodejs' },
  { name: 'Mongodb', key: 'mongodb' },
  { name: 'iOS', key: 'ios' },
  { name: 'AWS', key: 'aws' },
  { name: 'Linux', key: 'linux' },
  { name: '工具', key: 'tool' },
  { name: '其他', key: 'other' },
];

const CNav = (props) => {
  return (
    <Menu mode="horizontal" className='nav'>
      {menu.map((m) =>
        <Menu.Item key={m.key}>
          <Link to={`/blog/${m.key}/1`}>{m.name}</Link>
        </Menu.Item>
      )}
    </Menu>
  )
};

export default CNav;
