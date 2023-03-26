"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styled from "styled-components";

const Home = () => {
	const [remInterval, setRemInterval] = useState<NodeJS.Timer>();
	const [name, setName] = useState("");
	const [comments, setComments] = useState("");
	const [startDate, setStartDate] = useState(-1);
	const [endDate, setEndDate] = useState(-1);

	const [trackedTime, setTrackedTime] = useState<string>("0:0:0");
	const [finishedTime, setFinishedTime] = useState<string>("");
	const [started, setStarted] = useState(false);

	const [startedTime, setStartedTime] = useState(0);
	const [endedTime, setEndedTime] = useState(0);

	const [users, setUsers] = useState<any>({});
	const router = useRouter();

	useEffect(() => {
		setName(localStorage.getItem("name") || "");
		fetch("http://localhost:3000/api/getTimes").then(async (res) => {
			const usersRes = (await res.json()).users;
			
			usersRes.forEach((user : any) => {
				const usersTemp = users;
				let hours = user.endtime - user.starttime;
				if(usersTemp[user.name]) 
					hours += usersTemp[user.name].hours;
				usersTemp[user.name] = { name: user.name, hours };
				router.refresh();
				setUsers(usersTemp);
			});
		});
	}, []);

	const handleSubmitForm = (e: any) => {
		e.preventDefault();

		console.log(startDate == -1);
		

		if(!started && (startDate == -1 || endDate == -1)) {
			setStarted(true);
			setFinishedTime("");
			const timeSpan = Date.now();
			setStartedTime(timeSpan);
			setRemInterval(setInterval(() => {
				const date = new Date(Date.now() - timeSpan + -120 * 60000);
				const timer = date.getHours().toString().padStart(2, "00") + ":" + date.getMinutes().toString().padStart(2, "00") + ":" + date.getSeconds().toString().padStart(2, "00");
				setEndedTime(Date.now());
				setTrackedTime(timer);
			}, 1000));
		} else {
			let starteTime = startedTime;
			let endeTime = endedTime;
			if(startDate != -1 && endDate != -1) {
				setStartedTime(startDate);
				setEndedTime(endDate);
				starteTime = startDate;
				endeTime = endDate;
				console.log({
					name,
					comments,
					starteTime,
					endeTime,
					startDate,
					endDate
				});
			}
			setStarted(false);
			clearInterval(remInterval);
			setFinishedTime(trackedTime);
			setTrackedTime("00:00:00");
			localStorage.setItem("name", name);
			fetch("http://localhost:3000/api/tracked", {
				method: "POST",
				body: JSON.stringify({
					name,
					comments,
					starteTime,
					endeTime
				})
			})

			router.refresh();
		}
	}

  return (
	<div className='flex items-center justify-center flex-col gap-3'>
		<h1>TRACK YOUR TIME! WHAT ARE YOU? IDAN?!</h1>
		<h3>"I'm Idan and I'll be there in 5 minutes"</h3>
		<Form onSubmit={handleSubmitForm}>
			<TextInput value={name} onChange={(e) => {setName(e.target.value); localStorage.setItem("name", e.target.value);}} type="text" placeholder='Name' />
			<TextInput onChange={(e) => setComments(e.target.value)} type="text" placeholder='What are you doing?' />
			<h3>Start Date:</h3>
			<TextInput onChange={(e) => {
				setStartDate(Number(new Date(e.target.value).getTime()));
				if(Number.isNaN(Number(new Date(e.target.value).getTime())))
					setStartDate(-1);
			}} type="datetime-local" />
			<h3>End Date:</h3>
			<TextInput onChange={(e) => {
				setEndDate(Number(new Date(e.target.value).getTime()));
				if(Number.isNaN(Number(new Date(e.target.value).getTime())))
					setEndDate(-1);
			}} type="datetime-local" />
			<SubmitButton type="submit">{endDate == -1 || startDate == -1 ? (!started ? "Start Tracking" : `Tracking Time: ${trackedTime}`) : "Add Tracked Time"}</SubmitButton>
		</Form>

		<div className='mt-3'>
			{Object.values(users).map((user : any) => {
				const date = new Date(user.hours);
				const timer = (date.getHours() - 2).toString().padStart(2, "00") + ":" + date.getMinutes().toString().padStart(2, "00") + ":" + date.getSeconds().toString().padStart(2, "00");
				return <>
					<p>{user.name}</p>
					<p>{timer}</p>
					<p>{Math.floor(user.hours/3.6e+6)*75}₪</p>
				</>
			})}
		</div>
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