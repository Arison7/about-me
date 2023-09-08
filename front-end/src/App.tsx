import React, {useState} from 'react';
import './style/app.css';
import Section from './components/Section';
import History from './components/History';
import Article from './components/Article';

export interface IState{
  section : {
    url : string
  },
  historyList : string[],
  article :{
    url : string
  }

}



function App() {
  //initializing states
  //TODO: make default section
  const [section,setSection] = useState<IState['section']>({url:"sections/2"})
  const [historyList,setHistoryList] = useState<IState['historyList']>([])
  const [article,setArticle] = useState<IState['article']>({url:""})


  return (
    <div className="App">
      <History historyList= {historyList} setSection= {setSection} setHistoryList= {setHistoryList} setArticle = {setArticle}/>
      <Section section = {section} setSection = {setSection} setHistoryList = {setHistoryList} setArticle = {setArticle}/>
      <Article article = {article}/>
    </div>
  );
}

export default App;
