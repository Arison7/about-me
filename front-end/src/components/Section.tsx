import React, {useEffect,useState} from "react";
import {IState as Props} from "../App";
import axios from "axios";
import Cookies from "js-cookie"

interface IProps{
    section: Props['section']
    setSection: React.Dispatch<React.SetStateAction<IProps['section']>>
    setHistoryList: React.Dispatch<React.SetStateAction<string[]>>
}
interface IState{
    card:{
        url : string,
        name : string,
        section : string,
        destination : string,
    },
    
}

const Section : React.FC<IProps> = ({section, setSection, setHistoryList}) => {
    const [cardsList,setCardsList] = useState<IState['card'][]>([])
    const [currentSectionName,setCurrentSectionName] = useState<string>("")



    useEffect(()=>{


        const getCurrentSection = async() => {
            console.log("currentSectionPath",section.url)
            const res = await fetch(section.url )
            const data = await res.json(); 
            const cards_list = data.cards_list.map(({url,name,section,destination}:any)=>({
                url,
                name,
                section,
                destination

            }))
            setCurrentSectionName(data.name)
            setCardsList(cards_list)

        }
        getCurrentSection();
    },[section])

    const renderList = () : JSX.Element[] => {
        return cardsList.map((card : IState['card']) => {
            return (<li onClick={()=>{
                if(card.destination.startsWith("sections")){
                    setHistoryList((historyList)=>{
                        //format url to remove host and protocol so it can be filled automatically
                        let origin = card.section.split('/').splice(3).join('/')
                        //console.log('formated destination',destination)
                        historyList.push(origin);
                        console.log('origin',historyList)
                        
                        return historyList;
                    })
                    setSection({url : card.destination})


                }else if(card.destination.startsWith("article")){
                    //todo handle the case for article
                }
                //todo handle the case for error 

            }} key={card.url}>
                {card.name}

            </li>)

        })

    }

    return (<div>
        <div className="Title">{currentSectionName}</div>
        <ul>{renderList()}</ul>
        
    </div>)
}

export default Section





