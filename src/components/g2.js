import React, { useState } from 'react';
import { Card, Select } from 'antd';
import { useStaticQuery, graphql } from 'gatsby';

const { Option } = Select;

const weekMap = [
  { key: '1', value: '星期一' },
  { key: '2', value: '星期二' },
  { key: '3', value: '星期三' },
  { key: '4', value: '星期四' },
  { key: '5', value: '星期五' },
  { key: '6', value: '星期六' },
  { key: '7', value: '星期日' },
];

function G2() {
  const [year, setYear] = useState(new Date().getFullYear());
  const { allFile } = useStaticQuery(
    graphql`
      query WeekCount {
        allFile(
          filter: {sourceInstanceName: {eq: "blog"}, childMarkdownRemark: {html: {ne: ""}}}
        ) {
          edges {
            node {
              id
              childrenMarkdownRemark {
                frontmatter {
                  date(formatString: "YYYY/E")
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
      const [year, week] = frontmatter.date.split('/');
      postCount[year] = postCount[year] || { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0 };
      postCount[year][week] += 1;
    }
  });
  return (
    <div className="g2">
      <Card title="周投稿统计" extra={
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
        {weekMap.map(({ key, value }) => {
          return <p key={key}>{value}: {postCount[year] ? postCount[year][key] : 0}</p>
        })}
      </Card>
    </div>
  )
}

export default G2;
