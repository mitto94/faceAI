import * as React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Loading from '../Loading';
import * as faceapi from 'face-api.js';
import { confirmDialog } from 'primereact/confirmdialog'
import { AgeSentence, Color, Sentence } from '../../faceAnalysis';
import SidebarComponent from '../../components/Sidebar';
import {FacebookShareButton, FacebookIcon, TwitterIcon, WhatsappIcon, WhatsappShareButton, PinterestIcon, PinterestShareButton, InstapaperIcon, InstapaperShareButton, TwitterShareButton } from "react-share"; 
import { Button } from 'primereact/button';
import html2canvas from 'html2canvas';
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
		console.log("word", word)
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
					age: parseInt(canvas2.age),
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
				<div className="container" style={{background: "#524F4A", width: "100%", height: "10%", display: "flex", justifyContent: "space-around"}}>
					<div style={{width: "2rem", fontSize: "1.5rem", color: "white"}}>
						<i className="fas fa-home" onClick={() => history.push("/")}></i>
					</div>
					<div className="container" style={{color: "white", fontSize: "1.6rem", fontWeight: 500, fontFamily: "Stylish, sans-serif"}}>AI로 얼굴나이 확인하기</div>
					<SidebarComponent />
				</div>		
				<div style={{backgroundColor: "white", width: "100vw", height: "90%"}}> 
					<>
						<div className="container" style={{maxHeight: "40vh", height: "40vh", display: `${photoInfo.finish ? "flex" : "none"}`, paddingTop: "10%"}}>
							<img ref={(ref) => imageRef = ref} style={{width: "40vw", textAlign: "center"}} crossOrigin='anonymous'/>
						</div>
						{photoInfo.finish
						?
						<>
							<div style={{display: "flex", justifyContent: "center", paddingTop: "10%", fontFamily: "Stylish, sans-serif"}}>
								<div className="m-2" style={{display: "flex", alignItems: "center", flexDirection: "column", width: "45vw", height: "30vw", background: "white", borderRadius: "0.5rem", boxShadow: "2px 2px 2px 2px #999", border: "1px solid rgba(0, 0, 0, 0.5)"}}>
									<div style={{fontWeight: 600, fontSize: "1.6rem", margin: "0.55rem"}}>실제 나이</div>
									<span style={{fontWeight: 550, fontSize: "1.6rem"}}>{age} 살</span>
								</div>
								<div className="m-2" style={{display: "flex", alignItems: "center", flexDirection: "column", width: "45vw", height: "30vw", background: "white", borderRadius: "0.5rem", boxShadow: "2px 2px 2px 2px #999", border: "1px solid rgba(0, 0, 0, 0.5)"}}>
									<div style={{fontWeight: 600, fontSize: "1.6rem", margin: "0.55rem"}}>예측 나이</div>
									<span style={{fontWeight: 550, fontSize: "1.6rem", color: "purple"}}>{photoInfo.age} 살</span>
								</div>
							</div>
							<div style={{display: "flex", flexDirection: "column", width: "100vw", alignItems: "center"}}>
								<pre className="container" style={{width: "100vw", height: "12.5vh", fontSize: "2rem", textAlign: "center", fontFamily: "Cute Font, cursive"}}>{age < photoInfo.age ? randomItem(AgeSentence.over) : age > photoInfo.age ? randomItem(AgeSentence.under) : randomItem(AgeSentence.same)}</pre>
							</div>
							<div style={{display: "flex", justifyContent: "center", height: "8vh", alignItems: "center", width: "100%"}}>
								{/* <button className="face-btn" style={{border: `1px solid ${Color.zero}`, color: Color.zero, fontSize: "1.65rem", fontFamily: "Stylish, sans-serif", boxShadow: "1px 1px 1px 1px gray", minHeight: "2.5rem", background: "white"}}
								onClick={(e?) => {
									html2canvas(document.getElementById("capture") as any).then(function(canvas) {
										let a = document.createElement("a");
										a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
										a.download = "faceAi.jpeg";
										a.click();
									});
								}}>저장하기</button> */}
								<pre style={{whiteSpace: "pre-wrap", wordBreak: "keep-all", textAlign: "center", width: "85%", fontFamily: "Pattaya, sans-serif", opacity: ".4"}}>{randomItem(Sentence.front)}</pre>
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
