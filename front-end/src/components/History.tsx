import React, {useState} from 'react'
import { IState as Props} from '../App'
import InfoPopUp from './InfoPopUp'

interface IProps{
    historyList: string[],
    setSection: React.Dispatch<React.SetStateAction<Props['section']>>
    setHistoryList: React.Dispatch<React.SetStateAction<string[]>>
    setArticle : React.Dispatch<React.SetStateAction<Props['article']>>
}



const History : React.FC<IProps> = ({historyList,setHistoryList,setSection,setArticle}) => {
    const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [hoveredObject, setHoveredObject] = useState<string | null>(null);

    //todo make all of them dark and remove the smoke on hover
    const handleMouseHover = (e: React.MouseEvent<HTMLDivElement>, text: string) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        setHoveredObject(text);
    };

    const handleMouseLeave = () => {
        setHoveredObject(null);
    };
    const handleClick = (i : number) => {
        setSection({url : historyList[i]});
        setHistoryList(historyList.slice(0,i));
        setArticle({url : ""});
        setHoveredObject(null);
    }



    //renders history in chronological order
    const renderList = () : JSX.Element[] => {
        return historyList.map((section,i)=>{
            return (<div className='history-card card' key={section} style={{top:15 *i + "px", left: 15* i +"px"}}
                onClick={(e) => handleClick(i)}
                onMouseMove={(e) => handleMouseHover(e, section)}
                onMouseLeave={handleMouseLeave}
            >
            </div >)
        })
    }
    return (<nav id="history">
        {renderList()}
        {hoveredObject && (
        <InfoPopUp x={mousePosition.x} y={mousePosition.y} text={hoveredObject} />
        )}

    </nav>)




}


export default History 