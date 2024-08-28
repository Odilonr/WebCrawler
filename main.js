import {JSDOM} from 'jsdom';
console.log('hello world');

const dom = new JSDOM(`<a href="https://boot.dev">Learn Backend Development</a>
                        <a href="https://boot.dev/home">Courses</a>
                        <a href="/python">Courses</a>`);
const anchors = dom.window.document.querySelectorAll('a');

for (let anchor of anchors) {
    try {
        new URL(anchor.href)
        console.log(`Absolute url: ${anchor.href}`);
    } catch(err) {
        let fullURL = 'https://boot.dev' + anchor.href
        console.log(`Relative url: ${fullURL}`);
    }
    
}