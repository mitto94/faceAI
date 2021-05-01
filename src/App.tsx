import React, { useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Home, Loading,
	ageAnalysis, getPicture, inputAge,
	emotionAnalysis, getPicture2,
	getPicture3, inputRelationship, rAnalysis } from './pages';
import Menu from "./components/Menu";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

// import Home from "./pages/Home";
// import Loading from "./pages/Loading";
const App: React.FC = () => {
	// useEffect(() => {
	// 	const ai = async () => {
	// 		await Promise.all([
	// 			faceapi.nets.tinyFaceDetector.loadFromUri("./models"),
	// 			faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
	// 			faceapi.nets.faceRecognitionNet.loadFromUri("./models"),
	// 			faceapi.nets.faceExpressionNet.loadFromUri("./models"),
	// 			faceapi.nets.ssdMobilenetv1.loadFromUri("./models"),
	// 			faceapi.nets.ageGenderNet.loadFromUri("./models")
	// 		])
	// 	}
	// 	ai()
	// 	console.log("d", ai);
	// 	console.log("faceapi", faceapi);
	// }, [])
	// let reff: any;
	// const btnClick = async () => {
	// 	const canvas1 = await faceapi.detectSingleFace(reff).withFaceLandmarks().withFaceExpressions().withAgeAndGender().withFaceDescriptor();
	// 	console.log("canvas1", canvas1);
	// }
	return (
			<div style={{height: "100%", width: "100%"}}>
				{/* <Menu/> */}
				<Route exact path="/" component={Home}></Route>
				<Switch>
					<Route path="/loading" component={Loading} />

					<Route path="/age" component={inputAge} />
					<Route path="/age_photo" component={getPicture} />
					<Route path="/age_analysis" component={ageAnalysis} />

					<Route path="/emotion" component={getPicture2} />
					<Route path="/emotion_analysis" component={emotionAnalysis} />

					<Route path="/relation" component={inputRelationship} />
					<Route path="/relation_photo" component={getPicture3} />
					<Route path="/relation_analysis" component={rAnalysis} />
					<Redirect path="*" to="/" />
				</Switch>
			</div>
	);
}

export default App;
