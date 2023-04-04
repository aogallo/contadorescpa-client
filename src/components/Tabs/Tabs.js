import Panel from 'components/Panel/Panel'
import React, { useState } from 'react'

const Tabs = ({ titles, content }) => {
  const [currentTab, setCurrentTab] = useState(0)
  const titlesTab = titles.map((title, index) =>
    <li
      key={title}
      onClick={() => setCurrentTab(index)}
      className={currentTab === index
        ? 'tabs__tab tabs__tab--selected'
        : 'tabs__tab'}
    >
      {title}
    </li>
  )
  return (
    <div className='tabs__container'>
      <ul className='tabs__titles'>
        {
          titlesTab
        }
      </ul>
      <Panel className='tabs__content'>
        {
          content[currentTab]
        }
      </Panel>
    </div>
  )
}

export default Tabs
