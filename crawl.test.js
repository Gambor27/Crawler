const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl')
const {getURLsFromHTML } = require('./crawl')

test ('format https://url.com/path/ correctly', () => {
    expect(normalizeURL('https://url.com/path/')).toBe('url.com/path')
})

test ('format https://url.com/path correctly', () => {
    expect(normalizeURL('https://url.com/path')).toBe('url.com/path')
})

test ('format http://URL.com/path/ correctly', () => {
    expect(normalizeURL('http://URL.com/path/')).toBe('url.com/path')
})

test ('format https://url.com/path/ correctly', () => {
    expect(normalizeURL('https://url.com/path')).toBe('url.com/path')
})

test ('format \'https://url.com/path/ \' correctly', () => {
    expect(normalizeURL('https://url.com/path/ ')).toBe('url.com/path')
})

test ('format https://url.com/ correctly', () => {
    expect(normalizeURL('https://url.com/')).toBe('url.com')
})

test ('find URL in <a href="https://boot.dev">Learn</a>', () => {
    expect(getURLsFromHTML('<a href="https://boot.dev">Learn</a>', 'https://boot.dev')).toEqual(['https://boot.dev/'])
})

test ('find URL in <a href="./boot">Learn</a>', () => {
    expect(getURLsFromHTML('<a href="/boot">Learn</a>', 'https://boot.dev')).toEqual(['https://boot.dev/boot'])
})

test ('find URL in <a href="https://boot.dev/boot">Learn</a>', () => {
    expect(getURLsFromHTML('<a href="https://boot.dev/boot">Learn</a>', 'https://boot.dev')).toEqual(['https://boot.dev/boot'])
})

test ('find URL in <a href="https://boot.dev/boot">Learn</a><a href="https://boot.dev">Learn</a>', () => {
    expect(getURLsFromHTML('<a href="https://boot.dev/boot">Learn</a><a href="https://boot.dev">Learn</a>', 'https://boot.dev')).toEqual(['https://boot.dev/boot','https://boot.dev/'])
})