import React, { useState } from 'react';
import { Card, Select } from 'antd';
import { useStaticQuery, graphql } from 'gatsby';

const { Option } = Select;

const monthMap = [
  { key: '01', value: '一月' },
  { key: '02', value: '二月' },
  { key: '03', value: '三月' },
  { key: '04', value: '四月' },
  { key: '05', value: '五月' },
  { key: '06', value: '六月' },
  { key: '07', value: '七月' },
  { key: '08', value: '八月' },
  { key: '09', value: '九月' },
  { key: '10', value: '十月' },
  { key: '11', value: '十一月' },
  { key: '12', value: '十二月' },
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
  console.log(postCount);
  return (
    <div className="g3">
      <Card title="月投稿统计" extra={
        <Select
          size="small"
          value={year}
          onSelect={(v) => setYear(v)}
        >
          {Object.keys(postCount).map((y) =>{
            return <Option key={y} value={y}>{y}</Option>
          })}
        </Select>
      }>
        {monthMap.map(({ key, value }) => {
          return <p key={key}>{value}: {postCount[year] ? postCount[year][key] : 0}</p>
        })}
      </Card>
    </div>
  )
}

export default G3;
