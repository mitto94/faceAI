import * as React from 'react';
import { Link, BrowserRouter as Router, useHistory, useLocation } from 'react-router-dom';
import { Button } from 'primereact/button';
import {Camera, CameraType } from "react-camera-pro";
import styled from 'styled-components';
import { Color } from '../../faceAnalysis';

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
	const [showCamera, setShowCamera] = React.useState(false);
	const location: any = useLocation();
	const {from, age} = location?.state;
	const takePicture = (e?: any) => {
		setShowCamera(true);
	}
	return (
		<div>
		{
			!showCamera 
			? <div>
				<div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "10%", background: Color[from], color: "white", fontSize: "1.25rem", fontWeight: 600}}>AI가 보는 나의 얼굴</div>
				<div className="container-ct" style={{backgroundColor: Color[from], filter: "brightness(1.4)"}}>
					<Button onClick={takePicture} label="Take Picture" style={{fontWeight: 700}} className="m-3 p-4 w-25 p-button-outlined p-button-info" />
					<Button label="Get album" style={{fontWeight: 700}} className="m-3 p-4 w-25 p-button-outlined p-button-success" />
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
								console.log(photo);
								switch (from) {
									case "first":
										history.push({
											pathname: "/age_analysis",
											state: {
												photo,
												age,
												from: "first"
											}
										})
										break;
									case "second":
										history.push({
											pathname: "/emotion_analysis",
											state: {
												photo,
												from: "second"
											}
										})
										break;
									case "third":
										history.push({
											pathname: "/relation_analysis",
											state: {photo}
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
  width: 100vw;
  height: 100vh;
  z-index: 1;
`;

const Control = styled.div`
  position: fixed;
  display: flex;
  right: 0;
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
  @media (max-aspect-ratio: 1/1) {
    flex-direction: row;
    bottom: 0;
    width: 100vw;
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
  width: 100vw;
  height: 100vh;
  z-index: 100;
  position: absolute;
  background-color: black;
  ${({ image }) => (image ? `background-image:  url(${image});` : '')}
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;