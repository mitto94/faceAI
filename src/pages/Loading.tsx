import React, { useEffect, useState } from 'react';

const Loading: React.FC = ({location, match} : any) => {
	return (
			<div className="container-ct h-100" style={{flexDirection: "column", alignItems: "center"}}>
				<div className="spinner-border m-5" style={{width: "5rem", height: "5rem"}} role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
				{/* <span className="loading" style={{marginBottom: "10rem", fontSize: "1.3rem"}}>AI가 열심히 분석중입니다...</span> */}
				<div className="loading" style={{fontSize: "1.5rem", marginBottom: "10rem", fontFamily: "Sunflower, sans-serif"}}>
					<span>A</span>
					<span>I</span>
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
				</div>
			</div>
	);
};

export default Loading;