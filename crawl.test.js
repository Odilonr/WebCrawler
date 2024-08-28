import { test, expect } from "@jest/globals"
import { normalizeURL } from "./crawl.js"
import { getURLsFromHTML } from "./crawl.js"



test('normalizes https://blog.boot.dev/home/ to blog.boot.dev/home', () => {
    expect(normalizeURL('https://blog.boot.dev/home/')).toEqual('blog.boot.dev/home')
})

test('normalizes https://blog.boot.dev/settings/display to blog.boot.dev/settings/display', () => {
    expect(normalizeURL('http://blog.boot.dev/settings/display')).toEqual('blog.boot.dev/settings/display')
})

test('normalizes https://odilon.com/Lockin/stayhard to odilon.com/Lockin/stayhard', () => {
    expect(normalizeURL('http://odilon.com/Lockin/stayhard')).toEqual('odilon.com/Lockin/stayhard')
})

test('normalizes https://BLOG.boot.dev/path to blog.boot.dev/path', () => {
    expect(normalizeURL('https://BLOG.boot.dev/path')).toEqual('blog.boot.dev/path')
})

test('normalizes http://BLOG.boot.dev/path to blog.boot.dev/path', () => {
    expect(normalizeURL('http://BLOG.boot.dev/path')).toEqual('blog.boot.dev/path')
})

test('testing getting urls from html', () => {
    expect(getURLsFromHTML(`<a href="https://boot.dev/home">Learn Backend Development</a>
                        <a href="/home">/courses</a>`,'https://boot.dev')).toEqual(['https://boot.dev/home',
                        'https://boot.dev/home'])
})

test('testing getting urls from html', () => {
    expect(getURLsFromHTML(`<a href="http://odilon.com/story">Learn Backend Development</a>
                        <a href="/rules/discipline">Every single day</a>
                        <a href="/mindset">It is not meant to be easy</a>`,'http://odilon.com')).toEqual(['http://odilon.com/story',
                        'http://odilon.com/rules/discipline','http://odilon.com/mindset'])
})

test('testing getting urls from html', () => {
    expect(getURLsFromHTML(`<a href="https://boot.dev/">Learn Backend Development</a>
                        <a href="/home">courses</a>`,'https://boot.dev')).toEqual(['https://boot.dev/',
                        'https://boot.dev/home'])
})


test('getURLsFromHTML absolute', () => {
    const inputURL = 'https://blog.boot.dev'
    const inputBody = '<html><body><a href="https://blog.boot.dev"><span>Boot.dev></span></a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ 'https://blog.boot.dev/' ]
    expect(actual).toEqual(expected)
  })
  
  test('getURLsFromHTML relative', () => {
    const inputURL = 'https://blog.boot.dev'
    const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ 'https://blog.boot.dev/path/one' ]
    expect(actual).toEqual(expected)
  })
  
  test('getURLsFromHTML both', () => {
    const inputURL = 'https://blog.boot.dev'
    const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ 'https://blog.boot.dev/path/one', 'https://other.com/path/one' ]
    expect(actual).toEqual(expected)
  })