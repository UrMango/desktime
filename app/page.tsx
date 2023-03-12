"use client"
import React, { useState } from 'react';

const Home = () => {
	const [buttonText, setButtonText] = useState("Start Traking.");
	const [started, setStarted] = useState(false);

	const onClick = () => {
		if(!started) {
			setStarted(true);
			setButtonText("Tracking time...");
			const timeSpan = Date.now();
			setInterval(	 () => {
				let text = "Tracking Time:\n";
				const date = new Date(Date.now() - timeSpan + -120 * 60000);
				text += date.getHours().toString() + ":" + date.getMinutes().toString() + ":" + date.getSeconds().toString();
				setButtonText(text);
			}, 1000);
		}
	}

  return (
	<div className='flex items-center justify-center flex-col gap-3'>
		<h1>TRACK YOUR TIME! WHAT ARE YOU? IDAN?!</h1>
		<h3>"I'm Idan and I'll be there in 5 minutes"</h3>
		<input type="text" placeholder='Name' />
		<input type="text" placeholder='What are you doing?' />
		<button onClick={onClick}>{buttonText}</button>


	</div>
  )
}

export default Home;