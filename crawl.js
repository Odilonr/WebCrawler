import { JSDOM } from 'jsdom';

function normalizeURL(url) {
    const normalized = new URL(url)
    return normalized.hostname + removeLastSlash(normalized.pathname)
};

function removeLastSlash(path) {
    if (path.endsWith('/')) {
        return path.slice(0,-1)
    }
    return path
};

function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody);
    const urslList = [];
    const anchorsList = dom.window.document.querySelectorAll('a');

    for (let anchor of anchorsList) {
        try {
            new URL(anchor.href)
            urslList.push(anchor.href)
        } catch(err) {
            let fullURL = removeLastSlash(baseURL) + removeLastSlash(anchor.href)
            urslList.push(fullURL)
        }
    }

    return urslList



};

export {normalizeURL};
export {getURLsFromHTML};