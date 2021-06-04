import * as React from 'react';
// import { Link, BrowserRouter as Router, useHistory } from 'react-router-dom';
// import { Button } from 'primereact/button';
import { Color } from "../faceAnalysis";
import SidebarComponent from '../components/Sidebar';

const Home: React.FC = ({history}: any) => {
	const [visible, setVisible] = React.useState(false);
	window.history.replaceState(null, null as any, "/");
    return (
        <div className="container-ct" style={{flexDirection: "column"}}>
			<div className="container" style={{background: Color["zero"], width: "100%", height: "10%", display: "flex", justifyContent: "space-around"}}>
				<div style={{width: "2rem"}}></div>
				<div className="container" style={{color: "white", fontSize: "1.35rem", fontWeight: 600, paddingTop: ".5rem"}}>AI가 보는 나의 얼굴</div>
				<SidebarComponent />
			</div>
			<div className="container" style={{width: "100%", height: "30%", background: Color.first}}>
				<button onClick={() => {history.push("/age")}} className="face-btn" style={{backgroundColor: "#CBC3BA", filter: "brightness(1.05)", fontSize: "1.65rem", fontFamily: "Stylish, sans-serif"}}>나이 확인하기</button>
			</div>
			<div className="container" style={{width: "100%", height: "30%", background: Color.second}}>
			{/* <button onClick={() => {history.push("/emotion")}} className="face-btn" style={{backgroundColor: Color.second, filter: "brightness(1.05)"}}>감정 분석하기</button> */}
			<button onClick={() => {history.push({
				pathname: "/age_photo",
				state: {
					from: "second"
				}
			})}} className="face-btn" style={{backgroundColor: Color.second, filter: "brightness(1.05)", fontSize: "1.65rem", fontFamily: "Stylish, sans-serif"}}>감정 분석하기</button>
			</div>
			<div className="container" style={{width: "100%", height: "30%", background: Color.third}}>
			{/* <button onClick={() => {history.push("/relation")}} className="face-btn" style={{backgroundColor: Color.third, filter: "brightness(0.95)"}}>유사성 테스트</button> */}
			<button onClick={() => {history.push({
				pathname: "/relation",
				state: {
					from: "third"
				}
			})}} className="face-btn" style={{backgroundColor: Color.third, filter: "brightness(0.95)", fontSize: "1.65rem", fontFamily: "Stylish, sans-serif"}}>우린 얼마나 닮았을까</button>
			</div>
        </div>
    );
};

export default Home;