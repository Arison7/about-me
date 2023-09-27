import React, {useEffect, useState} from 'react';
import './style/app.css';
import Section from './components/Section';
import History from './components/History';
import Article from './components/Article';
import { BrowserRouter, Route, Routes } from "react-router-dom";

export interface IState{
  section : {
    url : string
  },
  historyList : {
    url : string,
    name: string,
    image: string,
  }[],
  article :{
    url : string
  }

}



function App() {
  //initializing states
  const [section,setSection] = useState<IState['section']>({url:""})
  const [historyList,setHistoryList] = useState<IState['historyList']>([])
  const [article,setArticle] = useState<IState['article']>({url:""})

  useEffect(()=>{
    const getDefualt = async () => {
      const respond = await fetch('api/sections/default/');
      const data = await respond.json()
      console.log(data)
      setSection({url : data.url}) 
    }
    getDefualt()

  },[])



/*
  const renderParticles = () : JSX.Element[] => {
    let elemnets : JSX.Element[] = [];
    for(let i :number = 0 ; i <= 
      50; i++ ){
      elemnets.push(<div className='circle-container'>
          <div className='circle'></div>
        </div>)
    }
    return elemnets

  }
  */

  return (
	<div id="app" >
		<BrowserRouter>
			<Routes>	
				<History historyList= {historyList} setSection= {setSection} setHistoryList= {setHistoryList} setArticle = {setArticle}/>
				<Section section = {section} setSection = {setSection} setHistoryList = {setHistoryList} setArticle = {setArticle}/>
				<Article article = {article}/>
			</Routes>
		</BrowserRouter>
	</div>
  );
}

export default App;
