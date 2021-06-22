import * as React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Loading from '../Loading';
import * as faceapi from 'face-api.js';
import { confirmDialog } from 'primereact/confirmdialog'
import { AgeSentence, Color, Sentence } from '../../faceAnalysis';
import SidebarComponent from '../../components/Sidebar';
let word= "";
const AgeAnalysis = ({history}: any) => {
	const [visible, setVisible] = React.useState(false);
	const [show, setShow] = React.useState(false);
	const [photoInfo, setPhotoInfo] = React.useState({
		age: 0,
		finish: false
	})
	const location: any = useLocation();
	let canvas;
	const photo = location?.state?.photo;
	let from = location?.state?.from;
	let age = location?.state?.age;
	let tag = false;
	let imageRef: any = React.createRef();
	const pathname = location.pathname
	const randomItem = (a: Array<string>) => {
		return a[Math.floor(Math.random() * a.length)];
	}
	
	if (show === false) {
		word = randomItem(Sentence.ad);
	}
	React.useEffect(() => {
		// if ((window as any).ReactNativeWebView) {
		// 	(window as any).ReactNativeWebView.postMessage("all");
		// }
		const getAi = async () => {
			await Promise.all([
				faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
				faceapi.nets.ageGenderNet.loadFromUri("/models")
			])
			setShow(true);
		}
		getAi();
	}, [])
	React.useEffect(() => {
		if (show) {
			const getAnalysis = async () => {
				imageRef.src = photo;
				const canvas2: any = await faceapi.detectSingleFace(imageRef as any).withAgeAndGender();
				if (canvas2 === undefined) {
					await confirm();
					return null;
				} 
				setPhotoInfo({
					age: parseInt(canvas2.age > 29 ? canvas2.age > 45 ? canvas2.age - 10 : canvas2.age - 5 : canvas2.age),
					finish: true
				})
			}
			if (imageRef?.current !== null) {
				getAnalysis();
			}
		}
	}, [show])
	const confirm = () => {
    confirmDialog({
        message: '얼굴을 인식하지 못했습니다. 사진을 다시 찍으시겠습니까?',
        header: '혹시.. 천사신가요?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => history.push("age"),
        reject: () => history.push("/"),
        onHide: () => history.push("/"),
    });
	}
	return (
			<div id="capture" style={{height: "100%", overflow: "auto"}}>
				<div className="container" style={{background: "#524F4A", width: "100%", height: "10%", display: "flex", justifyContent: "space-around", paddingTop: ".75rem"}}>
					<div style={{width: "2rem", fontSize: "1.5rem", color: "white"}}>
						<i className="fas fa-home" onClick={() => history.push("/")}></i>
					</div>
					<div className="container" style={{color: "white", fontSize: "5vw", fontWeight: 600}}>얼척(尺)이가 보는 나의 나이</div>
					<SidebarComponent />
				</div>		
				<div style={{backgroundColor: "white", width: "100%", height: "90%", maxWidth: "450px", }}> 
					<>
						<div className="container" style={{maxHeight: "40%", height: "40vh", display: `${photoInfo.finish ? "flex" : "none"}`, paddingTop: "10%"}}>
							<img ref={(ref) => imageRef = ref} style={{width: "40vw", textAlign: "center", maxWidth: "200px"}} crossOrigin='anonymous'/>
						</div>
						{photoInfo.finish
						?
						<>
							<div style={{display: "flex", justifyContent: "center", paddingTop: "10%", fontFamily: "EliceDigitalBaeum_Bold, sans-serif"}}>
								<div className="m-2" style={{display: "flex", alignItems: "center", flexDirection: "column", width: "45vw", height: "29vw", background: "white", borderRadius: "0.5rem", boxShadow: "2px 2px 2px 2px #999", border: "1px solid rgba(0, 0, 0, 0.5)", maxHeight: "200px"}}>
									<div style={{fontWeight: 600, fontSize: "6.5vw", margin: "0.55rem"}}>실제 나이</div>
									<span style={{fontWeight: 550, fontSize: "6.5vw"}}>{age} 살</span>
								</div>
								<div className="m-2" style={{display: "flex", alignItems: "center", flexDirection: "column", width: "45vw", height: "29vw", background: "white", borderRadius: "0.5rem", boxShadow: "2px 2px 2px 2px #999", border: "1px solid rgba(0, 0, 0, 0.5)", maxHeight: "200px"}}>
									<div style={{fontWeight: 600, fontSize: "6.5vw", margin: "0.55rem"}}>예측 나이</div>
									<span style={{fontWeight: 550, fontSize: "6.5vw", color: "purple"}}>{photoInfo.age} 살</span>
								</div>
							</div>
							<div style={{display: "flex", flexDirection: "column", width: "100%", alignItems: "center"}}>
								<pre className="container" style={{width: "100%", height: "14.5vh", fontSize: "6vw", textAlign: "center", fontFamily: "MapoBackpacking, cursive"}}>{age < photoInfo.age ? randomItem(AgeSentence.over) : age > photoInfo.age ? randomItem(AgeSentence.under) : randomItem(AgeSentence.same)}</pre>
							</div>
							<div style={{display: "flex", justifyContent: "center", height: "12vh", alignItems: "center", width: "100%"}}>
								<pre style={{whiteSpace: "pre-wrap", wordBreak: "keep-all", textAlign: "center", width: "85%", fontFamily: "Pattaya, sans-serif", opacity: ".6", fontSize: "4.5vw"}}>{randomItem(Sentence.front)}<br />{"-Wise Saying-"}</pre>
							</div>
						</>
						:
						<Loading random={word} />
						}
					</>
				</div>
			</div>
	);
};

export default AgeAnalysis;
