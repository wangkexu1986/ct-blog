import React from 'react';
import { Link } from "gatsby";
import { Timeline } from 'antd';

import Layout from '../components/layout';

const notes = [
  {
    year: '2021',
    books: [

    ]
  },
  {
    year: '2020',
    books: [

    ]
  },
  {
    year: '2019',
    books: [
      { name: '你不知道的JavaScript(下卷)', path: '', date: '2019/11' },
      { name: '你不知道的JavaScript(中卷)', path: '', date: '2019/10' },
      { name: '你不知道的JavaScript(上卷)', path: '', date: '2019/08' },
      { name: '代码整洁之道 程序员的职业素养', path: '', date: '2019/06' },
      { name: '重构 改善既有代码的设计 第2版', path: '', date: '2019/05' },
      { name: '程序员的修炼之道', path: '', date: '2019/04' },
    ]
  },
  {
    year: '2018',
    books: [
      { name: '设计模式', path: '', date: '2018/05' },
    ]
  },
];

const Notes = ({location}) => {
  return (
    <Layout title='读书笔记' location={location}>
      {
        notes.map(n => {
          return (
            <div key={n.year} className="notes">
              <div className="title">{n.year}年</div>
              <Timeline mode="left" className="note-list">
                {
                  n.books.map(b => {
                    return (
                      <Timeline.Item color="purple" label={`${b.date.split('/')[1]}月`} key={b.name}>
                        <Link to={`/notes/${b.name}/1`}>{b.name}</Link>
                      </Timeline.Item>
                    );
                  })
                }
              </Timeline>
            </div>
          );
        })
      }
    </Layout>
  )
};

export default Notes;
