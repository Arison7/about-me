import React, {useState} from 'react';
import './style/app.css';
import Section from './components/Section';

export interface IState{
  section : {
    url : string
  },


}



function App() {
  //initializing states
  //TODO: make default section
  const [section,setSection] = useState<IState['section']>({url:"sections/2"})


  return (
    <div className="App">
      <Section section = {section} setSection = {setSection}/>
    </div>
  );
}

export default App;
