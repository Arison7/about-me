import React, { useEffect, useState } from "react";
import "./style/app.css";
import Section from "./components/Section";
import History from "./components/History";
import Article from "./components/Article";
import { Route, Routes, useNavigate } from "react-router-dom";

export interface IState {
	historyList: {
		url: string;
		name: string;
		image: string;
	}[];
}

function App() {
	//initializing states
	const [historyList, setHistoryList] = useState<IState["historyList"]>([]);

	//React-router-dom function that allows navigating between routes
	const navigate = useNavigate();

	useEffect(() => {
		//*fetches sections from database with is_defualt set to true
		const getDefualt = async () => {
			const respond = await fetch("/api/sections/default/");
			const data = await respond.json();
			navigate("/sections/" + data.pk);
		};
		//alternatively function would run even on refresh taking user to
		//the defualt page everytime
		if (window.location.pathname === "/") getDefualt();
	}, []);

	return (
		<div id="app">
			<History
				historyList={historyList}
				setHistoryList={setHistoryList}
			/>
			<Routes>
				<Route path="sections">
					<Route
						index
						element={<Section setHistoryList={setHistoryList} />}
					/>
					<Route
						path=":pk"
						element={<Section setHistoryList={setHistoryList} />}
					/>
				</Route>
				<Route path="articles">
					<Route path=":pk" element={<Article />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
