import React from 'react';
import { Row, Col, Card } from 'antd';


import Layout from '../components/layout';

const codyStyle = [
  {
    name: 'JavaScript规范',
    path: 'https://github.com/airbnb/javascript',
    description: 'ES最新语法的编码规则及最佳实践。'
  },
  {
    name: 'CSS规范',
    path: '',
    description: '包含css原生，less, css in js的写法及多浏览器，响应式等最佳实践。'
  },
  {
    name: 'React规范',
    path: '',
    description: '组件，Hook的编码规则，性能分析和优化方法。'
  },
  {
    name: 'Nodejs规范',
    path: '',
    description: '后端API的开发流程，参数校验规则，推荐的工具库等。'
  },
  {
    name: '单体测试规范',
    path: '',
    description: 'React的单体测试模板，测试点分析，用例写法等最佳实践和API的单体测试模板。'
  },
  {
    name: '工程规范',
    path: '',
    description: '前后端分离的工程规范，包含目录结构，文件命名，工具库，打包，页面组件拆分原则等。'
  }
];

const GuideStyles = ({location}) => {
  return (
    <Layout title='开发规范' location={location}>
      <Row span={24} className="code-styles">
        <p className="title">统一团队编码风格，提升代码可读性和品质</p>
        { codyStyle.map(style => {
          return (
            <Col span={12} className="file">
              <Card title={<a href={style.path} target="_blank">{style.name}</a>}>
                <p>{style.description}</p>
              </Card>
            </Col>
          )
        })}
      </Row>
    </Layout>
  )
};

export default GuideStyles;
