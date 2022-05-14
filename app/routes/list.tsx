import {useLoaderData } from "@remix-run/react";
import {useState} from "react";
// import { json } from "remix";

export let loader = async ({ request }) => {
	const url = new URL(request.url);
	const search = url.searchParams.get("search");
	
	const politiciansDB = [
		{
			"name": "Silvio Berlusconi",
			"socialUrl": "https://twitter.com/berlusconi",
			"points": [
				{
					"score": 500,
					"pointUrl": "https://twitter.com/berlusconi/status/1492531946286628864",
					"date": "2022-02-12",
					"title": "Ex presidente del consiglio che va a vedere la partita della sua squadra portandogli fortuna"
				}
			]
		},
		{
			"name": "Giuseppe Conte",
			"socialUrl": "https://twitter.com/berlusconi",
			"points": [
				{
					"score": 500,
					"pointUrl": "https://twitter.com/berlusconi/status/1492531946286628864",
					"date": "2022-02-12",
					"title": "Ex presidente del consiglio che va a vedere la partita della sua squadra portandogli fortuna"
				}
			]
		}
	]
	
	
	// return json({ politicians });
	
	const politicians = search
		? politiciansDB.filter(({name}) => name.toLowerCase().includes(search.toLowerCase()))
		: politiciansDB
	
	return new Response(JSON.stringify({ politicians, search }), {
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
	});
};

export default function Index() {
	const {politicians, search} = useLoaderData();
	
	return (
		<div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
			<h1>Fantacitorio</h1>
			<form method="get">
				<input name="search" placeholder="search..." required value={search} />
				<button type="submit">cerca politico:</button>
				<a href="?">reset</a>
			</form>
			<ul>
				{politicians.map(({name, socialUrl, points}) => (
					<li>
						<a
							target="_blank"
							href={socialUrl}
							rel="noreferrer"
						>
							{name}
						</a>
						<ul>
							{points.map(({score, pointUrl, date, title}) => (
								<li>{date} - {score} punti <a href={pointUrl}>{title}</a></li>
							))}
						</ul>
					</li>
				))}
			</ul>
		</div>
	);
}
