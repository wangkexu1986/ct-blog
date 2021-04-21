module.exports = {
  siteMetadata: {
    title: "CT团队",
    description: "技术博客",
    keywords: ["技术", "团队", "React", "前端"]
  },
  pathPrefix: "/ct-blog",
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-relative-images`,
            options: {
              staticFolderName: 'ct-blog/static',
            },
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: "gatsby-remark-responsive-iframe",
            options: {
              wrapperStyle: "margin-bottom: 1.0725rem",
            },
          },
          "gatsby-remark-prismjs",
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants",
          {
            resolve: "gatsby-remark-autolink-headers",
            options: {
              offsetY: `100`,
              maintainCase: false,
              removeAccents: true,
            },
          },
        ],
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: "./content/blog/",
      },
    }
  ],
};
