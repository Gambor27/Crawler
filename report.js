const fs = require('fs')


function printReport(pages) {
    console.log("Writing Report To File...")
    let report = ""
    const sortedPages = Object.entries(pages).sort((a, b) => b[1] - a[1])
    for (page in sortedPages) {
        report += `${page} found ${sortedPages[page]} times \n`
    }
    console.log(report)
    fs.writeFile("./report.txt", report, err => {
        if (err) throw err
    })
    console.log("Report Complete")
}

module.exports = {
    printReport
}