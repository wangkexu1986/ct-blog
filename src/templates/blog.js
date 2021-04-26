import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const Blog = ({ data }) => {
  const post = data.markdownRemark;
  console.log(1, post.tableOfContents);
  return (
    <Layout>
      <div className="blog">
        <div className="blog-title">
          {post.frontmatter.title}
          <div>
            {post.frontmatter.date}
          </div>
        </div>
        <div className="blog-body">
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.html }} />
          <div className="blog-index" dangerouslySetInnerHTML={{ __html: post.tableOfContents }}></div>
        </div>
      </div>
    </Layout>
  )
};

export default Blog;

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
      }
      tableOfContents
    }
  }
`;
