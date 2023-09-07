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
            console.log('cards_list',cards_list)
            setCardsList(cards_list)
            console.log("cardslist state",cardsList)
            console.log('data',data)

        }
        getCurrentSection();
    },[section])

    return (<div>
    </div>)
}

export default Section





