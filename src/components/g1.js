import React, { useState } from 'react';
import { Card, Select, Progress, Divider } from 'antd';
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

  let totalWords = 0;
  let totalCount = 0;
  if(postCount[year]) {
    totalWords = postCount[year].words || 0;
    totalCount = postCount[year].count || 0;
  }

  let perWords = 0;
  let per = 0;
  if (totalCount > 0) {
    perWords = (totalWords / totalCount);
    per = (perWords / totalCount) * 100
  }

  return (
    <div className="g1">
      <Card title="文章字数" extra={
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
        <Progress
          type="circle"
          percent={per}
          strokeColor="#9254de"
          style={{opacity: "0.6"}}
          format={(percent) => {
            return (
              <div>
                <h5 style={{marginBottom: "2px"}}>{Math.floor(perWords)}字</h5>
                <Divider style={{margin: "6px 0"}}/>
                <h6 style={{fontSize: "8px"}}>总字数：{ totalWords }字</h6>
              </div>
            )
          }}
        />
      </Card>
    </div>
  )
}

export default G1;
