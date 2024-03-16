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

module.exports = {
    normalizeURL, getURLsFromHTML
}