import * as React from 'react';
import { Link, BrowserRouter as Router, useHistory, useLocation } from 'react-router-dom';
import Loading from '../Loading';
import * as faceapi from 'face-api.js';
import { confirmDialog } from 'primereact/confirmdialog'
import { AgeSentence, Color } from '../../faceAnalysis';
import { Chart } from 'primereact/chart';
import {Bar} from 'react-chartjs-2';

const EmotionAnalysis: React.FC = ({history}: any) => {
	const [show, setShow] = React.useState(false);
	const [photoInfo, setPhotoInfo] = React.useState({
		gender: "",
		emotion: [],
		finish: false
	})
    // let emotionChart = {datasets: [] as any, labels: []};
    let emotionChart = {datasets: [] as any, labels: []};
	const location: any = useLocation();
	const photo = location?.state?.photo;
	let from = location?.state?.from;
	let imageRef: any = React.createRef();

	React.useEffect(() => {
		const getAi = async () => {
			await Promise.all([
				faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
				faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
				faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
				faceapi.nets.faceExpressionNet.loadFromUri('/models'),
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
				const canvas2: any = await faceapi.detectSingleFace(imageRef as any).withFaceLandmarks().withFaceExpressions().withAgeAndGender().withFaceDescriptor();
				if (canvas2 === undefined) {
					await confirm();
					return null;
				} 
				setPhotoInfo({
					gender: canvas2.gender,
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
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => history.push("/")
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
        num[0].data.push(item.value);
        num[0].backgroundColor.push(colorMaker(item.name));
        labels.push(item.name);
    });
    emotionChart = {
        datasets: num,
        labels: labels
    }
    console.log("form", location);
    console.log("emtion", emotionHash);
    console.log("emotionChart", emotionChart);
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
			<>
				<div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "10%", background: Color[from], color: "white", fontSize: "1.25rem", fontWeight: 600}}>AI가 보는 나의 얼굴</div>
				<div style={{backgroundColor: Color[from], width: "100vw", height: "100vh", filter: "brightness(1.4)"}}> 
					<>
						<div className="container" style={{maxHeight: "50vh", height: "60vh", display: `${photoInfo.finish ? "flex" : "none"}`}}>
							<img ref={(ref) => imageRef = ref} style={{width: "50vw", textAlign: "center"}} crossOrigin='anonymous'/>
						</div>
						{photoInfo.finish
						?
						<>
							<div style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
								{emotionChart.labels.length !== 0
								&& 
								<Bar data={emotionChart} type={""}/>
								}
								<label>{`당신의 기분은 ${emotionHash[0].name}이거나 ${emotionHash[1].name} 일것 같아요`}</label>
							</div>
						</>
						:
						<Loading />
						}
					</>
				</div>
			</>
	);
};

export default EmotionAnalysis;