import * as React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { Button } from 'primereact/button';
import {Camera, CameraType } from "react-camera-pro";
import styled from 'styled-components';
import { Color } from '../../faceAnalysis';
import SidebarComponent from '../../components/Sidebar';
const GetPicture = ({history}: any) => {
	const [visible, setVisible] = React.useState(false);
	const [numberOfCameras, setNumberOfCameras] = React.useState(0);
	const [showImage, setShowImage] = React.useState(false);
	const camera = React.useRef<CameraType>(null);
	const [image, setImage] = React.useState<string | null>(null);
	const [showCamera, setShowCamera] = React.useState(false);
	const location: any = useLocation();
	const {from, age, lan} = location?.state;
	console.log("ff", from)
	// const lan = location?.state.lan as string;
	React.useEffect(() => {
		let ins: any = document.createElement('ins');
        let scr: any = document.createElement('script');

		if ((window as any).ReactNativeWebView) {
			ins.className = 'kakao_ad_area';
			ins.style = "display:none;";
			scr.async = 'true';
			scr.type = "text/javascript";
			scr.src = "//t1.daumcdn.net/kas/static/ba.min.js";
			ins.setAttribute('data-ad-width', '320');
			ins.setAttribute('data-ad-height', '100');
			ins.setAttribute('data-ad-unit', "DAN-d0MIQFOwQDry7NQj");
		} else {
			ins.className = 'kakao_ad_area';
			ins.style = "display:none;";
			scr.async = 'true';
			scr.type = "text/javascript";
			scr.src = "//t1.daumcdn.net/kas/static/ba.min.js";
			ins.setAttribute('data-ad-width', '320');
			ins.setAttribute('data-ad-height', '100');
			ins.setAttribute('data-ad-unit', 'DAN-WyB8fzPP0AF3uyuJ');
		}
        (document as any).querySelector(".ad-banner").appendChild(ins);
        (document as any).querySelector('.ad-banner').appendChild(scr);
	}, [])
	const takePicture = (e?: any) => {
		setShowCamera(true);
	}
	const onFileUpload = (event: any) => {
		event.preventDefault();
		let reader = new FileReader();
		let file = event.target.files[0];
		reader.onloadend = () => {
			let photo = reader.result
			switch (from) {
				case "first":
					history.push({
						pathname: "/age_analysis",
						state: {
							photo,
							age,
							from: "first",
							lan
						}
					})
					break;
				case "second":
					history.push({
						pathname: "/emotion_analysis",
						state: {
							photo,
							from: "second",
							lan
						}
					})
					break;
			}
		}
		reader.readAsDataURL(file);
	}
	const getAlbum = (event: any) => {
		let btn = document.getElementById("e_album");
		btn?.click();
	}
	return (
		<div>
		{
			!showCamera 
			? <div style={{height: "100vh"}}>
				<div className="container" style={{background: `${from === "first" ? Color.zero : Color.second}`, width: "100%", height: "10%", display: "flex", justifyContent: "space-around", paddingTop: ".75rem"}}>
					<div style={{width: "2rem"}}></div>
					<div className="container" style={{color: "white", fontSize: "5vw", fontWeight: 600}}>{from === "first" ? lan === "ko" ? "얼척(尺)이가 보는 나의 나이" : "My age that facepago sees" : lan === "ko" ? "얼척(尺)이가 보는 나의 감정" : "My emo that Facepago sees"}</div>
					<SidebarComponent lan={lan}/>
				</div>				<div className="container" style={{height: "90%", backgroundColor: Color[from], filter: "brightness(1.4)", flexDirection: "column"}}>
					<div style={{display: "flex", justifyContent: "center", fontFamily: "EliceDigitalBaeum_Bold, sans-serif"}}>
						<div className="container" style={{flexDirection: "column"}}>
							<Button icon="fas fa-camera" onClick={takePicture} className="mt-3 p-4 p-button-outlined p-button-info pictureBtn" />
							<div style={{margin: ".5rem", fontSize: "6vw"}}>{lan === "ko" ? "카메라" : "Camera"}</div>
						</div>
						<div className="container" style={{flexDirection: "column"}}>
							<Button icon="far fa-images" className="mt-3 p-4 p-button-outlined p-button-success pictureBtn" 
							onClick={getAlbum} />
							<div style={{margin: ".5rem", fontSize: "6vw"}}>{lan === "ko" ? "앨범" : "Album"}</div>
						</div>
						<input id="e_album" type="file" onChange={(e) => {onFileUpload(e)}} accept="image/*"
						style={{display: "none"}}></input>
                    </div>
                    {lan === "ko" ? <div className="container" style={{textAlign: "center", fontSize: "6vw", fontFamily: "EliceDigitalBaeum_Bold, sans-serif", marginTop: "2rem"}}>위 버튼을 클릭하여 <br></br> 사진을 가져오세요</div>
					: <div className="container" style={{textAlign: "center", fontSize: "6vw", fontFamily: "EliceDigitalBaeum_Bold, sans-serif", marginTop: "2rem"}}>Click the button above <br></br> to get the picture</div>}
					{/* <div className="ad-banner" style={{position: "absolute", bottom: 0, filter: "brightness(0.714)"}}>
					</div> */}
				</div>
				<div className="ad-banner" style={{position: "absolute", bottom: 0, left: "50%", transform: "translate(-50%, 0)", width: "320px", height: "100px"}}>
				</div>
			</div>
			:
				<Wrapper>
				{showImage ? (
					<FullScreenImagePreview
						image={image}
						onClick={() => {
							setShowImage(!showImage);
						}}
					/>
				) : (
					<Camera
						ref={camera}
						aspectRatio={9 / 16}
						numberOfCamerasCallback={setNumberOfCameras}
						errorMessages={{
							noCameraAccessible: 'No camera device accessible. Please connect your camera or try a different browser.',
							permissionDenied: 'Permission denied. Please refresh and give camera permission.',
							switchCamera:
								'It is not possible to switch camera to different one because there is only one video device accessible.',
							canvas: 'Canvas is not supported.',
						}}
					/>
				)}
				<Control>
					<ImagePreview
						image={image}
						onClick={() => {
							setShowImage(!showImage);
						}}
					/>
					<TakePhotoButton
						onClick={() => {
							if (camera.current) {
								const photo = camera.current.takePhoto();
								switch (from) {
									case "first":
										history.push({
											pathname: "/age_analysis",
											state: {
												photo,
												age,
												from: "first",
												lan
											}
										})
										break;
									case "second":
										history.push({
											pathname: "/emotion_analysis",
											state: {
												photo,
												from: "second",
												lan
											}
										})
										break;
									case "third":
										history.push({
											pathname: "/relation_analysis",
											state: {photo, lan}
										})
										break;
								}
								setImage(photo);
							}
						}}
					/>
					<ChangeFacingCameraButton
						disabled={numberOfCameras <= 1}
						onClick={() => {
							if (camera.current) {
								const result = camera.current.switchCamera();
							}
						}}
					/>
				</Control>
			</Wrapper>
			}
			</div>
	);
};

export default GetPicture;

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 1;
  max-width: 450px;
`;

const Control = styled.div`
  position: fixed;
  display: flex;
  justiyfy-content: center;
  width: 20%;
  min-width: 130px;
  min-height: 130px;
  height: 100vh;
  background: rgba(0, 0, 0, 1);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px;
  box-sizing: border-box;
  flex-direction: column-reverse;
  max-width: 450px;
  @media (max-aspect-ratio: 5/1) {
    flex-direction: row;
    bottom: 0;
    width: 100%;
    height: 20vh;
  }
  @media (max-width: 400px) {
    padding: 10px;
  }
`;

const ButtonCm = styled.button`
  outline: none;
  color: white;
  opacity: 1;
  background: transparent;
  background-color: transparent;
  background-position-x: 0%;
  background-position-y: 0%;
  background-repeat: repeat;
  background-image: none;
  padding: 0;
  text-shadow: 0px 0px 4px black;
  background-position: center center;
  background-repeat: no-repeat;
  pointer-events: auto;
  cursor: pointer;
  z-index: 2;
  filter: invert(100%);
  border: none;
  &:hover {
    opacity: 0.7;
  }
`;

const TakePhotoButton = styled(ButtonCm)`
  background: url('https://img.icons8.com/ios/50/000000/compact-camera.png');
  background-position: center;
  background-size: 50px;
  background-repeat: no-repeat;
  width: 80px;
  height: 80px;
  border: solid 4px black;
  border-radius: 50%;
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const ChangeFacingCameraButton = styled(ButtonCm)`
  background: url(https://img.icons8.com/ios/50/000000/switch-camera.png);
  background-position: center;
  background-size: 40px;
  background-repeat: no-repeat;
  width: 40px;
  height: 40px;
  padding: 40px;
  &:disabled {
    opacity: 0;
    cursor: default;
    padding: 60px;
  }
  @media (max-width: 400px) {
    padding: 40px 5px;
    &:disabled {
      padding: 40px 25px;
    }
  }
`;

const ImagePreview = styled.div<{ image: string | null }>`
  width: 120px;
  height: 120px;
  ${({ image }) => (image ? `background-image:  url(${image});` : '')}
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  @media (max-width: 400px) {
    width: 50px;
    height: 120px;
  }
`;

const FullScreenImagePreview = styled.div<{ image: string | null }>`
  width: 100%;
  height: 100%;
  z-index: 100;
  position: absolute;
  background-color: black;
  ${({ image }) => (image ? `background-image:  url(${image});` : '')}
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;