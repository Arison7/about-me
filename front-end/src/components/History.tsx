import React, {useState} from 'react'
import { IState } from '../App'

interface IProps{
    historyList: string[],
    setSection: React.Dispatch<React.SetStateAction<IState['section']>>
    setHistoryList: React.Dispatch<React.SetStateAction<string[]>>
}


const History : React.FC<IProps> = ({historyList,setHistoryList,setSection}) => {



    //renders history in chronological order
    const renderList = () : JSX.Element[] => {
        return historyList.map((section,i)=>{
            return (<div key={section} onClick={()=>{
                setSection({url : historyList[i]});
                setHistoryList(historyList.slice(0,i));
            }}>
                {section}
            </div >)



        })
    }
    return (<div>
        {renderList()}
    </div>)




}


export default History 