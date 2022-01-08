import * as React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { Button } from 'primereact/button';
import {Camera, CameraType } from "react-camera-pro";
import styled from 'styled-components';
import { Color } from '../../faceAnalysis';
import SidebarComponent from '../../components/Sidebar';

export interface CameraProps {
	facingMode?: any;
	aspectRatio?: any;
	numberOfCamerasCallback?(numberOfCameras: number): void;
	errorMessages?: {
			noCameraAccessible?: string;
			permissionDenied?: string;
			switchCamera?: string;
			canvas?: string;
	};
}
const GetPicture = ({history}: any) => {
	const [numberOfCameras, setNumberOfCameras] = React.useState(0);
	const [showImage, setShowImage] = React.useState(false);
	const camera = React.useRef<CameraType>(null);
	const [image, setImage] = React.useState<string | null>(null);
  const [secondImage, setSecondImage] = React.useState<string | null>(null);

	const [showCamera, setShowCamera] = React.useState(false);
	const location: any = useLocation();
  let image1: any = React.createRef();
  let image2: any = React.createRef();
	const age = location?.state?.age;
	const from = location?.state?.from;
	const lan = location?.state?.lan;
  const relation = location?.state?.relation;
	const takePicture = (e?: any) => {
		setShowCamera(true);
	}
  const onFileUpload = (event: any) => {
		event.preventDefault();
		let reader = new FileReader();
		let file = event.target.files[0];
		reader.onloadend = () => {
      let photo = reader.result as string;
      if (!image && !secondImage) {
        setImage(photo);
      } else if (image && !secondImage) {
        setSecondImage(photo)
      } else if (!image && secondImage) {
        setImage(photo)
      } else {
        setSecondImage(photo);
      }
      setShowCamera(false);
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
			? <div style={{height: "100vh", overflow: "auto"}}>
          <div className="container" style={{background: Color.third, width: "100%", height: "10%", display: "flex", justifyContent: "space-around", paddingTop: ".75rem"}}>
            <div style={{width: "2rem"}}></div>
            <div className="container" style={{color: "white", fontSize: "5vw", fontWeight: 600}}>{lan === "ko" ? "얼척(尺)이가 보는 우리 얼굴" : "Our faces that Facepago sees"}</div>
            <SidebarComponent lan={lan}/>
          </div>
          <div className="container" style={{height: "100%", backgroundColor: Color[from], justifyContent: "flex-start",flexDirection: "column", filter: "brightness(1.4)"}}>
                    <div style={{height: "28vh", display: "flex", alignItems: "start", marginTop: "1rem"}}>
                        {/* <div className="m-2 container" style={{width: "40vw", height: "15vh", border: "1px dashed black"}}>Image Area<img style={{width: "10rem", height: "10rem", position: "absolute"}} src={image as any && image}></img></div>    
                        <div ref={image2} className="m-2 container" style={{width: "40vw", height: "15vh", border: "1px dashed black"}}>Image Area</div>     */}
                      <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <img ref={(ref) => image1 = ref} style={{width: "34vw", height: "27vh", margin: ".5rem", maxWidth: "130px"}} src={image ? image : `./basic.jpeg`} onClick={takePicture}></img>
                        {image && <Button onClick={() => setImage(null)} icon="pi pi-times" style={{background: "red", border: "none", width: "1.75rem", height: "1.75rem", display: "absolute", left: "34%", bottom: "28vh"}} />}
                      </div>
                      <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <img ref={(ref) => image2 = ref} style={{width: "34vw", height: "27vh", margin: ".5rem", maxWidth: "130px"}} src={secondImage ? secondImage : `./basic.jpeg`} onClick={takePicture}></img>
                        {secondImage && <Button onClick={() => setSecondImage(null)} icon="pi pi-times" style={{background: "red", border: "none", width: "1.75rem", height: "1.75rem", display: "absolute", left: "34%", bottom: "28vh"}}/>}
                      </div>
                    </div>
                    <div style={{display: "flex", justifyContent: "center", fontFamily: "EliceDigitalBaeum_Bold, sans-serif"}}>
                  
                      <div className="container" style={{flexDirection: "column"}}>
                        <Button icon="fas fa-camera" onClick={takePicture} className="mt-2 p-3 p-button-outlined p-button-info pictureBtn" />
                        <div style={{margin: ".5rem", fontSize: "6vw"}}>{lan === "ko" ? "카메라" : "Camera"}</div>
						          </div>
                      <div className="container" style={{flexDirection: "column"}}>
                        <Button icon="far fa-images" onClick={getAlbum} className="mt-2 p-3 p-button-outlined p-button-success pictureBtn" />
                        <div style={{margin: ".5rem", fontSize: "6vw"}}>{lan === "ko" ? "앨범" : "Album"}</div>
						          </div>
                        <input id="e_album" type="file" onChange={(e) => {onFileUpload(e)}} accept="image/*"
						              style={{display: "none"}}></input>
                    </div>
                    {lan === "ko" ? <div className="container" style={{textAlign: "center", fontSize: "5.5vw", fontFamily: "EliceDigitalBaeum_Bold, sans-serif", marginTop: "1rem"}}>위 버튼을 통해서 비교하고 싶은 <br></br> 두 장의 사진을 가져오세요</div>
                    : <div className="container" style={{textAlign: "center", fontSize: "5.5vw", fontFamily: "EliceDigitalBaeum_Bold, sans-serif", marginTop: "1rem"}}>Please bring two pictures that <br></br> you want to compare</div>}
                    <Button style={{background: "#8B4513", border: "none", minHeight: "2rem"}} className="m-4 p-button-secondary" label={lan === "ko" ? "AI로 비교하기" : "Check with AI"} onClick={() => {
                      if (image && secondImage) {
                            history.push({
                            pathname: "/relation_analysis",
                            state: {image, secondImage, from, relation, lan}
                        })
                        return;
                      }
                    }}></Button>
                    {lan === "ko" ? <div className="container" style={{textAlign: "center", fontSize: "5.5vw", fontFamily: "EliceDigitalBaeum_Bold, sans-serif"}}>사진을 가져 온 후 <br></br> 위 버튼을 누르세요</div>
                    : <div className="container" style={{textAlign: "center", fontSize: "5.5vw", fontFamily: "EliceDigitalBaeum_Bold, sans-serif"}}>Bring the picture and <br></br> press the check button</div>}
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
              
                if (!image && !secondImage) {
                  setImage(photo);
                } else if (image && !secondImage) {
                  setSecondImage(photo)
                } else if (!image && secondImage) {
                  setImage(photo)
                } else {
                  setSecondImage(photo);
                }
                
                setShowCamera(false);
							}
						}}
					/>
					<ChangeFacingCameraButton
						disabled={numberOfCameras <= 1}
						onClick={() => {
							if (camera.current) {
								const result = camera.current.switchCamera();
								console.log(result);
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