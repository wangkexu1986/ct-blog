import React, { useState, useEffect } from 'react';
import { Menu, Layout, Input, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Header } = Layout;

const menu = [
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
