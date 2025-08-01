const $ = document.querySelector.bind(document)

function exportData() {
    const rows = document.getElementsByTagName('tr')
    let csvContent = "data:text/csv;charset=utf-8,"
    
    for(let i = 0; i < rows.length; i++) {
        const cols = rows[i].getElementsByTagName('td')
        const headerCols = rows[0].getElementsByTagName('th')
        let rowData = []
        
        if(i === 0) {
            for(let j = 0; j < headerCols.length; j++) {
                rowData.push(headerCols[j].innerText)
            }
        }
        else {
            for(let j = 0; j < cols.length; j++) {
                rowData.push(cols[j].innerText)
            }
        }
        csvContent += rowData.join(",") + "\r\n"
    }

    const encodedURI = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedURI)
    link.setAttribute("download", "data.csv")
    document.body.appendChild(link)
    link.click()
}

function importData() {
    const fileInput = $('.importFile')
    const file = fileInput.files[0]
    
    if(file) {
        Papa.parse(file, {
            complete: function(results) {
                const data = results.data
                const tbody = document.querySelector('.data-table tbody')
                tbody.innerHTML = ''

                for(let i = 1; i < data.length - 1; i++) {
                    const row = document.createElement('tr')
                    const cells = [data[i][0], data[i][1], data[i][2]]
                    
                    cells.forEach(item => {
                        const td = document.createElement('td')
                        td.textContent = item
                        row.appendChild(td)
                    })
                    tbody.appendChild(row)
                }
            }
        })
    }
    
}