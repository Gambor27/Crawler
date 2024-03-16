const { JSDOM } = require('jsdom')


function normalizeURL(url){
    const parsedURL = new URL(url)
    const output = `${parsedURL.hostname}${parsedURL.pathname}`
    if (output.endsWith('/')) {
        return output.slice(0, -1)        
    } else {
        return output
    }
}

function getURLsFromHTML(htmlBody, baseURL) {
    const page = new JSDOM(htmlBody)
    const aTags = page.window.document.querySelectorAll('a')
    const tagStrings = Array.from(aTags).map(tag => tag.href)
    const outputStrings = []
    for (let tag of tagStrings) {
        if (tag.startsWith('/')) {
            outputStrings.push(`${baseURL}${tag}`)
        } else {
            outputStrings.push(tag)
        }
    }
    return outputStrings
}

async function crawlPage(baseURL, currentURL, pages) {
    baseURLParsed = new URL(baseURL)
    currentURLParsed = new URL(currentURL)
    if (baseURLParsed.hostname != currentURLParsed.hostname) {
        return pages
    }
    normalizedURL = normalizeURL(currentURL)
    if (pages[normalizedURL]) {
        pages[normalizedURL]++
        return pages
    } else {
        pages[normalizedURL] = 1
    }
    console.log(`Crawling ${currentURL}...`)
    try{
        const data = await fetch(currentURL, {
            method: 'GET',
            mode: 'cors',
          })
        const page = await data.text()
            if (data.status >= 400) {
                console.log(`HTTP Error:${page.status}`)
                return pages
            } else if (!data.headers.get('content-type').startsWith('text/html')) {
                console.log(data.headers.get('content-type'), currentURL)
                return pages
            } else {
                links = getURLsFromHTML(page, baseURL)
                promises = links.map( link => crawlPage(baseURL, link, pages))
                await Promise.all(promises)
            }
        } catch(err) {
            throw new Error(`Crawl failed: ${err}`)
            }
    return pages
}

module.exports = {
    normalizeURL, getURLsFromHTML, crawlPage
}