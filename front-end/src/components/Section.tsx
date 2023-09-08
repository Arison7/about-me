import React, {useEffect,useState} from "react";
import {IState as Props} from "../App";

interface IProps{
    section: Props['section'],
    setSection: React.Dispatch<React.SetStateAction<IProps['section']>>,
    setHistoryList: React.Dispatch<React.SetStateAction<string[]>>,
    setArticle : React.Dispatch<React.SetStateAction<Props['article']>>
}
interface IState{
    card:{
        url : string,
        name : string,
        section : string,
        destination : string,
    },
    
}

const Section : React.FC<IProps> = ({section, setSection, setHistoryList, setArticle}) => {
    //* if the url isn't present we can just return`
    //* this should happen while the application is showcasing article 
    if(!section.url)
        return (<div></div>)

    const [cardsList,setCardsList] = useState<IState['card'][]>([])
    const [currentSectionName,setCurrentSectionName] = useState<string>("")



    useEffect(()=>{

        const getCurrentSection = async() => {
            //console.log("currentSectionPath",section.url)
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

    const updateHistory = (card : IState['card']) : void => {
        setHistoryList((historyList)=>{
            //format url to remove host and protocol so it can be filled automatically
            let origin = card.section.split('/').splice(3).join('/')
            //console.log('formated destination',destination)
            historyList.push(origin);
            //console.log('origin',historyList)
            
            return historyList;
        })

    }

    const renderList = () : JSX.Element[] => {
        return cardsList.map((card : IState['card']) => {
            return (<li onClick={()=>{
                if(card.destination.startsWith("sections") ){
                    updateHistory(card)
                    setSection({url : card.destination})

                }else if(card.destination.startsWith("article")){
                    updateHistory(card)
                    setSection({url : ""})
                    setArticle({url : card.destination})

                }else{
                    //todo raise error

                }

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





