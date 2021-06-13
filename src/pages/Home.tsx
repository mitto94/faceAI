import * as React from 'react';
import { Color } from "../faceAnalysis";
import SidebarComponent from '../components/Sidebar';

const Home: React.FC = ({history}: any) => {
	const [visible, setVisible] = React.useState(false);
	window.history.replaceState(null, null as any, "/");
	return (
		// <div style={{height: "100%", display: "flex", flexDirection: "column", background: Color.first, backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.07'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}>
		<div style={{height: "100%", display: "flex", flexDirection: "column", background: Color.first, overflow: "hidden"}}>
			<div className="container" style={{background: Color["zero"], width: "100%", height: "10%", display: "flex", justifyContent: "space-around", paddingTop: ".5rem"}}>
				<div style={{width: "2rem"}}></div>
	 			<div className="container" style={{color: "white", fontSize: "1.25rem", fontWeight: 600}}>얼척(尺)이가 보는 나의 얼굴</div>
	 			<SidebarComponent />
	 		</div>
			 <div style={{height: "45%", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "-5%", width: "100%", marginLeft: "33%"}}>
				<div style={{width: "50%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
					<img style={{width: "100%", maxHeight: "100%"}} src="robo.PNG"></img>
				</div>
				<div style={{width: "100%", marginTop: "45%", marginLeft: "-3%"}}>
					<div style={{height: "5%", width: "33%", backgroundColor: "white", position: "absolute", borderRadius: "5rem", whiteSpace: "pre"}}>
						<span style={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "MapoBackpacking"}}>내가 얼척이야~</span>
						<div style={{width: 0, height: 0, borderLeft: "1vh solid transparent", borderRight: "1vh solid transparent", borderTop: "2vh solid white", position: "absolute", top: "0%", left: "-6%", transform: "rotate(120deg)"}}></div>
					</div>
				</div>
			 </div>
			 <div style={{height: "10%", display: "flex", alignItems: "center"}} onClick={() => {history.push("/age")}}>
			 	<div style={{position: "relative", background: Color.zero, borderRadius: "3.5rem", width: "80%", height: "70%", marginLeft: "10%", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "8%"}}>
					<span style={{fontFamily: "MapoBackpacking", fontSize: "1.25rem", color: "white"}}>너의 나이를 내가 맞춰볼게! 🤔</span>
				</div>
			 </div>
			 <div style={{height: "10%", display: "flex", alignItems: "center"}} onClick={() => {history.push({
				pathname: "/age_photo",
				state: {
					from: "second"
				}
				})}}>
			 	<div style={{position: "relative", background: Color.zero, borderRadius: "3.5rem", width: "80%", height: "70%", marginLeft: "10%", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "8%"}}>
					<span style={{fontFamily: "MapoBackpacking", fontSize: "1.25rem", color: "white"}}>나도 감정을 볼 수 있어~ 😎</span>
				</div>
			 </div>
			 <div style={{height: "10%", display: "flex", alignItems: "center"}} onClick={() => {history.push("/relation")}}>
			 	<div style={{position: "relative", background: Color.zero, borderRadius: "3.5rem", width: "80%", height: "70%", marginLeft: "10%", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "8%"}}>
					<span style={{fontFamily: "MapoBackpacking", fontSize: "1.25rem", color: "white"}}>얼마나 닮았는지 궁금해? 👀</span>
				</div>
			 </div>
			 <div style={{height: "15%", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "EliceDigitalBaeum_Bold", fontSize: "1.25rem"}}>
			 	위 말풍선을 클릭하여 확인해 보세요
			 </div>
		</div>
	)
};

export default Home;