import React, {useState} from 'react';
import './style/app.css';
import Section from './components/Section';
import History from './components/History';

export interface IState{
  section : {
    url : string
  },
  historyList : string[]


}



function App() {
  //initializing states
  //TODO: make default section
  const [section,setSection] = useState<IState['section']>({url:"sections/2"})
  const [historyList,setHistoryList] = useState<IState['historyList']>([])


  return (
    <div className="App">
      <History historyList= {historyList} setSection= {setSection} setHistoryList= {setHistoryList}/>
      <Section section = {section} setSection = {setSection} setHistoryList = {setHistoryList}/>

    </div>
  );
}

export default App;
