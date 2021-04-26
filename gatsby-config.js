require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: "CT团队",
    description: "技术博客",
    keywords: ["技术", "团队", "React", "前端"]
  },
  pathPrefix: "/ct-blog",
  plugins: [
    {
      resolve: `gatsby-plugin-less`,
      options: {
        cssLoaderOptions: {
          camelCase: false,
        },
      },
    },
    "gatsby-plugin-postcss",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-highlight-code`,
            options: {
              terminal: `carbon`,
              lineNumbers: true,
            },
          },
          {
            resolve: `gatsby-remark-relative-images`,
            options: {
              staticFolderName: `${process.env.GATSBY_SITE_BASE_URL}static`,
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
          "gatsby-remark-autolink-headers",
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
          "gatsby-plugin-use-query-params"
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
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "leetcode",
        path: "./content/leetcode/",
      },
    }
  ],
};
