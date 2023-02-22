import React from 'react'
import { createPortal } from 'react-dom'

const Editor = () => {
  // const [isVisible, setIsVisible] = useState(false)

  return createPortal(
    <>
      <div className='editor'>
        <div className='editor__container'>
          <h1>contenido</h1>
        </div>

      </div>
    </>
    ,
    document.getElementById('overlay')
  )
}

export default Editor
