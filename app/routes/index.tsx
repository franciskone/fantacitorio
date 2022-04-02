import {useLoaderData } from "@remix-run/react";
import {useState} from "react";
// import { json } from "remix";

export let loader = async ({ request }) => {
  const url = new URL(request.url);
  const search = url.searchParams.get("search");
  
  const politicians = [
        {
          "name": "Silvio Berlusconi",
          "socialUrl": "https://twitter.com/berlusconi",
          "points": [
            {
              "score": 500,
              "pointUrl": "https://twitter.com/berlusconi/status/1492531946286628864",
              "date": "2022-02-12"
            }
          ]
        }
      ]
    
  
  // return json({ politicians });
  
  return new Response(JSON.stringify({ politicians, search }), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
};

export default function Index() {
  const {politicians, search: query} = useLoaderData();
  const [search, setSearch] = useState('')
  
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix: {query}</h1>
      <input placeholder="search..." onChange={(e) => setSearch(e.target.value)} />
      <button><a href={`?search=${search}`}>Search</a></button>
      <ul>
        {politicians.map(({name, socialUrl}) => (
          <li>
            <a
              target="_blank"
              href={socialUrl}
              rel="noreferrer"
            >
              {name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
