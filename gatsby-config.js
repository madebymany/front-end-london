module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    menuLinks: [
      {
        name: "Return tickets",
        link:
          "https://www.eventbrite.com/support/articles/en_US/How_To/how-to-cancel-your-free-registration",
      },
      {
        name: "Past talks",
        link: "/archive",
      },
    ],
    socialLinks: [
      {
        brand: "Youtube",
        icon: "./assets/images/icons/youtube.svg",
        link: "https://youtube.com/channel/UC1PDeJmj9CvLl77PYezDvWQ",
      },
      {
        brand: "Twitter",
        icon: "./assets/images/icons/twitter.svg",
        link: "https://twitter.com/frontendlondon",
      },
      {
        brand: "Instagram",
        icon: "./assets/images/icons/instagram.svg",
        link: "https://instagram.com/frontendlondon",
      },
    ],
    privacyPolicy: "https://www.iubenda.com/privacy-policy/92517840",
    returnTickets:
      "https://www.eventbrite.com/support/articles/en_US/How_To/how-to-cancel-your-free-registration",
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./content/`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/assets/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#ed4022`,
        theme_color: `#ed4022`,
        display: `minimal-ui`,
        // icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/search/*`] },
    },
    {
      resolve: "gatsby-plugin-transition-link",
      options: {
        layout: require.resolve(`./src/layouts/General.js`),
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
