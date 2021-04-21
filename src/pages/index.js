import React from 'react';
import { Link, graphql } from "gatsby"

import Layout from '../components/layout';
import Nav from '../components/nav'
import Card from "../components/card";

const Index = ({ data, location }) => {
  const posts = data.allMarkdownRemark.nodes;

  return (
    <Layout title='主页' location={ location }>
      <Nav/>
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title;

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
};

export default Index;

export const pageQuery = graphql`
  query PostQuery {
    allMarkdownRemark(
      filter: {frontmatter: {category: {eq: "css"}}}
      sort: {fields: frontmatter___date, 
      order: DESC}
    ) {
      nodes {
        excerpt
        frontmatter {
          date
          slug
          title
          category
        }
        fields {
          slug
        }
      }
    }
  }
`;

