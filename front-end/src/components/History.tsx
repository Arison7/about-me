import React, {useState} from 'react'
import { IState as Props} from '../App'

interface IProps{
    historyList: string[],
    setSection: React.Dispatch<React.SetStateAction<Props['section']>>
    setHistoryList: React.Dispatch<React.SetStateAction<string[]>>
    setArticle : React.Dispatch<React.SetStateAction<Props['article']>>
}


const History : React.FC<IProps> = ({historyList,setHistoryList,setSection,setArticle}) => {



    //renders history in chronological order
    const renderList = () : JSX.Element[] => {
        return historyList.map((section,i)=>{
            return (<div key={section} onClick={()=>{
                setSection({url : historyList[i]});
                setHistoryList(historyList.slice(0,i));
                setArticle({url : ""});
            }}>
                {section}
            </div >)



        })
    }
    return (<nav id="history">
        {renderList()}
    </nav>)




}


export default History 