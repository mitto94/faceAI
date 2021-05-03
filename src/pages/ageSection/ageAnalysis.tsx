import * as React from 'react';
import { Link, BrowserRouter as Router, useHistory, useLocation } from 'react-router-dom';
import Loading from '../Loading';
import * as faceapi from 'face-api.js';
import { confirmDialog } from 'primereact/confirmdialog'
import { AgeSentence, Color } from '../../faceAnalysis';
import { Card } from 'primereact/card';

interface photoInfo {
	gender?: string;
	age?: number;
	emotion: Array<string>;
}

const AgeAnalysis = ({history}: any) => {
	const [show, setShow] = React.useState(false);
	const [photoInfo, setPhotoInfo] = React.useState({
		gender: "",
		age: 0,
		emotion: [],
		finish: false
	})
	const location: any = useLocation();
	let canvas;
	const photo = location?.state?.photo;
	let from = location?.state?.from;
	let age = location?.state?.age;
	let tag = false;
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
					age: parseInt(canvas2.age),
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
        accept: () => history.push("age")
    });
	}
	let emotionHash = Object.keys(photoInfo.emotion).map(element => {
		return {name: element , value: Math.sqrt(Math.sqrt(Math.sqrt(photoInfo.emotion[element as any])))}
	});
	emotionHash.sort((a, b) => {
		return b.value - a.value;
	})
	const randomItem = (a: Array<string>) => {
		return a[Math.floor(Math.random() * a.length)];
	}
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
							<div style={{display: "flex", justifyContent: "center"}}>
								{/* <Card title="실제 나이" style={{width: "45vw", fontSize: "1rem"}}>
										Content
								</Card>
								<Card title="AI 나이 측정"  style={{width: "45vw"}}>
										Content
								</Card> */}
								<div className="m-2" style={{display: "flex", alignItems: "center", flexDirection: "column", width: "45vw", height: "30vw", background: "white", borderRadius: "0.5rem", boxShadow: "2px 2px 2px 2px #999"}}>
									<div style={{fontWeight: 700, fontSize: "1.3rem", margin: "0.75rem"}}>실제 나이</div>
									<span style={{fontWeight: 600, fontSize: "1.3rem"}}>{age} 살</span>
								</div>
								<div className="m-2" style={{display: "flex", alignItems: "center", flexDirection: "column", width: "45vw", height: "30vw", background: "white", borderRadius: "0.5rem", boxShadow: "2px 2px 2px 2px #999"}}>
									<div style={{fontWeight: 700, fontSize: "1.3rem", margin: "0.75rem"}}>예측 나이</div>
									<span style={{fontWeight: 600, fontSize: "1.3rem", color: "purple"}}>{photoInfo.age} 살</span>
								</div>
								{/* <label>{`당신은 ${photoInfo.gender} 이에요`}</label> */}
								{/* <label>{`당신은 ${photoInfo.age}살 처럼 보이는 군요`}</label> */}
								{/* <label>{`당신의 기분은 ${emotionHash[0].name}이거나 ${emotionHash[1].name} 일것 같아요`}</label> */}
							</div>
							<div style={{display: "flex", flexDirection: "column", width: "100vw", alignItems: "center"}}>
								<div className="ment">{age < photoInfo.age ? randomItem(AgeSentence.over) : age > photoInfo.age ? randomItem(AgeSentence.under) : randomItem(AgeSentence.same)}</div>
                {/* <!-- Go to www.addthis.com/dashboard to customize your tools --> */}
                <div className="addthis_inline_share_toolbox"></div>
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

export default AgeAnalysis;
