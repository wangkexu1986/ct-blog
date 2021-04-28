import React, { useState } from 'react';
import { Card, Select } from 'antd';
import { useStaticQuery, graphql } from 'gatsby';

const { Option } = Select;

function G1() {
  const [year, setYear] = useState(new Date().getFullYear());
  const { allFile } = useStaticQuery(
    graphql`
      query WordCount {
        allFile(
          filter: {sourceInstanceName: {eq: "blog"}, childMarkdownRemark: {html: {ne: ""}}}
        ) {
          edges {
            node {
              id
              childrenMarkdownRemark {
                wordCount {
                  words
                }
                frontmatter {
                  date(formatString: "YYYY")
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
      const { frontmatter, wordCount } = p[0];
      postCount[frontmatter.date] = postCount[frontmatter.date] || { count: 0, words: 0 };
      postCount[frontmatter.date].count += 1;
      postCount[frontmatter.date].words += wordCount.words;
    }
  });
  return (
    <div className="g1">
      <Card title="投稿统计" extra={
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
        <p>投稿数：{ postCount[year] ? postCount[year].count : 0 }</p>
        <p>字数：{ postCount[year] ? postCount[year].words : 0 }</p>
      </Card>
    </div>
  )
}

export default G1;
