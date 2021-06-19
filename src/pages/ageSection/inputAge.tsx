import * as React from 'react';
// import { Link, BrowserRouter as Router, useHistory } from 'react-router-dom';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Color } from '../../faceAnalysis';
import SidebarComponent from '../../components/Sidebar';

const InputAge: React.FC = ({history}: any) => {
	const [visible, setVisible] = React.useState(false);
	const [age, setAge] = React.useState();
	let redd: any = React.useRef();
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
			ins.setAttribute('data-ad-unit', "DAN-MA2JV3KAqVlbMwqJ");
		} else {
			ins.className = 'kakao_ad_area';
			ins.style = "display:none;";
			scr.async = 'true';
			scr.type = "text/javascript";
			scr.src = "//t1.daumcdn.net/kas/static/ba.min.js";
			ins.setAttribute('data-ad-width', '320');
			ins.setAttribute('data-ad-height', '100');
			ins.setAttribute('data-ad-unit', "DAN-XTbmDuTkWuLkadnO");
		}
        (document as any).querySelector(".ad-banner").appendChild(ins);
        (document as any).querySelector('.ad-banner').appendChild(scr);
	}, [])
	
    return (
			<div style={{height: "100vh"}}>
        		<div className="container" style={{background: Color.zero, width: "100%", height: "10%", display: "flex", justifyContent: "space-around", paddingTop: ".75rem"}}>
					<div style={{width: "2rem"}}></div>
					<div className="container" style={{color: "white", fontSize: "1.25rem", fontWeight: 600}}>얼척(尺)이가 보는 나의 나이</div>
					<SidebarComponent />
				</div>
				<div className="container" style={{height: "90%", flexDirection: "column" , backgroundColor: Color.first, filter: "brightness(1.4)"}}>
					<div className="container">
						<InputNumber inputStyle={{fontSize: "2rem", width: "5rem", textAlign: "center", marginLeft: "6rem", border: "1px solid gray"}} value={age} onValueChange={(e: any) => setAge(e.value)} min={0} max={140} />
						<span style={{fontFamily: "EliceDigitalBaeum_Bold, sans-serif", fontSize: "2rem"}}>살</span>
						<Button
							onClick={() => {history.push({
								pathname: "age_photo",
								state: {
									from: "first",
									age: age === undefined ? 0 : age
							}
							})}}
							style={{width: "4.2rem", height: "4rem", marginLeft: "0.5rem", paddingTop: "0.25rem", background: Color["zero"], border: "none"}}
							label="입력"
						/>
					</div>
					<pre className="container" style={{width: "100%", height: "20vh", textAlign: "center", fontSize: "1.45rem", fontFamily: "EliceDigitalBaeum_Bold, sans-serif"}} data-aos="zoom-in" data-aos-delay="200">{"나이를 입력하신 후\n입력 버튼을 누르세요"}</pre>
				</div>
				<div ref={(ref => redd = ref)} id="ad-banner" className="ad-banner" style={{position: "absolute", bottom: 0, left: "50%", transform: "translate(-50%, 0)", width: "320px", height: "100px"}}>
					</div>
			</div>
    );
};

export default InputAge;