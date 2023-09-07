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
  const [section,setSection] = useState<IState['section']>({url:"sections/1"})


  return (
    <div className="App">
      <Section section = {section}/>
    </div>
  );
}

export default App;
