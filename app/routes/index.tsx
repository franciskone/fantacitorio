import {useLoaderData, json} from "remix";

export let loader = async () => {
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
    
  
  return json({ politicians });
};

export default function Index() {
  let data = useLoaderData();
  
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        {data.politicians.map(({name, socialUrl}) => (
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
