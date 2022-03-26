/** @type {import('next-sitemap').IConfig} */
const NextSitemapConfig = {
  siteUrl: process.env.SITE_URL || 'https://minoscompare.com',
  generateRobotsTxt: true,
};

module.exports = NextSitemapConfig;
