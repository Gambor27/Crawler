const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl')

test ('format https://url.com/path/ correctly', () => {
    expect(normalizeURL('https://url.com/path/')).toBe('url.com/path')
})

test ('format https://url.com/path correctly', () => {
    expect(normalizeURL('https://url.com/path')).toBe('url.com/path')
})

test ('format http://URL.com/path/ correctly', () => {
    expect(normalizeURL('http://URL.com/path/')).toBe('url.com/path')
})

test ('format http://url.com/path/ correctly', () => {
    expect(normalizeURL('http://url.com/path')).toBe('url.com/path')
})

test ('format \'https://url.com/path/ \' correctly', () => {
    expect(normalizeURL('https://url.com/path/ ')).toBe('url.com/path')
})

test ('format https://url.com/ correctly', () => {
    expect(normalizeURL('https://url.com/')).toBe('url.com')
})