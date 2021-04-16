import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';

export default function Header() {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );
  return (
    <div>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <h2>{site.siteMetadata.title}</h2>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link className="navbar-item" to="/">主页</Link>
            <Link className="navbar-item" to="/leetcode">力扣解题</Link>
            <Link className="navbar-item" to="/notes">读书笔记</Link>
            <Link className="navbar-item" to="/styles">规范</Link>
            <Link className="navbar-item" to="/books">好书推荐</Link>
            <Link className="navbar-item" to="/">RSS</Link>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="field">
                <p className="control has-icons-left has-icons-right">
                  <input className="input" type="input" placeholder="检索" />
                  <span className="icon is-small is-left">
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}