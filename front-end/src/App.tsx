import React, { useEffect, useMemo, useState } from "react";
import "./style/app.css";
import Section from "./components/Section";
import History from "./components/History";
import Article from "./components/Article";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

export interface IState {
	/*
	section: {
		url: string;
	};
	*/
	historyList: {
		url: string;
		name: string;
		image: string;
	}[];
	/*
	article: {
		url: string;
	};
	*/
}




function App() {
	//initializing states
	//const [section, setSection] = useState<IState["section"]>({ url: "" });
	const [historyList, setHistoryList] = useState<IState["historyList"]>([]);
	//const [article, setArticle] = useState<IState["article"]>({ url: "" });



	const navigate = useNavigate();
	useEffect(() => {
		const getDefualt = async () => {
			const respond = await fetch("/api/sections/default/");
			console.log("defualt catch", respond)
			const data = await respond.json();
			//setSection({ url: data.url });
			navigate("/sections/" + data.url.slice(-2));
		};
        if(window.location.pathname === "/")
			getDefualt();
	}, []);

	return (
		<div id="app">
			<History
				historyList={historyList}
				//setSection={setSection}
				setHistoryList={setHistoryList}
				//setArticle={setArticle}
			/>
			<Routes>
					<Route path="sections" >
						<Route
							index element={
								<Section
									//section={section}
									//setSection={setSection}
									setHistoryList={setHistoryList}
									//setArticle={setArticle}
								/>
							}
						/>
						<Route
							path=":pk"
							element={
								<Section
									//section={section}
									//setSection={setSection}
									setHistoryList={setHistoryList}
									//setArticle={setArticle}
								/>
							}
						/>
					</Route>
					<Route path="articles">
						<Route
							path=":pk"
							element={<Article 
								//article={article} 
								/>}
						/>
					</Route>
				</Routes>
		</div>
	);
}

export default App;
