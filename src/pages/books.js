import React from 'react';
import { Row } from 'antd';

import Layout from '../components/layout';
import FBook1 from "../images/html_and_css.jpeg";
import FBook2 from "../images/js_4th.jpeg";
import FBook3 from "../images/jom.jpeg";
import FBook4 from "../images/js_fw.jpeg";
import FBook5 from "../images/css.jpeg";
import FBook6 from "../images/css_2.jpeg";
import FBook7 from "../images/css_secrets.jpeg";
import FBook8 from "../images/nodejs.jpeg";
import FBook9 from "../images/make_me.jpeg";
import FBook10 from "../images/pro.jpeg";
import PBook1 from "../images/a_4th.jpeg";
import PBook2 from "../images/a_3th.jpeg";
import PBook3 from "../images/site.jpeg";
import PBook4 from "../images/re_2th.jpeg";
import PBook5 from "../images/p_2th.jpeg";
import PBook6 from "../images/clean_code.jpeg";
import PBook7 from "../images/clean_code_p.jpeg";
import PBook8 from "../images/clean_arch.jpeg";
import PBook9 from "../images/soft_skill.jpeg";
import PBook10 from "../images/dp.jpeg";
import WBook1 from "../images/7.jpeg";
import WBook2 from "../images/minto.jpeg";
import WBook3 from "../images/effect.jpeg";
import WBook4 from "../images/m.jpeg";
import WBook5 from "../images/btl.jpeg";
import WBook6 from "../images/q.jpeg";
import WBook7 from "../images/light.jpeg";
import WBook8 from "../images/pm.jpeg";
import WBook9 from "../images/rework.jpeg";
import WBook10 from "../images/sq.jpeg";

const books = [
  {
    name: "前端",
    books: [
      { name: '《HTML & CSS设计与构建网站》', img: FBook1 },
      { name: '《JavaScript高级程序设计》', img: FBook2 },
      { name: '《JavaScript DOM编程艺术》', img: FBook3 },
      { name: '《javascript 框架设计》', img: FBook4 },
      { name: '《CSS权威指南》', img: FBook5 },
      { name: '《精通CSS》', img: FBook6 },
      { name: '《CSS揭秘》', img: FBook7 },
      { name: '《深入浅出Node.js》', img: FBook8 },
      { name: '《点石成金：访客至上的网页设计秘笈》', img: FBook9 },
      { name: '《启示录：打造用户喜爱的产品》', img: FBook10 },
]
},
  {
    name: "编程",
    books: [
      { name: '《算法》', img: PBook1 },
      { name: '《算法导论》', img: PBook2 },
      { name: '《大型网站技术架构》', img: PBook3 },
      { name: '《重构 改善既有代码的设计》', img: PBook4 },
      { name: '《程序员修炼之道：从小工到专家》', img: PBook5 },
      { name: '《代码整洁之道》', img: PBook6 },
      { name: '《代码整洁之道：程序员的职业素养》', img: PBook7 },
      { name: '《架构整洁之道》', img: PBook8 },
      { name: '《软技能 代码之外的生存指南》', img: PBook9 },
      { name: '《设计模式：可复用面向对象软件的基础》', img: PBook10 },
    ]
  },
  {
    name: "职场",
    books: [
      { name: '《高效能人士的七个习惯》', img: WBook1 },
      { name: '《金字塔原理》', img: WBook2 },
      { name: '《卓有成效的管理者》', img: WBook3 },
      { name: '《卓有成效管理者的实践》', img: WBook4 },
      { name: '《基业长青》', img: WBook5 },
      { name: '《奇特的一生》', img: WBook6 },
      { name: '《你的灯亮着吗》', img: WBook7 },
      { name: '《你的知识需要管理》', img: WBook8 },
      { name: '《重来》', img: WBook9 },
      { name: '《学会提问》', img: WBook10 }
    ]
  }
];

const Books = ({location}) => {
  return (
    <Layout title='好书推荐' location={location}>
      {
        books.map(({name, books}) => {
          return (
            <div key={name}>
              <div>{name}</div>
              <Row>
                {
                  books.map(b => {
                    return (
                      <div key={b.name} style={{padding: 16}}>
                        <img src={b.img} alt={b.name} width={135} height={ 200 }/>
                        {/*<h5>{b.name}</h5>*/}
                      </div>
                    )
                  })
                }
              </Row>
            </div>
            );
        })
      }
    </Layout>
  )
};

export default Books;
