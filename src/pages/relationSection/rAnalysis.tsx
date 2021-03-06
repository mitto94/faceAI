import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { Color, Relation, Sentence, EnRelation } from '../../faceAnalysis';
import * as faceapi from 'face-api.js';
import { confirmDialog } from 'primereact/confirmdialog'
import Loading from '../Loading';
import SidebarComponent from '../../components/Sidebar';
let word: string;
const RAnalysis = ({history}: any) => {
	const [show, setShow] = React.useState(false);
	const [data, setData] = React.useState({
		distance: 0,
		finish: false
	})
	const location: any = useLocation();
    const {image, secondImage, from, relation, lan} = location?.state;
	let imageRef1: any = React.createRef();
	let imageRef2: any = React.createRef();
	React.useEffect(() => {
		// if ((window as any).ReactNativeWebView) {
		// 	(window as any).ReactNativeWebView.postMessage("all");
		// }
		const getAi = async () => {
			await Promise.all([
				faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
				faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
				faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
			])
			setShow(true);
		}
		getAi();
	}, [])
	const randomItem = (a: Array<string>) => {
		return a[Math.floor(Math.random() * a.length)];
	}
	if (show === false) {
		word = randomItem(Sentence.ad)
	}
	React.useEffect(() => {
		if (show) {
			const getAnalysis = async () => {
				imageRef1.src = image;
				imageRef2.src = secondImage;
				const canvas1: any = await faceapi.detectSingleFace(imageRef1 as any).withFaceLandmarks().withFaceDescriptor();
				const canvas2: any = await faceapi.detectSingleFace(imageRef2 as any).withFaceLandmarks().withFaceDescriptor();
				let data = 1;
				try {
					data = eucDistance(canvas1.descriptor, canvas2.descriptor);
				} catch {
					// confirm();
					// return;
				}
				if (canvas2 === undefined || canvas1 === undefined) {
					await confirm();
					return;
				}
				setData({
					distance: data + 0.1,
					finish: true
				})
			}
			if (imageRef1?.current !== null) {
				getAnalysis();
			}
		}
	}, [show])
	const confirm = () => {
		confirmDialog({
			message: lan === "ko" ? '????????? ???????????? ???????????????. ????????? ?????? ??????????????????????' : "I didn't recognize your face. Do you want to take a picture again?",
        	header: lan === "ko" ? '??????.. ????????????????' : "Are you... an angel?",
			icon: 'pi pi-exclamation-triangle',
			accept: () => history.push({
				pathname: "/relation",
				state: {
					lan
				}
			}),
			reject: () => history.push({
				pathname: "/",
				state: {
					lan
				}
			}),
			onHide: () => history.push({
				pathname: "/relation",
				state: {
					lan
				}
			}),
		});
	}
	const eucDistance = (a: Array<number>, b: Array<number>) => {
		return a
			.map((x, i) => ( x - b[i] ) ** 2) // square the difference
			.reduce((sum, now) => sum + now) // sum
			** (1/2)
	}
	let sFlag = data.distance > 0.6 ? "first" :  data.distance <= 0.6 && data.distance > 0.4 ? "second" : "third"
	return (
        <div id="capture" style={{height: "100%", display: "flex", flexDirection: "column", width: "100%", backgroundColor: "#FFFFF6"}}>
			<div className="container" style={{background: "#D6C1B0", width: "100%", height: "10%", display: "flex", justifyContent: "space-around", paddingTop: ".75rem", minHeight: "10vh"}}>
				<div style={{width: "2rem", fontSize: "1.5rem", color: "white"}}>
					<i className="fas fa-home" onClick={() => history.push("/")}></i>
				</div>
				<div className="container" style={{color: "white", fontSize: "5vw", fontWeight: 600}}>{lan === "ko" ? "??????(???)?????? ?????? ?????? ??????" : "Our faces that Facepago sees"}</div>
				<SidebarComponent lan={lan}/>
			</div>
			<div style={{backgroundColor: "#FFFFF6", width: "100%", height: "100%", maxWidth: "450px", textAlign: "center"}}> 
				<>
					<div className="container" style={{height: "37vh",  display: `${data.finish ? "flex" : "none"}`, justifyContent: "center", fontFamily: "EliceDigitalBaeum_Bold, sans-serif", fontSize: "5vw"}}>
						<div style={{display: "flex", flexDirection: "column", alignItems: "center", margin: "0.5rem"}}>
							<img ref={(ref) => imageRef1 = ref} style={{width: "40vw", height: "30vh", maxWidth: "170px"}}></img>
							<label>{lan === "ko" ? "?????? 1" : "Photo 1"}</label>
						</div>
						<div style={{display: "flex", flexDirection: "column", alignItems: "center", margin: "0.5rem"}}>
							<img ref={(ref) => imageRef2 = ref} style={{width: "40vw", height: "30vh", maxWidth: "170px"}}></img>
							<label>{lan === "ko" ? "?????? 2" : "Photo 2"}</label>
						</div>
					</div>
					{data.finish ?
						<>
						<div style={{display: "flex", justifyContent: "center", fontFamily: "EliceDigitalBaeum_Bold"}}>
							<div className="container-ct m-1" style={{color: "#8B4513", fontWeight: sFlag === "first" ? 600: 300, width: "30vw", border: "1px solid rgb(0, 0, 0, 0.2)", height: "30vw", maxHeight: "16.5vh", borderRadius: "5rem", background: `${sFlag === "first" ? "#D6C1B0": "white"}`, boxShadow: `3px 3px 3px 1px gray`}}>{lan === "ko" ? "??? ??????" : "Different"}</div>
							<div className="container-ct m-1" style={{color: "#8B4513", fontWeight: sFlag === "second" ? 600: 300, border: "1px solid rgb(0, 0, 0, 0.2)", borderRadius: "5rem", width: "30vw", height: "30vw", maxHeight: "16.5vh", background: `${sFlag === "second" ? "#D6C1B0": "white"}`, boxShadow: `3px 3px 3px 1px gray`}}>{lan === "ko" ? "?????? ??????" : "A bit similar"}</div>
							<div className="container-ct m-1" style={{color: "#8B4513", fontWeight: sFlag === "third" ? 600: 300, border: "1px solid rgb(0, 0, 0, 0.2)", borderRadius: "5rem", width: "30vw", height: "30vw", maxHeight: "16.5vh", background: `${sFlag === "third" ? "#D6C1B0": "white"}`, boxShadow: `3px 3px 3px 1px gray`}}>{lan === "ko" ? "?????? ??????" : "Very similar"}</div>
						</div>
						<div className="container" style={{fontSize: "6.5vw", padding: "0.5rem", paddingTop: "1rem", filter: "brightness(0.5)", fontFamily: "EliceDigitalBaeum_Bold, sans-serif"}}><span style={{color: Color.third, fontWeight: 500}}>{(1 - data.distance + 0.15) * 100 > 100 ? `100% ` : `${(Math.floor((1 - data.distance + 0.15) * 100))}% ` }</span>&nbsp;{lan === "ko" ? "?????? ???????????????" : "similar"}</div>
						<pre className="container" style={{width: "100%", height: "12vh", fontSize: "6vw", textAlign: "center", fontFamily: "MapoBackpacking, cursive", minHeight: "30px"}}>{lan === "ko" ? Relation[relation][sFlag] : EnRelation[relation][sFlag]}</pre>
						<div style={{display: "flex", justifyContent: "center", height: "15vh", alignItems: "center"}}>
							<pre style={{whiteSpace: "pre-wrap", wordBreak: "keep-all", textAlign: "center", width: "85%", fontFamily: "Pattaya, sans-serif", opacity: ".6", fontSize: "4.5vw"}}>{randomItem(Sentence.front)}<br />{"-Wise Saying-"}</pre>
						</div>
					</>
					:
					<Loading random={word} lan={lan}/>
					}
				</>
			</div>
		</div>
    );
};

export default RAnalysis;