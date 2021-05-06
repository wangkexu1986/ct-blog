import React, { useState } from 'react';
import { Row, Col, Card, Progress, Select} from 'antd';
import { useStaticQuery, graphql } from 'gatsby';

const { Option } = Select;

const monthMap = [
  { key: '01', value: '1月' },
  { key: '02', value: '2月' },
  { key: '03', value: '3月' },
  { key: '04', value: '4月' },
  { key: '05', value: '5月' },
  { key: '06', value: '6月' },
  { key: '07', value: '7月' },
  { key: '08', value: '8月' },
  { key: '09', value: '9月' },
  { key: '10', value: '10月' },
  { key: '11', value: '11月' },
  { key: '12', value: '12月' },
  { key: '13', value: '合计' },
];

function G3() {
  const [year, setYear] = useState(new Date().getFullYear());
  const { allFile } = useStaticQuery(
    graphql`
      query MonthCount {
        allFile(
          filter: {sourceInstanceName: {eq: "blog"}, childMarkdownRemark: {html: {ne: ""}}}
        ) {
          edges {
            node {
              id
              childrenMarkdownRemark {
                frontmatter {
                  date(formatString: "YYYY/MM")
                }
              }
            }
          }
        }
      }
    `
  );

  const postCount = {};
  allFile.edges.forEach(({ node }) => {
    const p = node.childrenMarkdownRemark;
    if (p && p.length > 0) {
      const { frontmatter } = p[0];
      const [year, month] = frontmatter.date.split('/');
      postCount[year] = postCount[year] || { '01': 0, '02': 0, '03': 0, '04': 0, '05': 0, '06': 0, '07': 0, '08': 0, '09': 0, '10': 0, '11': 0, '12': 0 };
      postCount[year][month] += 1;
    }
  });

  let count = 0;
  monthMap.forEach((t) => {
    if (postCount[year]) {
      count = count + (postCount[year][t.key] || 0)
    }
  });

  return (
    <div className="g3">
      <Card title="月次文章" extra={
        <Select
          size="small"
          value={year}
          bordered={false}
          onSelect={(v) => setYear(v)}
        >
          {Object.keys(postCount).map((y) =>{
            return <Option key={y} value={y}>{y}</Option>
          })}
        </Select>
      }>
        {monthMap.map(({ key, value }) => {
          let per = 0;
          if (key === '13') {
            postCount[year][key] = count;
          }
          if (count > 0 && postCount[year]) {
            per =  (postCount[year][key] / count) * 100;
          }

          return (
            <Row span={24}>
              <Col span={4}>
                <h4>{value}</h4>
              </Col>
              <Col span={20}>
                <Progress
                  key={key}
                  type="line"
                  percent={per}
                  strokeColor="#9254de"
                  style={{opacity: "0.6"}}
                  format={(p) => {
                    return `${postCount[year][key]} 篇`
                  }}
                />
              </Col>
            </Row>
            )

        })}
      </Card>
    </div>
  )
}

export default G3;
