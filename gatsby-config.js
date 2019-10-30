module.exports = {
  siteMetadata: {
    siteUrl: `https://beta.frontendlondon.co.uk`,
    title: `Front-end London`,
    description: `Front-end London is a monthly developer meetup in London hosted by Made by Many.`,
    author: `@madebymany`,
    image: `/share-16x9.jpg`,
    menuLinks: [
      {
        name: "Give a talk at FEL",
        link: "/#give-a-talk",
      },
      {
        name: "Past talks",
        link: "/archive/",
      },
    ],
    socialLinks: [
      {
        brand: "Youtube",
        icon: "youtube.svg",
        link: "https://youtube.com/channel/UC1PDeJmj9CvLl77PYezDvWQ",
      },
      {
        brand: "Twitter",
        icon: "twitter.svg",
        link: "https://twitter.com/frontendlondon",
      },
      {
        brand: "Instagram",
        icon: "instagram.svg",
        link: "https://instagram.com/frontendlondon",
      },
    ],
    privacyPolicy: "https://www.iubenda.com/privacy-policy/92517840",
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-preload-fonts`,
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
        name: `Front-end London`,
        short_name: `FEL`,
        description: `Front-end London is a monthly developer meetup in London hosted by Made by Many.`,
        start_url: `/`,
        background_color: "#FA3000",
        theme_color: "#FFF",
        display: `minimal-ui`,
        icon: `assets/images/favicon.png`,
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /icons/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-37222208-1",
        head: false,
        anonymize: true,
        respectDNT: true,
        pageTransitionDelay: 1400,
        siteSpeedSampleRate: 10,
      },
    },
    // {
    //   resolve: `gatsby-plugin-offline`,
    //   options: {
    //     precachePages: [`/`],
    //   },
    // },
  ],
}
