import React, {useEffect,useState} from "react";
import {IState as Props} from "../App";
import axios from "axios";
import Cookies from "js-cookie"

interface IProps{
    section: Props['section']
    setSection: React.Dispatch<React.SetStateAction<IProps['section']>>
}
interface IState{
    card:{
        url : string,
        name : string,
        section : string,
        destination : string,
    },
    
}

const Section : React.FC<IProps> = ({section, setSection}) => {
    const [cardsList,setCardsList] = useState<IState['card'][]>([])
    const [currentSectionName,setCurrentSectionName] = useState<string>("")



    useEffect(()=>{
        console.log("hi")


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
            console.log('cards_list',cards_list)
            setCardsList(cards_list)
            console.log("cardslist state",cardsList)
            console.log('data',data)

        }
        getCurrentSection();
    },[section])
    const handleMove= () =>{

    }

    const renderList = () : JSX.Element[] => {
        return cardsList.map((card : IState['card']) => {
            return (<li onClick={()=>{
                if(card.destination.startsWith("sections")){
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





