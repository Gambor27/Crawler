function printReport(pages) {
    console.log("Writing Report To File...")
    //sort
    for (page in pages) {
        writeFile("./report.txt", `${page} found ${pages[page]} times`, {flag: a})
    }
    console.log("Report Complete")
}

module.exports = {
    printReport
}