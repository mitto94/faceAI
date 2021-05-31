import React, { useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Home, Loading,
	AgeAnalysis, GetPicture, InputAge,
	EmotionAnalysis, getPicture2,
	getPicture3, InputRelationship, rAnalysis } from './pages';
import Menu from "./components/Menu";
import SidebarComponent from "./components/Sidebar";

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
const App: React.FC = () => {
	return (
			<div style={{height: "100vh", width: "100%", maxWidth: "400px", }}>
				{/* <Menu/> */}
				<Route exact path="/" component={Home}></Route>
				<Switch>
					<Route path="/loading" component={Loading} />

					<Route path="/age" component={InputAge} />
					<Route path="/age_photo" component={GetPicture} />
					<Route path="/age_analysis" component={AgeAnalysis} />

					<Route path="/emotion" component={getPicture2} />
					<Route path="/emotion_analysis" component={EmotionAnalysis} />

					<Route path="/relation" component={InputRelationship} />
					<Route path="/relation_photo" component={getPicture3} />
					<Route path="/relation_analysis" component={rAnalysis} />
					<Redirect path="*" to="/" />
				</Switch>
			</div>
	);
}

export default App;