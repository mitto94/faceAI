import * as React from 'react';
import { useLocation } from 'react-router-dom';
import SidebarComponent from '../../components/Sidebar';
import { Color } from '../../faceAnalysis';

const InputRelationship: React.FC = ({history}: any) => {
	// const history = useHistory();
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
    const location: any = useLocation();
	const {lan} = location?.state;
    return (
        <div style={{height: "100vh"}}>
            <div className="container" style={{background: Color.third, width: "100%", height: "10%", display: "flex", justifyContent: "space-around", paddingTop: ".75rem"}}>
				<div style={{width: "2rem"}}></div>
				<div className="container" style={{color: "white", fontSize: "5vw", fontWeight: 600}}>{lan === "ko" ? "얼척(尺)이가 보는 우리 얼굴" : "Our faces that Facepago sees"}</div>
				<SidebarComponent lan={lan}/>
			</div>
            <div className="container" style={{width: "100%", height: "90%", background: Color["third"], filter: "brightness(1.4)", flexDirection: "column", fontFamily: "EliceDigitalBaeum_Bold, sans-serif"}}>
                <div style={{display: "flex"}}><div style={{display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", margin: ".5rem"}}
                    onClick={() => history.push({
                        pathname: "relation_photo",
                        state: {
                            from: "third",
                            relation: "family",
                            lan
                        }
                    })}>
                    <i style={{fontSize: "3.5rem"}} className="p-3 fas fa-house-user"></i>
                    <label style={{fontSize: "5.5vw"}} className="">{lan === "ko" ? "가족" : "Family"}</label>
                </div>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", margin: ".5rem"}}
                    onClick={() => history.push({
                        pathname: "relation_photo",
                        state: {
                            from: "third",
                            relation: "friend",
                            lan
                        }
                    })}>                    
                    <i style={{fontSize: "3.5rem"}} className="p-3 fas fa-users"></i>
                    <label style={{fontSize: "5.5vw"}} className="">{lan === "ko" ? "친구" : "Friend"}</label>
                </div>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", margin: ".5rem"}}
                    onClick={() => history.push({
                        pathname: "relation_photo",
                        state: {
                            from: "third",
                            relation: "couple",
                            lan
                        }
                    })}>                    
                    <i style={{fontSize: "3.5rem"}} className="p-3 fas fa-heart"></i>
                    <label style={{fontSize: "5.5vw"}} className="">{lan === "ko" ? "커플" : "Couple"}</label>
                </div>
                </div>
                <div style={{margin: "2rem", fontSize: "6vw", fontFamily: "MapoBackpacking, sans-serif"}}>{lan === "ko" ? "둘은 어떤 관계인가요?" : "What's your relationship??"}</div>
            </div>
            <div className="ad-banner" style={{position: "absolute", bottom: 0, left: "50%", transform: "translate(-50%, 0)"}}>
				</div>
        </div>
    );
};

export default InputRelationship;