import React, {useState,useEffect} from 'react'
import { IState as Props} from '../App'
import ReactMarkdown from "react-markdown"
import { useParams } from 'react-router-dom'

/*
interface IProps {
    article: {
        url : string
    }

}

*/

interface IState{
    currentArticle : {
        name : string,
        content: string
    }

}

const Article : React.FC = () => {
    //luck of url indicates that applications is showcasing section
    //so we can return without rendering anything 
    const {pk} = useParams();
    if(!pk)
        return (<div></div>)
    //creates state that holds date of article after it's fetching
    const [currentArticle,setCurrentArticle] = useState<IState['currentArticle']> ({
        name : "",
        content: ""
    })

    useEffect(()=>{
        //fetches data of article based on url received in props
        const getCurrentArticle = async() => {
            const res = await fetch('/articles/' + pk + '/')
            const data = await res.json(); 
            
            //updates current Article with the data received
            setCurrentArticle({
                name : data.name,
                content: data.content
            })
        }
        getCurrentArticle();
    },[pk])

    //todo support images
    //! awful solution and only temporary one till i do my own markdown translator
    if(currentArticle.name === "Dashboard"){
        return (<div className='article-container'>
            <h1 className='title-article'>{currentArticle.name}</h1>
            <div dangerouslySetInnerHTML={{ __html: currentArticle.content }} />
        </div>)
    }else{
        return (<div className='article-container'>
            <h1 className='title-article'>{currentArticle.name}</h1>
            <ReactMarkdown>{currentArticle.content}</ReactMarkdown>
        </div>)

    }

}

export default Article