const { normalizeURL, getURLsFromHTML } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

test('normalizeURL strip protocol', ()=>{
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toBe(expected)
})
test('normalizeURL strip trailing slash', ()=>{
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toBe(expected)
})
test('normalizeURL capitals', ()=>{
    const input = 'https://BLOG.boot.Dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toBe(expected)
})
test('normalizeURL strip http', ()=>{
    const input = 'http://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toBe(expected)
})
test('getURLsFromHTML absolute', ()=>{
    const input = `
    <html>
    <body>
    <a href="https://blog.boot.dev/path">
    Boot Dev blog
    </a>
    </body>
    </html>
    `
    const inputBaseURL = "https://blog.boot.dev/path"
    const actual = getURLsFromHTML(input,inputBaseURL)
    const expected = ["https://blog.boot.dev/path"]
    expect(actual).toStrictEqual(expected)
})
test('getURLsFromHTML relative', ()=>{
    const input = `
    <html>
    <body>
    <a href="/path/">
    Boot Dev blog
    </a>
    </body>
    </html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(input,inputBaseURL)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toStrictEqual(expected)
})

test('getURLsFromHTML both ', ()=>{
    const input = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path1/">
            Boot Dev blog Path one
            </a>
            <a href="/path2/">
            Boot Dev blog Path Two
            </a>
        </body>
    </html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(input,inputBaseURL)
    const expected = ["https://blog.boot.dev/path1/","https://blog.boot.dev/path2/"]
    expect(actual).toStrictEqual(expected)
})
test('getURLsFromHTML invalid', ()=>{
    const input = `
    <html>
        <body>
            <a href="invalid">
            invalid
            </a>
        </body>
    </html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(input,inputBaseURL)
    const expected = []
    expect(actual).toStrictEqual(expected)
})