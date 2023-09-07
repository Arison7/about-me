import React, {useEffect,useState} from "react";
import {IState as Props} from "../App";
import axios from "axios";
import Cookies from "js-cookie"

interface IProps{
    section: Props['section']
}
interface IState{
    currentSection:{
        name: string,
    }
}

const Section : React.FC<IProps> = ({section}) => {



    useEffect(()=>{
        console.log("hi")

        const loc = window.location.protocol
        const path = loc + section.url

        const getCurrentSection = async() => {
            const res = await fetch(path)
            console.log(res)
            const data = await res.json(); 
            console.log("data",data)
        }
        getCurrentSection();
    },[section])

    return (<div>
    </div>)
}

export default Section





