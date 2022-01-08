import React, { useEffect, useState } from 'react';
import { Sentence } from '../faceAnalysis';

const Loading = ({random, lan} : any) => {
	return (
			<div className="container-ct h-100" style={{flexDirection: "column", alignItems: "center"}}>
				<div style={{display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "20%"}}>
					<div className="spinner-border m-5" style={{width: "5rem", height: "5rem"}} role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
					{lan === "ko" ? <div className="loading" style={{fontSize: "1.5rem", marginBottom: "5rem", fontFamily: "MapoBackpacking, sans-serif"}}>
						<span>얼</span>
						<span>척</span>
						<span>이</span>
						<span>가</span>
						<span>&nbsp;</span>
						<span>분</span>
						<span>석</span>
						<span>중</span>
						<span>입</span>
						<span>니</span>
						<span>다</span>
						<span>.</span>
						<span>.</span>
						<span>.</span>
					</div> :
					<div className="loading" style={{fontSize: "1.5rem", marginBottom: "5rem", fontFamily: "MapoBackpacking, sans-serif"}}>
					<span>A</span>
					<span>n</span>
					<span>a</span>
					<span>l</span>
					<span>y</span>
					<span>z</span>
					<span>i</span>
					<span>n</span>
					<span>g</span>
					<span>.</span>
					<span>.</span>
					<span>.</span>
				</div>}
				</div>
				<div>
					<pre className="container" style={{width: "100vw", height: "25vh", fontSize: "1.25rem", textAlign: "center", fontFamily: "EliceDigitalBaeum_Bold, sans-serif"}}>{random}</pre>
				</div>
			</div>
	);
};

export default Loading;