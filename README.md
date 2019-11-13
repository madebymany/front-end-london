# Front-end London

[![Netlify Status](https://api.netlify.com/api/v1/badges/4ba00589-d3e6-4901-b0a4-637b726d0b4c/deploy-status)](https://app.netlify.com/sites/compassionate-lalande-3f8721/deploys)

The community website for [FEL](https://frontendlondon.co.uk), an event hosted by [Made by Many](https://www.madebymany.com/).

This site is built with Gatsby and deployed to Netlify.

## Development

1. Install dependencies

```sh
npm install
```

2. Run in development

```sh
npm run start
```

3. Confirm production builds locally when ready to commit

```sh
npm run build
# Launch local webserver
serve public
```

## Adding an Event

1. Add an event json file to the `/content` folder with the relevant talks for that event.
   Image assets should be added to the respective `/assets/images/speakers/**/*/` folder.

2. Test the event by building the project and serving locally.

```sh
npm run start
```

3. Commit to `master` will trigger a build on Netlify.

## Updating past talks

When video/slide assets are ready we can update the past talks with asset links.
Video links that are hosted on Youtube will have their posters pulled automatically during bootstrap. If the video is not hosted on Youtube, you should manually add the video to `/assets/images/posters`.
