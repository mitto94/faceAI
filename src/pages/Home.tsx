import * as React from 'react';
import { Color } from "../faceAnalysis";
import SidebarComponent from '../components/Sidebar';

const Home: React.FC = ({history}: any) => {
	const [visible, setVisible] = React.useState(false);
	const [lan, setLan] = React.useState("ko");
	const toast = React.useRef(null) as any;
	React.useEffect(() => {
		setLan(navigator.language.substr(0,2));
	}, []);
	// React.useEffect(() => {
	// 	let home1: any = document.getElementById("home1");
	// 	if (!home1.getAttribute('data-aos')) {
	// 		home1.setAttribute('data-aos', 'fade-down');
	// 		home1.setAttribute('data-aos-delay', '200');
	// 	} else {
	// 	  	home1.removeAttribute('data-aos');
	// 		home1.removeAttribute('data-aos-delay');
	// 	}
	// 	let home2: any = document.getElementById("home2");
	// 	console.log("home2", home2["data-aos"]);
	// 	console.log("home2", home2);
	// 	if (!home2.getAttribute('data-aos')) {
	// 		home2.setAttribute('data-aos', 'zoom-in');
	// 		home2.setAttribute('data-aos-delay', '1200');
	// 		setTimeout(() => {
	// 		home2.removeAttribute('data-aos');
	// 	}, 1500)
	// 	}
	// 	console.log("didmount")
	// }, [])
	window.history.replaceState(null, null as any, "/");
	return (
		// <div style={{height: "100%", display: "flex", flexDirection: "column", background: Color.first, backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.07'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}>
		<div style={{height: "100%", display: "flex", flexDirection: "column", background: Color.first, overflow: "hidden"}}>
			<div className="container" style={{background: Color["zero"], width: "100%", height: "10%", display: "flex", justifyContent: "space-around", paddingTop: ".75rem"}}>
				<div style={{width: "2rem"}}></div>
	 			<div className="container" style={{color: "white", fontSize: "5vw", fontWeight: 600}}>{lan === "ko" ? '??????(???)?????? ?????? ?????? ??????' : 'My face that Facepago sees'}</div>
	 			<SidebarComponent lan={lan}/>
	 		</div>
			 <div style={{height: "45%", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "-5%", width: "100%", marginLeft: "33%"}}>
				<div style={{width: "50%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
					<img style={{width: "100%", maxHeight: "100%"}} src="robo.PNG"></img>
				</div>
				<div style={{width: "100%", marginTop: "45%", marginLeft: "-3%"}}>
					<div id="home1" style={{height: "4%", width: "30%", backgroundColor: "white", position: "absolute", borderRadius: "5rem", whiteSpace: "pre", maxWidth: "10rem", marginTop: "-55%"}}>
						<span style={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "MapoBackpacking", fontSize: "4vw"}}>{lan === "ko" ? "?????? ????????????~" : "I'm facepago~"}</span>
						<div style={{width: 0, height: 0, borderLeft: "1vh solid transparent", borderRight: "1vh solid transparent", borderTop: "2vh solid white", position: "absolute", top: "40%", left: "-6%", transform: "rotate(180deg)"}}></div>
					</div>
					<div id="home1" style={{height: "4%", width: "40%", backgroundColor: "white", position: "absolute", borderRadius: "5rem", whiteSpace: "pre", maxWidth: "12rem", marginLeft: "-6.5%"}} onClick={() => {
						if (lan === "ko") setLan("en");
						else setLan("ko");
					}}>
						<span style={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "MapoBackpacking", fontSize: "4vw"}}>{lan === "ko" ? "Change it to English?" : "???????????? ??????????"}</span>
						<div style={{width: 0, height: 0, borderLeft: "1vh solid transparent", borderRight: "1vh solid transparent", borderTop: "2vh solid white", position: "absolute", top: "0%", left: "-6%", transform: "rotate(120deg)"}}></div>
					</div>
				</div>
			 </div>
			 <div style={{height: "10%", display: "flex", alignItems: "center"}} onClick={() => {history.push({
				pathname: "/age",
				state: {
					lan
				}
				})}}>
			 	<div style={{position: "relative", background: Color.zero, borderRadius: "3.5rem", width: "80%", height: "70%", marginLeft: "10%", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "8%"}}>
					{lan === "ko" ? <span style={{fontFamily: "MapoBackpacking", fontSize: "5.5vw", color: "white"}}>?????? <span style={{color: "#c7c3af"}}>?????????</span> ?????? ????????????! ????</span>
					: <span style={{fontFamily: "MapoBackpacking", fontSize: "5.5vw", color: "white"}}>I'll guess your <span style={{color: "#c7c3af"}}>age</span>! ????</span>}
				</div>
			 </div>
			 <div style={{height: "10%", display: "flex", alignItems: "center"}} onClick={() => {history.push({
				pathname: "/age_photo",
				state: {
					from: "second",
					lan
				}
				})}}>
			 	<div style={{position: "relative", background: Color.zero, borderRadius: "3.5rem", width: "80%", height: "70%", marginLeft: "10%", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "8%"}}>
					{lan === "ko" ? <span style={{fontFamily: "MapoBackpacking", fontSize: "5.5vw", color: "white"}}>?????? <span style={{color: Color.second}}>?????????</span> ??? ??? ??????~ ????</span>
					: <span style={{fontFamily: "MapoBackpacking", fontSize: "5.5vw", color: "white"}}>I can see the <span style={{color: Color.second}}>emotions</span> too~ ????</span>}
				</div>
			 </div>
			 <div style={{height: "10%", display: "flex", alignItems: "center"}} onClick={() => {history.push({
				pathname: "/relation",
				state: {
					lan
				}
				})}}>
			 	<div style={{position: "relative", background: Color.zero, borderRadius: "3.5rem", width: "80%", height: "70%", marginLeft: "10%", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "8%"}}>
					{lan === "ko" ? <span style={{fontFamily: "MapoBackpacking", fontSize: "5.5vw", color: "white"}}>????????? <span style={{color: Color.third}}>????????????</span> ?????????? ????</span>
					: <span style={{fontFamily: "MapoBackpacking", fontSize: "5.5vw", color: "white"}}>How <span style={{color: Color.third}}>similar</span> would it be? ????</span>}
				</div>
			 </div>
			 <div id="home2" style={{height: "15%", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "EliceDigitalBaeum_Bold", fontSize: "5.5vw"}}>
			 	{lan === "ko" ? "??? ???????????? ???????????? ????????? ?????????" : "Please click the speech bubble"}
				 {/* ??? ???????????? ???????????? ????????? ????????? */}
			 </div>
		</div>
	)
};

export default Home;