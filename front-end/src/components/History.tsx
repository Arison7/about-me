import React, { useState, useMemo } from "react";
import { IState as Props } from "../App";
import InfoPopUp from "./InfoPopUp";
import { useNavigate } from "react-router-dom";

interface IProps {
	historyList: Props["historyList"];
	//setSection: React.Dispatch<React.SetStateAction<Props['section']>>
	setHistoryList: React.Dispatch<React.SetStateAction<Props["historyList"]>>;
	//setArticle : React.Dispatch<React.SetStateAction<Props['article']>>
}

/*
 *when user uses a back arrow or simply refreshes the data of HistoryList will not be preserved
 *so it has to be rebuild, by fetching it from the backend
 */
const reBuildHistory = async (
	setHistoryList: React.Dispatch<React.SetStateAction<IProps["historyList"]>>
): Promise<void> => {
	const getSection = async () => {
		//there is no history for a root page
		if (window.location.pathname === "/") return;
		//fetch data from backend
		const res = await fetch("/api" + window.location.pathname + "/history");
		//cast data to json
		const data = await res.json();
		//data on a backend is prepared in a way to fit the state perfectly
		setHistoryList(data);
	};
	await getSection();
};

const History: React.FC<IProps> = ({ historyList, setHistoryList }) => {
	//React-router-dom function that allows navigating between routes
	const navigate = useNavigate();

	//wrapped inside useMemo wihtout dependencies to insure it would be run only once and have
	//access to setHistoryList
	useMemo(async () => {
		addEventListener("popstate", () => {
			reBuildHistory(setHistoryList);
		});
		await reBuildHistory(setHistoryList);
	}, []);

	//kept in order to display InfoPopUp
	const [mousePosition, setMousePosition] = useState<{
		x: number;
		y: number;
	}>({ x: 0, y: 0 });
	//string to be displayed in the InfoPopUp or nothing if the InfoPopUp isn't visible
	const [hoveredObject, setHoveredObject] = useState<string | null>(null);

	//todo make all of them dark and remove the smoke on hover
	//updates mouse position and set the hoverobjected while the mouse is hovering over desired element
	const handleMouseHover = (
		e: React.MouseEvent<HTMLDivElement>,
		text: string
	) => {
		setMousePosition({ x: e.clientX, y: e.clientY });
		setHoveredObject(text);
	};

	//sets hovered object to null thus stoping it from being displayed
	const handleMouseLeave = () => {
		setHoveredObject(null);
	};
	const handleClick = (i: number) => {
		//changes path to new section
		navigate(historyList[i].url);
		//updates history list to remove everything past and inclusive to i index
		setHistoryList(historyList.slice(0, i));
		//hides InfoPopUp
		setHoveredObject(null);
	};

	//renders history in chronological order
	const renderList = (): JSX.Element[] => {
		return historyList.map((instance, i) => {
			//each cards holds its own index to historyList
			return (
				<div
					className="history-card card"
					key={instance.url}
					style={{
						top: 15 * i + "px",
						left: 15 * i + "px",
						zIndex: i,
					}}
					onClick={(e) => handleClick(i)}
					onMouseMove={(e) => handleMouseHover(e, instance.name)}
					onMouseLeave={handleMouseLeave}
				>
					<img src={"/" + instance.image}></img>
				</div>
			);
		});
	};
	return (
		<nav id="history">
			{renderList()}
			{//*displays infoPopUp based on hoveredObject not being null
			hoveredObject && (
				<InfoPopUp
					x={mousePosition.x}
					y={mousePosition.y}
					text={hoveredObject}
				/>
			)}
		</nav>
	);
};

export default History;
