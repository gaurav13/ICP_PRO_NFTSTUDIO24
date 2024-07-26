const fs = require('fs');
const path = require('path');
const LANG = 'en';
const siteUrl = LANG=="en"?'https://pro.nftstudio24.com/':'https://jp.nftstudio24.com/';


let firstPartOfMain = `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="/main-sitemap.xsl"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
const lastPart = `</sitemapindex>
              `;
let firstPartOfPages = `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="/page_sitemap.xsl"?>
 <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
 `;
const {
  getArticlesSlugs,
  getPodcastsSlugs,
  getEventsSlugs,
  getDirectoriesSlugs,
} = require('./EntriesSlugs');
/**
 * getArticleSitemap use to generate sitemap of aricles
 * @returns generate sitemap of all articles and return
 */
async function getArticleSitemap() {
  const articles = await getArticlesSlugs();
  let data = generateSiteMapDynamic(articles, 'article/');
  return data;
}
/**
 * getPodcastSitemap use to generate sitemap of podcast
 * @returns generate sitemap of all podcast and return
 */
async function getPodcastSitemap() {
  const podcasts = await getPodcastsSlugs();
  let data = generateSiteMapDynamic(podcasts, 'podcast/');
  return data;
};
/**
 * getEventsSitemap use to generate sitemap of events
 * @returns generate sitemap of all events and return
 */
async function getEventsSitemap() {
  const events = await getEventsSlugs();

  let data = generateSiteMapDynamic(events, 'event-details/');
  return data;
};
/**
 * getDirectorySitemap use to generate sitemap of directories
 * @returns generate sitemap of all directories and return
 */
async function getDirectorySitemap() {
  const web3 = await getDirectoriesSlugs();
  let data = generateSiteMapDynamic(web3, 'directory/');
  return data;
}
function generateSiteMapDynamic(pages, pagename) {
  let xml = firstPartOfPages;
  const formattedDate = '2024-04-24T12:24:24.000+00:00';
  pages.forEach((page) => {
    xml += `
           <url>
		       <loc>${siteUrl + pagename + page.slug}</loc>
		       <lastmod>${page.modDate ?? formattedDate}</lastmod>
	         </url>
           `;
  });
  xml += `</urlset>`;
  return xml;
}
async function getServerSideSitemap() {
  const articleSitemap = await getArticleSitemap();
  const podcastSitemap = await getPodcastSitemap();
  const eventsSitemap = await getEventsSitemap();
  const directorySitemap = await getDirectorySitemap();

  const sitemaps = [
    { fileUrl: 'article-sitemap.xml', data: articleSitemap },
    { fileUrl: 'podcast-sitemap.xml', data: podcastSitemap },
    { fileUrl: 'event-sitemap.xml', data: eventsSitemap },
    { fileUrl: 'web3directory-sitemap.xml', data: directorySitemap },
  ];

  return sitemaps;
};
/**
 * generateSitemap use to generate sitemap of static pages
 * @returns generate sitemap of all static pages and return
 */
async function generateSitemap() {
  const pagesFilePath = './public/page-sitemap.xml';


  if(LANG=="jp"){
    const pages = [
      'disclaimer',
      'editor-policy',
      'terms-of-use',
      'privacy-policy',
      'contact-us',
      'careers',
      'hinza-asif',
      'events',
      'web3-directory',
      'podcasts',
      'press-release',
      '',
    ];
  
    const sitemap = generateSitemapXml(pages);
    fs.writeFileSync(path.resolve(pagesFilePath), sitemap);
  }else{

if (fs.existsSync(pagesFilePath)) {
  fs.unlinkSync(pagesFilePath);
}
  }
  let newdata = await getServerSideSitemap();
  let sitaMapLink = ['page-sitemap.xml'];
  newdata.forEach((e) => {
    let data = e.data.toString();
    sitaMapLink.push(e.fileUrl);
    fs.writeFileSync(path.resolve(`./public/${e.fileUrl}`), data);
  });
  let sitemapLinkForMain = generateSitemapXmlMain(sitaMapLink);
  fs.writeFileSync(path.resolve(`./public/sitemap.xml`), sitemapLinkForMain);
}
function generateSitemapXml(pages) {
  let creationDate = '2024-04-24T12:24:24.000+00:00';
  let xml = firstPartOfPages;
  pages.forEach((page) => {
    xml += `
       <url>
		   <loc>${siteUrl + page}</loc>
		   <lastmod>${creationDate}</lastmod>
	     </url>
       `;
  });
  xml += `</urlset>`;
  return xml;
}
function generateSitemapXmlMain(pages) {
  let creationDate = '2024-04-24T12:24:24.000+00:00';
  let xml = firstPartOfMain;
  pages.forEach((page) => {
    xml += `	
    <sitemap>
		<loc>${siteUrl + page}</loc>
		<lastmod>${creationDate}</lastmod>
	</sitemap>
  `;
  });
  xml += lastPart;
  return xml;
};
/**
 * generateRobotsFile use to generate robots file
 * @returns generate sitemap of robots file and create a new file with name robots.txt in public directory 
 */
function generateRobotsFile() {
  let data = `# *
  User-agent: *
  Allow: /
  
  # Host
  Host: ${siteUrl}
  
  # Sitemaps
  Sitemap: ${siteUrl}sitemap.xml
  `;
  fs.writeFileSync(path.resolve(`./public/robots.txt`), data);
}

generateRobotsFile();
generateSitemap();
