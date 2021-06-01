import * as React from 'react';
// import { Link, BrowserRouter as Router, useHistory } from 'react-router-dom';
import SidebarComponent from '../../components/Sidebar';
import { Color } from '../../faceAnalysis';

const InputRelationship: React.FC = ({history}: any) => {
	// const history = useHistory();
    React.useEffect(() => {
		let ins: any = document.createElement('ins');
        let scr: any = document.createElement('script');

        ins.className = 'kakao_ad_area';
        ins.style = "display:none;";
        scr.async = 'true';
        scr.type = "text/javascript";
        scr.src = "//t1.daumcdn.net/kas/static/ba.min.js";
        ins.setAttribute('data-ad-width', '320');
        ins.setAttribute('data-ad-height', '100');
        ins.setAttribute('data-ad-unit', 'DAN-XTbmDuTkWuLkadnO');

        (document as any).querySelector(".ad-banner").appendChild(ins);
        (document as any).querySelector('.ad-banner').appendChild(scr);
	}, [])
    return (
        <div style={{height: "100vh"}}>
            <div className="container" style={{background: Color.third, width: "100%", height: "10%", display: "flex", justifyContent: "space-around"}}>
				<div style={{width: "2rem"}}></div>
				<div className="container" style={{color: "white", fontSize: "1.7rem", fontWeight: 500, fontFamily: "Stylish, sans-serif"}}>AI가 보는 우리 얼굴</div>
				<SidebarComponent />
			</div>
            <div className="container" style={{width: "100%", height: "90%", background: Color["third"], filter: "brightness(1.4)", flexDirection: "column", fontFamily: "Sunflower, sans-serif"}}>
                <div style={{display: "flex"}}><div style={{display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", margin: ".5rem"}}
                    onClick={() => history.push({
                        pathname: "relation_photo",
                        state: {
                            from: "third",
                            relation: "family"
                        }
                    })}>
                    <i style={{fontSize: "3.5rem"}} className="p-3 fas fa-house-user"></i>
                    <label style={{fontSize: "1.5rem"}} className="">가족</label>
                </div>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", margin: ".5rem"}}
                    onClick={() => history.push({
                        pathname: "relation_photo",
                        state: {
                            from: "third",
                            relation: "friend"
                        }
                    })}>                    
                    <i style={{fontSize: "3.5rem"}} className="p-3 fas fa-users"></i>
                    <label style={{fontSize: "1.5rem"}} className="">친구</label>
                </div>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", margin: ".5rem"}}
                    onClick={() => history.push({
                        pathname: "relation_photo",
                        state: {
                            from: "third",
                            relation: "couple"
                        }
                    })}>                    
                    <i style={{fontSize: "3.5rem"}} className="p-3 fas fa-heart"></i>
                    <label style={{fontSize: "1.5rem"}} className="">커플</label>
                </div>
                </div>
                <div style={{margin: "2rem", fontSize: "1.45rem", fontFamily: "Sunflower, sans-serif"}}>둘은 어떤 관계인가요?</div>
                <div className="ad-banner" style={{position: "absolute", bottom: 0}}>
				</div>
            </div>
        </div>
    );
};

export default InputRelationship;