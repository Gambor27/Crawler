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

module.exports = {
    normalizeURL
}