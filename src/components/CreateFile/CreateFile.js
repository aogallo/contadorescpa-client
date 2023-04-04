import React, { useState } from 'react'
import { useLazyQuery } from '@apollo/client'

const CreateFile = ({ createReportQuery, filename, domain, format, startDate, endDate }) => {
  const [createReport, { data }] = useLazyQuery(createReportQuery, {
  })
  const [labelButton, setLabelButton] = useState('Descargar archivo')

  const creacteCsvFile = (data) => {
    const csvRows = []
    const headers = Object.keys(data[0])
    headers.shift()
    csvRows.push(headers.join(','))

    for (const row of data) {
      const values = headers.map(header => {
        const espaced = ('' + row[header]).replace(/"/g, '\\"')
        return `"${espaced}"`
      })
      csvRows.push(values.join(','))
    }

    return csvRows.join('\n')
  }

  const download = (data) => {
    const blob = new Blob([data], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.setAttribute('hidden', '')
    a.setAttribute('href', url)
    a.setAttribute('download', filename)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const handleDownloadReport = async () => {
    setLabelButton('Procesando archivo')
    await createReport({
      variables: {
        report: {
          domain,
          format,
          startDate,
          endDate
        }
      }
    }).then(() => {
      if (data.createReport.length === 0) {
        // TODO: send message that the results is empy
        setLabelButton('Descargar archivo')
        return false
      }
      const csvData = creacteCsvFile(data.createReport)
      console.log('onCompleted', csvData)
      download(csvData)
      setLabelButton('Descargar archivo')
    })
  }

  return (
    <button
      className='btn title__button title__button--green'
      onClick={handleDownloadReport}
    >
      {labelButton}
    </button>
  )
}

export default CreateFile
