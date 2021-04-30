import React, { useState } from 'react';
import { Card, Select, Progress } from 'antd';
import { useStaticQuery, graphql } from 'gatsby';

import { TypeColor } from "../utils/constants";

const { Option } = Select;

const BlogType = [
  { key: '学习整理', value: '学习整理' },
  { key: '问题解决', value: '问题解决' },
  { key: 'BUG复盘', value: 'BUG复盘' },
  { key: '未指定', value: '未指定' },
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
                  date(formatString: "YYYY")
                  type
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
      const { date } = frontmatter;
      let type = frontmatter.type || "未指定";
      postCount[date] = postCount[date] || { '学习整理': 0, '问题解决': 0, 'BUG复盘': 0, '未指定': 0 };
      postCount[date][type] += 1;
    }
  });

  let count = 0;
  BlogType.forEach((t) => {
    if (postCount[year]) {
      count = count + postCount[year][t.key]
    }
  });
  return (
    <div className="g2">
      <Card title="投稿类型" extra={
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
        {BlogType.map(({ key, value }) => {
          let per = 0;
          if (count > 0 && postCount[year]) {
            per =  (postCount[year][key] / count) * 100;
          }
          return <Progress
            key={key}
            type="line"
            percent={per}
            strokeColor={TypeColor[key] || "#888282"}
            style={{opacity: "0.6"}}
            format={(p) => {
              return `${postCount[year][key]} 篇`
            }}
          />
        })}
      </Card>
    </div>
  )
}

export default G2;
