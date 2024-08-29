import { argv } from 'node:process';
import { crawlPage} from './crawl.js';

async function main() {
    if (argv.length < 3) {
        console.log('Error: Not enough website provided')
        return
    }
    if (argv.length > 3) {
        console.log('Error: Too many arguments')
        return
    }
    const baseURL = argv[2]
    console.log(`The crawler is starting at ${baseURL}`)
    const myPages = await crawlPage(baseURL)
    console.log(myPages)
    
}

main()