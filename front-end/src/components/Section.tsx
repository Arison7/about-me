import React, {useEffect,useState} from "react";
import {IState as Props} from "../App";
import { Navigate, useNavigate, useParams } from "react-router-dom";

interface IProps{
    //section: Props['section'],
   // setSection: React.Dispatch<React.SetStateAction<IProps['section']>>,
    setHistoryList: React.Dispatch<React.SetStateAction<Props['historyList']>>,
    //setArticle : React.Dispatch<React.SetStateAction<Props['article']>>
}
interface IState{
    card:{
        url : string,
        name : string,
        description: string,
        section : string,
        destination : string,
        image: string
    },
    
}

const Section : React.FC<IProps> = ( {setHistoryList}) => {
    //if the url isn't present we can just return
    //should occur while Article component is being displayed

    const { pk }= useParams()

    if(!pk)
        return (<div></div>)

    const navigate = useNavigate()


    //holds data of all the cards of current section
    const [cardsList,setCardsList] = useState<IState['card'][]>([])
    //holds name of current section to be used in title div on top of the page
    const [currentSectionName,setCurrentSectionName] = useState<string>("")

    //fetches all the data of the section when it changes
    useEffect(()=>{

        const getCurrentSection = async() => {
            /*
            fetches the data from API
            ?syntax of section.url is section/ + pk number
            ?this works because in development all requests are proxied to API
            ?and in production react is hosted in template thus is on the same host as API
            */ 
            const res = await fetch('/api/sections/' + pk + '/')
            const data = await res.json(); 
            //maps data to desired format
            //!since data is fetched without types assertion the whole operation
            //!requires that all the names are the same and in the same order
            const cards_list = data.cards_list.map(({url,name,description,section,destination,image}:any)=>({
                url,
                name,
                description,
                section,
                destination,
                image

            }))
            //updates states
            setCurrentSectionName(data.name)
            setCardsList(cards_list)

        }
        getCurrentSection();

    },[pk])

    //*updates history list to include data of current card
    const updateHistory = (card : IState['card']) : void => {
        setHistoryList((historyList)=>{
            //format url to remove host and protocol so it can be filled automatically
            let origin = card.section.split('/').splice(3).join('/')
            
            //push all the necessary data for History compoment
            historyList.push({
                url: origin,
                name: card.name,
                image: card.image
            });
            
            return historyList;
        })

    }

    const renderList = () : JSX.Element[] => {
        //maps each card to a li element with unique data and onClick function
        return cardsList.map((card : IState['card']) => {
            return (<li className="card" onClick={()=>{
                if(card.destination.startsWith("/sections") ){
                    //adds current section to history
                    updateHistory(card)
                    //moves to next sections
                    navigate(card.destination)
                    //setSection({url : card.destination})

                }else if(card.destination.startsWith("/articles")){
                    //adds current section to history
                    updateHistory(card)
                    //sets section to nothing to remove it from display
                    //setSection({url : ""})
                    navigate(card.destination)
                    //sets article to it's url for it to be display
                    //setArticle({url : card.destination})

                }else{
                    //if card's destination doesn't follow any of the patterns it's probably
                    //cause of error while inputing data in the model and should be displayed
                    //to the user
                    console.error("Card's destination is invalid:", card.destination)
                }
            }} key={card.url}>
                <div className="shadow"></div>
                <img src={'/'+card.image}></img>
                <div className="card-content"></div>
                <h2>{card.name}</h2>
                <p>{card.description}</p>
            </li>)
        })
    }

    return (<div className="section">
        <div className="title">{currentSectionName}</div>
        <ul className="cards-list">{renderList()}</ul>
    </div>)
}

export default Section





