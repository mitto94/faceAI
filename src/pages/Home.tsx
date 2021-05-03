import * as React from 'react';
import { Link, BrowserRouter as Router, useHistory } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Color } from "../faceAnalysis"
const Home: React.FC = ({history}: any) => {
	// const history = useHistory();
	console.log("home");
    return (
        <div className="container-ct" style={{flexDirection: "column"}}>
					<div className="container" style={{width: "100%", height: "10%", background: "#FFBBB8", color: "white", fontSize: "1.25rem", fontWeight: 600}}>AI가 보는 나의 얼굴</div>
					<div className="container" style={{width: "100%", height: "30%", background: Color.first}}>
						<button onClick={() => {history.push("/age")}} className="face-btn" style={{backgroundColor: Color.first, filter: "brightness(1.05)"}}>나이 확인하기</button>
					</div>
					<div className="container" style={{width: "100%", height: "30%", background: Color.second}}>
					{/* <button onClick={() => {history.push("/emotion")}} className="face-btn" style={{backgroundColor: Color.second, filter: "brightness(1.05)"}}>감정 분석하기</button> */}
					<button onClick={() => {history.push({
						pathname: "/age_photo",
						state: {
							from: "second"
						}
					})}} className="face-btn" style={{backgroundColor: Color.second, filter: "brightness(1.05)"}}>감정 분석하기</button>
					</div>
					<div className="container" style={{width: "100%", height: "30%", background: Color.third}}>
						<button onClick={() => {history.push("/relation")}} className="face-btn" style={{backgroundColor: Color.third, filter: "brightness(0.95)"}}>유사성 테스트</button>
					</div>
        </div>
    );
};

export default Home;