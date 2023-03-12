"use client"
import React, { useState } from 'react';
import styled from "styled-components";

let interval: NodeJS.Timer;

const Home = () => {
	const [trackedTime, setTrackedTime] = useState<string>("0:0:0");
	const [finishedTime, setFinishedTime] = useState<string>("");
	const [started, setStarted] = useState(false);

	const handleSubmitForm = (e: any) => {
		e.preventDefault();

		if(!started) {
			setStarted(true);
			setFinishedTime("");
			const timeSpan = Date.now();
			interval = setInterval(() => {
				const date = new Date(Date.now() - timeSpan + -120 * 60000);
				const timer = date.getHours().toString() + ":" + date.getMinutes().toString() + ":" + date.getSeconds().toString();
				setTrackedTime(timer);
			}, 1000);
		} else {
			setStarted(false);
			setFinishedTime(trackedTime);
			setTrackedTime("0:0:0");
			clearInterval(interval);
		}
	}

  return (
	<div className='flex items-center justify-center flex-col gap-3'>
		<h1>TRACK YOUR TIME! WHAT ARE YOU? IDAN?!</h1>
		<h3>"I'm Idan and I'll be there in 5 minutes"</h3>
		<Form onSubmit={handleSubmitForm}>
			<TextInput type="text" placeholder='Name' />
			<TextInput type="text" placeholder='What are you doing?' />
			<SubmitButton type="submit">{!started ? "Start Tracking" : `Tracking Time: ${trackedTime}`}</SubmitButton>
		</Form>
		<FinishedTimeTracked>{finishedTime}</FinishedTimeTracked>
	</div>
  )
}

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const TextInput = styled.input`
	padding: 5px 15px;
	border: 1px solid black;
	border-radius: 8px;
`;

const SubmitButton = styled.button`
	padding: 10px;
	color: white;
	background-color: black !important;
	border-radius: 8px;
`;

const FinishedTimeTracked = styled.h3`
	
`;

export default Home;