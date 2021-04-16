module.exports = {
  siteMetadata: {
    title: "梦创大连CT团队",
    description: "技术博客",
    keywords: ["技术", "团队", "React", "前端"]
  },
  pathPrefix: "/ct-blog",
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-remark",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    }
  ],
};
