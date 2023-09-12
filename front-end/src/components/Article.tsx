import React, {useState,useEffect} from 'react'
import { IState as Props} from '../App'
import ReactMarkdown from "react-markdown"


interface IProps {
    article: {
        url : string
    }

}

interface IState{
    currentArticle : {
        name : string,
        content: string
    }

}

const Article : React.FC<IProps> = ({article}) => {
    //luck of url indicates that applications is showcasing section
    //so we can return without rendering anything 
    if(!article.url)
        return (<div></div>)
    //creates state that holds date of article after it's fetching
    const [currentArticle,setCurrentArticle] = useState<IState['currentArticle']> ({
        name : "",
        content: ""
    })

    useEffect(()=>{
        //fetches data of article based on url received in props
        const getCurrentArticle = async() => {
            const res = await fetch(article.url)
            const data = await res.json(); 
            
            //updates current Article with the data received
            setCurrentArticle({
                name : data.name,
                content: data.content
            })
        }
        getCurrentArticle();
    },[article.url])

    //todo support images
    return (<div className='article-container'>
        <p>{currentArticle.name}</p>
        <ReactMarkdown>{currentArticle.content}</ReactMarkdown>
    </div>)

}

export default Article