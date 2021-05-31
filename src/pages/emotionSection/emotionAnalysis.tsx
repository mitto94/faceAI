import * as React from 'react';
import { Link, BrowserRouter as Router, useHistory, useLocation } from 'react-router-dom';
import Loading from '../Loading';
import * as faceapi from 'face-api.js';
import { confirmDialog } from 'primereact/confirmdialog'
import { AgeSentence, Color, Sentence } from '../../faceAnalysis';
import { Chart } from 'primereact/chart';
import {Bar} from 'react-chartjs-2';
import SidebarComponent from '../../components/Sidebar';
let word: string;
const EmotionAnalysis: React.FC = ({history}: any) => {
	const [show, setShow] = React.useState(false);
	const [photoInfo, setPhotoInfo] = React.useState({
		emotion: [],
		finish: false
	})
    let emotionChart = {datasets: [] as any, labels: []};
	const location: any = useLocation();
	const photo = location?.state?.photo;
	let from = location?.state?.from;
	let imageRef: any = React.createRef();
	const randomItem = (a: Array<string>) => {
		return a[Math.floor(Math.random() * a.length)];
	}
	if (show === false) {
		word = randomItem(Sentence.ad);
	}
	React.useEffect(() => {
		if ((window as any).ReactNativeWebView) {
			(window as any).ReactNativeWebView.postMessage("start");
		}
		const getAi = async () => {
			await Promise.all([
				faceapi.nets.faceExpressionNet.loadFromUri('/models'),
				faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
			])
			setShow(true);
		}
		getAi();
	}, [])
	React.useEffect(() => {
		if (show) {
			const getAnalysis = async () => {
				imageRef.src = photo;
				const canvas2: any = await faceapi.detectSingleFace(imageRef as any).withFaceExpressions();
				if (canvas2 === undefined) {
					await confirm();
					return null;
				} 
				setPhotoInfo({
					emotion: canvas2.expressions,
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
			accept: () => {history.push({
				pathname: "age_photo",
				state: {
					from: "second"
				}
			})},
			reject: () => history.push("/"),
			onHide: () => history.push("/"),
		});
	}
	let emotionHash = Object.keys(photoInfo.emotion).map(element => {
		return {name: element , value: Math.sqrt(Math.sqrt(Math.sqrt(photoInfo.emotion[element as any])))}
	});
	emotionHash.sort((a, b) => {
		return b.value - a.value;
	})
    const colorMaker = (emotion: string) => {
        switch (emotion) {
            case "surprised": return "yellow";
            case "neutral": return "gray";
            case "angry": return "red";
            case "happy": return "green";
            case "fearful": return "purple";
            case "disgusted": return "black";
            case "sad": return "blue";
        };
    }
    let num = [{label: '나의 감정', data: [] as any, backgroundColor: [] as any}];
    let labels = [] as any;
    emotionHash.forEach((item) => {
		let data;
		switch(item.name) {
			case "surprised": data = "놀람"; break;
			case "neutral":  data = "무 표정"; break;
            case "angry": data = "화남"; break;
            case "happy": data = "행복함"; break;
            case "fearful": data = "두려움"; break;
            case "disgusted": data = "경멸"; break;
            case "sad": data = "슬픔"; break;
		}
        num[0].data.push(item.value);
        num[0].backgroundColor.push(colorMaker(item.name));
        labels.push(data);
    });
    emotionChart = {
        datasets: num,
        labels: labels
    }
    let lightOptions = {
        legend: {
            labels: {
                fontColor: 'black'
            }
        },
        scale: {
            gridLines: {
                color: '#ebedef'
            }
        }
    };
	return (
			<div id="capture" style={{height: "100vh", maxWidth: "450px"}}>
				<div className="container" style={{background: "#A6A998", width: "100%", height: "10%", display: "flex", justifyContent: "space-around"}}>
					<div style={{width: "2rem", fontSize: "1.5rem", color: "white"}}>
						<i className="fas fa-home" onClick={() => history.push("/")}></i>
					</div>
					<div className="container" style={{color: "white", fontSize: "1.7rem", fontWeight: 500, fontFamily: "Stylish, sans-serif"}}>AI가 보는 나의 감정</div>
					<SidebarComponent />
				</div>
				<div style={{backgroundColor:"#E8EDD5", width: "100vw", height: "90%", maxWidth: "450px", }}> 
					<>
						<div className="container" style={{maxHeight: "40%", height: "40%", display: `${photoInfo.finish ? "flex" : "none"}`, paddingTop: "10%"}}>
							<img ref={(ref) => imageRef = ref} style={{width: "45vw", textAlign: "center", maxHeight: "40vh", maxWidth: "270px"}} crossOrigin='anonymous'/>
						</div>
						{photoInfo.finish
						?
						<>
							<div style={{display: "flex", justifyContent: "center", flexDirection: "column", margin: "1rem", paddingTop: "10%", fontFamily: "Cute Font, cursive", height: "45%"}}>
								{emotionChart.labels.length !== 0
								&& 
								<Bar data={emotionChart} type={""}/>
								}
								<label style={{textAlign: "center", fontSize: "1.8rem", marginBottom: "10%"}}>{`당신의 기분은`}
								<br></br>
								<span style={{color: "purple", fontFamily: "Cute Font, cursive"}}>{`${emotionChart.labels[0]}`}</span>{`이거나 ` }
								<span style={{color: "purple", fontFamily: "Cute Font, cursive"}}>{`${emotionChart.labels[1]}`}</span>{`일 것 같아요`}</label>
							</div>
							<div style={{display: "flex", justifyContent: "center"}}>
							<div style={{display: "flex", justifyContent: "center", height: "8vh", alignItems: "center"}}>
								<pre style={{whiteSpace: "pre-wrap", wordBreak: "keep-all", textAlign: "center", width: "85%", fontFamily: "Pattaya, sans-serif", opacity: ".4"}}>{randomItem(Sentence.front)}<br />{"-Wise Saying-"}</pre>
							</div>
							</div>
						</>
						:
						<Loading random={word}/>
						}
					</>
				</div>
			</div>
	);
};

export default EmotionAnalysis;