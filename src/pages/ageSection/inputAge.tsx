import * as React from 'react';
import { Link, BrowserRouter as Router, useHistory } from 'react-router-dom';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Color } from '../../faceAnalysis';

const inputAge: React.FC = ({history}: any) => {
	// const history = useHistory();
	const [age, setAge] = React.useState();
	// history.push({
	// 	pathname: "/age_photo",
	// 	state: {photo}
	// })
    return (
			<>
				<div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "10%", background: Color.first, color: "white", fontSize: "1.25rem", fontWeight: 600}}>AI가 보는 나의 얼굴</div>
        <div className="container-ct" style={{flexDirection: "column" , backgroundColor: Color.first, filter: "brightness(1.4)"}}>
					<div style={{marginBottom: "10rem"}}>
						<InputNumber inputStyle={{width: "3rem", textAlign: "center", marginLeft: "6rem"}} value={age} onValueChange={(e: any) => setAge(e.value)} min={0} max={140} />
						<span>살</span>
						<Button
							onClick={() => {history.push({
								pathname: "age_photo",
								state: {
									from: "first",
									age: age
							}
							})}}
							style={{width: "4.2rem", marginLeft: "0.5rem", paddingTop: "0.25rem"}}
							label="입력"
							className="p-button-success"
						/>
					</div>
        </div>
			</>
    );
};

export default inputAge;