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

async function crawlPage(baseURL, currentURL = baseURL, pages={}) {
    if (!currentURL.includes(baseURL)) {
        return pages
    }

    const urlNormalized = normalizeURL(currentURL)
    

    if (pages[urlNormalized] >0) {
        pages[urlNormalized]++
        return pages
    }
    
    pages[urlNormalized] = 1
    
    const htmlBody = await fetchPage(currentURL)
    const urlsFromHtml = getURLsFromHTML(htmlBody,currentURL) 
    for (let url of urlsFromHtml) {
        pages = await crawlPage(baseURL, url, pages)
        }
    
    return pages
}





async function fetchPage(currentURL) {
    try {
        const response = await fetch(currentURL);
        const contentType = response.headers.get("content-type")

        if (!contentType.includes('text/html')) {
            console.log("Not html")
            return
        }
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }

        const htmlBody = await response.text()
        return htmlBody

    } catch(err) {
        console.log(err.message)
    }
}

export {normalizeURL, getURLsFromHTML,crawlPage};
