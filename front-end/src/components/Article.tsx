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
            const res = await fetch('/api/articles/' + pk + '/')
            const data = await res.json(); 
            
            //updates current Article with the data received
            setCurrentArticle({
                name : data.name,
                content: data.content
            })
        }
        getCurrentArticle();
    },[pk])
    /*
    ? well that was a bigger project than I anticipated and in the end I don't think I am going to
    ? to use this as foundation for my portfolio, thus the solution will remain as it is, although
    ? I am aware of security issues that come with it.
    */
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