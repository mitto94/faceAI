import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { Color, Relation } from '../../faceAnalysis';
import * as faceapi from 'face-api.js';
import { confirmDialog } from 'primereact/confirmdialog'
import Loading from '../Loading';
import SidebarComponent from '../../components/Sidebar';
// import {FacebookShareButton, FacebookIcon, TwitterIcon, WhatsappIcon, WhatsappShareButton, PinterestIcon, PinterestShareButton, InstapaperIcon, InstapaperShareButton, TwitterShareButton } from "react-share";
const RAnalysis = ({history}: any) => {
	const [show, setShow] = React.useState(false);
	const [data, setData] = React.useState({
		distance: 0,
		finish: false
	})
	const location: any = useLocation();
    const {image, secondImage, from, relation} = location?.state;
	let imageRef1: any = React.createRef();
	let imageRef2: any = React.createRef();
	React.useEffect(() => {
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
					distance: data,
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
			message: '얼굴을 인식하지 못했습니다. 사진을 다시 찍으시겠습니까?',
			header: '혹시.. 천사신가요?',
			icon: 'pi pi-exclamation-triangle',
			accept: () => history.push("/relation"),
			reject: () => history.push("/"),
			onHide: () => history.push("/relation"),
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
        <div style={{height: "100%", display: "flex", flexDirection: "column", width: "100%"}}>
			<div className="container" style={{background: Color.third, width: "100%", height: "10%", display: "flex", justifyContent: "space-around"}}>
				<div style={{width: "2rem", fontSize: "1.5rem", color: "white"}}>
					<i className="fas fa-home" onClick={() => history.push("/")}></i>
				</div>
				<div className="container" style={{color: "white", fontSize: "1.7rem", fontFamily: "Stylish, sans-serif"}}>AI가 보는 우리 얼굴</div>
				<SidebarComponent />
			</div>
			<div style={{backgroundColor: Color[from], width: "100vw", height: "100%", filter: "brightness(1.4)"}}> 
				<>
					<div className="container" style={{height: "37vh",  display: `${data.finish ? "flex" : "none"}`, justifyContent: "center", fontFamily: "Stylish, sans-serif", fontSize: "1.3rem"}}>
						<div style={{display: "flex", flexDirection: "column", alignItems: "center", margin: "0.5rem"}}>
							<img ref={(ref) => imageRef1 = ref} style={{width: "40vw", height: "30vh"}}></img>
							<label>사진 1</label>
						</div>
						<div style={{display: "flex", flexDirection: "column", alignItems: "center", margin: "0.5rem"}}>
							<img ref={(ref) => imageRef2 = ref} style={{width: "40vw", height: "30vh"}}></img>
							<label>사진 2</label>
						</div>
					</div>
					{data.finish ?
						<>
						<div style={{display: "flex", justifyContent: "center"}}>
							{/* <div className="container-ct m-1" style={{border: "1px solid gray", borderRadius: "50px", width: "6rem", height: "6rem", background: `${sFlag === "first" ? "#ffa94d": ""}`}}>안 닮음</div> */}
							<div className="container-ct m-1" style={{color: "#8B4513", fontWeight: sFlag === "first" ? 600: 300, width: "30vw", border: "0px solid gray", height: "7rem", borderRadius: "5rem", background: `${sFlag === "first" ? `${Color.third}`: "white"}`, boxShadow: `3px 3px 3px 1px gray`, filter: "brightness(0.8)"}}>안 닮음</div>
							<div className="container-ct m-1" style={{color: "#8B4513", fontWeight: sFlag === "second" ? 600: 300, border: "0px solid gray", borderRadius: "5rem", width: "30vw", height: "7rem", background: `${sFlag === "second" ? `${Color.third}`: "white"}`, boxShadow: `3px 3px 3px 1px gray`, filter: "brightness(0.8)"}}>조금 닮음</div>
							<div className="container-ct m-1" style={{color: "#8B4513", fontWeight: sFlag === "third" ? 600: 300, border: "0px solid gray", borderRadius: "5rem", width: "30vw", height: "7rem", background: `${sFlag === "third" ? `${Color.third}`: "white"}`, boxShadow: `3px 3px 3px 1px gray`, filter: "brightness(0.8)"}}>매우 닮음</div>
						</div>
						<div className="container" style={{fontSize: "1.6rem", padding: "1.2rem", filter: "brightness(0.5)", fontFamily: "Sunflower, sans-serif"}}><span style={{color: Color.third, fontWeight: 500}}>{(1 - data.distance + 0.15) * 100 > 100 ? `100% ` : `${(Math.floor((1 - data.distance + 0.15) * 100))}% ` }</span>&nbsp;{"만큼 닮아있어요"}</div>
						<pre className="container" style={{width: "100vw", height: "9vh", fontSize: "2rem", textAlign: "center", fontFamily: "Cute Font, cursive"}}>{Relation[relation][sFlag]}</pre>
						<div style={{display: "flex", justifyContent: "center"}}>
							<div className="addthis_inline_share_toolbox"></div>
								{/* <FacebookShareButton url="https://ulpago.netlify.app/relation_analysis" style={{margin: "0.55rem"}}>
									<FacebookIcon size={40} round={true}/>
								</FacebookShareButton>
								<TwitterShareButton url="https://ulpago.netlify.app/relation_analysis" style={{margin: "0.55rem"}}>
									<TwitterIcon size={40} round={true}/>
								</TwitterShareButton>
								<InstapaperShareButton url="https://ulpago.netlify.app/relation_analysis" style={{margin: "0.55rem"}}>
									<InstapaperIcon size={40} round={true}/>
								</InstapaperShareButton> */}
							</div>
					</>
					:
					<Loading />
					}
				</>
			</div>
		</div>
    );
};

export default RAnalysis;