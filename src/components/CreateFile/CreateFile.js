import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client';
import { CREATE_REPORT } from 'graphql/Report/queries';

const CreateFile = ({ filename, domain, format, startDate, endDate }) => {
  const [createReport, { data, called, loading }] = useLazyQuery(CREATE_REPORT)
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
    a.click();
    document.body.removeChild(a)
  }

  const handleDownloadReport = async () => {
    setLabelButton('Procesando archivo')
    await createReport({
      variables: {
        report: {
          domain: 'accountPayable',
          format: 'csv'
        }
      }
    })
    const csvData = creacteCsvFile(data.createReport)
    download(csvData)
    setLabelButton('Descargar archivo')
  }

  return (
    <button onClick={handleDownloadReport} >
      {labelButton}
    </button>
  )
}

export default CreateFile
