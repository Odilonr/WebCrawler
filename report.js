    function printReport(pages) {
        console.log('Report is Starting')
        const pagesSorted = sortPages(pages)
        for (let page of pagesSorted) {
            console.log(`Found ${page[1]} internal links to ${page[0]}`)
        }
    }

    function sortPages(pages) {
        return Object.entries(pages).sort((a,b) => b[1] - a[1])
    }

    export { printReport, sortPages }