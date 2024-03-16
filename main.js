const { crawlPage } = require('./crawl')
const { printReport } = require('./report.js')

async function main() {
    const pages = {}
    if (process.argv.length === 2) {
        throw new Error('Base URL argument needed')
    } else if (process.argv.length === 3) {
        const output = await crawlPage(process.argv[2], process.argv[2], pages)
        printReport(output)
    } else {
        throw new Error('Unexpected argument, only Base URL accepted')
    }
}

main()
