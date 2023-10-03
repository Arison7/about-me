import React, {useState} from 'react'
import { IState as Props} from '../App'
import InfoPopUp from './InfoPopUp'
import { Outlet, useNavigate } from 'react-router-dom'

interface IProps{
    historyList: Props['historyList'],
    //setSection: React.Dispatch<React.SetStateAction<Props['section']>>
    setHistoryList: React.Dispatch<React.SetStateAction<Props['historyList']>>
    //setArticle : React.Dispatch<React.SetStateAction<Props['article']>>
}



const History : React.FC<IProps> = ({historyList,setHistoryList}) => {
    const navigate = useNavigate()


    //kept in order to display InfoPopUp
    const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    //string to be displayed in the InfoPopUp or nothing if the InfoPopUp isn't visible 
    const [hoveredObject, setHoveredObject] = useState<string | null>(null);

    //todo make all of them dark and remove the smoke on hover
    //updates mouse position and set the hoverobjected while the mouse is hovering over desired element
    const handleMouseHover = (e: React.MouseEvent<HTMLDivElement>, text: string) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        setHoveredObject(text);
    };

    //sets hovered object to null thus stoping it from being displayed
    const handleMouseLeave = () => {
        setHoveredObject(null);
    };
    const handleClick = (i : number) => {
        //set sections to the one saved at the index
        //setSection({url : historyList[i].url});
        navigate(historyList[i].url)
        //updates history list to remove everything past and inclusive to i index
        setHistoryList(historyList.slice(0,i));
        //hides article if one was opened 
        //setArticle({url : ""});
        //hides InfoPopUp
        setHoveredObject(null);
    }



    //renders history in chronological order
    const renderList = () : JSX.Element[] => {
        return historyList.map((instance,i)=>{
            //each cards holds its own index to historyList
            return (<div className='history-card card' key={instance.url} 
                style={{top:15 *i + "px", left: 15* i +"px"}}
                onClick={(e) => handleClick(i)}
                onMouseMove={(e) => handleMouseHover(e,instance.name)}
                onMouseLeave={handleMouseLeave}
            >
                <img src={"/" + instance.image}></img>
            </div >)
        })
    }
    return (<nav id="history">
        {renderList()}
        {//*displays infoPopUp based on hoveredObject not being null
            hoveredObject && 
            (<InfoPopUp x={mousePosition.x} y={mousePosition.y} text={hoveredObject} />)
        }
    </nav>)




}


export default History 