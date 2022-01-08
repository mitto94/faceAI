import * as React from 'react';
import { Color } from "../faceAnalysis";
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { useHistory } from 'react-router-dom';
import { SelectButton } from 'primereact/selectbutton';

function SidebarComponent({lan} : any): JSX.Element {
	const [visible, setVisible] = React.useState(false);
	const [value, setValue] = React.useState(null);
	const history = useHistory();
	const justifyOptions = [
        {icon: 'pi pi-align-left', value: 'first'},
        {icon: 'pi pi-align-right', value: 'second'},
        {icon: 'pi pi-align-center', value: 'third'},
        {icon: 'pi pi-align-justify', value: 'fourth'}
    ];
	const justifyTemplate = (option: any) => {
        return <div style={{width: "7vw", height: "15vh", display: "flex", flexDirection: "column", padding: "0"}}>
			<div style={{backgroundColor: "yellow", width: "7vw", height: "5vh"}}></div>
			<div style={{backgroundColor: "red", width: "7vw", height: "5vh"}}></div>
			<div style={{backgroundColor: "blue", width: "7vw", height: "5vh"}}></div>
			<div style={{backgroundColor: "black", width: "7vw", height: "5vh"}}></div>
		</div>
    }
    return <>
		<i className="pi pi-cog" style={{width: "2rem", fontSize: "1.5rem", color: "white"}} onClick={(e) => setVisible(true)}></i>
		<Sidebar position="right" visible={visible} onHide={() => setVisible(false)}>
			<div style={{display: "flex", flexDirection: "column", width: "100%", height: "100%"}}>
				<h1 style={{ fontWeight: 'normal', textAlign: "center" }}>{lan === "ko" ? "설정" : "Setting"}</h1>
				<div style={{height: "13vh", width: "100%"}}>
					<Button type="button"
					onClick={() => {
						setVisible(false);
						history.push("/")
						}} label={lan === "ko" ? "홈 화면으로" : "Going back to home"} style={{background: "#524F4A", border: "none", height: "4rem", fontSize: "1.25rem", fontWeight: 700, margin: "1rem", width: "-webkit-fill-available"}}
					/>
				</div>
				<div style={{height: "13vh", width: "100%"}}>
					<Button type="button"
				onClick={() => {
					setVisible(false);
					history.push("age")
					}} label={lan === "ko" ? "나이 확인하기" : "Check age"} style={{background: Color["first"], border: "none", height: "4rem", fontSize: "1.25rem", fontWeight: 700, margin: "1rem", width: "-webkit-fill-available"}}
					/>
				</div>
				<div style={{height: "13vh", width: "100%"}}>
					<Button type="button"
				onClick={() => {
					setVisible(false);
					history.push({
						pathname: "age_photo",
						state: {
							from: "second"
						}
					})
					}} label={lan === "ko" ? "감정 확인하기" : "Check emotions"}style={{background: Color["second"], border: "none", height: "4rem", fontSize: "1.25rem", fontWeight: 700, margin: "1rem", width: "-webkit-fill-available"}}
					/>
				</div>
				<div style={{height: "13vh", width: "100%"}}>
					<Button type="button"
				onClick={() => {
					setVisible(false);
					history.push("/relation")
					}} label={lan === "ko" ? "얼굴 비교하기" : "Comparing faces"}style={{background: Color["third"], border: "none", height: "4rem", fontSize: "1.25rem", fontWeight: 700, margin: "1rem", width: "-webkit-fill-available"}}
					/>
				</div>
				{/* <div className="container" style={{height: "25vh", width: "100%", flexDirection: "column", justifyContent: "flex-start"}}>
					<div style={{fontSize: "1.5rem"}}>Theme 선택</div>
					<div>
						<SelectButton value={value} options={justifyOptions} onChange={(e) => setValue(e.value)} itemTemplate={justifyTemplate}/>
					</div>
				</div> */}
			</div>
		</Sidebar>
	</>
}
export default SidebarComponent