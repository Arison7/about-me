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
        return historyList.map((section)=>{
            return (<div onClick={()=>{}}>
                {section}
            </div>)



        })
    }
    return (<div>


    </div>)




}