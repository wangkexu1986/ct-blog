import React from 'react';
import { Menu } from 'antd';

const menu = [
  { name: '全部', key: 'All'},
  { name: 'JavaScript', key: 'JavaScript'},
  { name: 'CSS', key: 'CSS' },
  { name: 'React', key: 'React' },
  { name: 'TypeScript', key: 'TypeScript' },
  { name: 'Nodejs', key: 'Nodejs' },
  { name: 'Mongodb', key: 'Mongodb' },
  { name: 'iOS', key: 'iOS' },
  { name: 'AWS', key: 'AWS' },
  { name: 'Linux', key: 'Linux' },
  { name: '工具', key: 'tool' },
  { name: '其他', key: 'other' },
];

const CNav = (props) => {
  return (
    <Menu mode="horizontal" className='nav'>
      {menu.map((m) =>
        <Menu.Item key={m.key}>{m.name}</Menu.Item>
      )}
    </Menu>
  )
};

export default CNav;
