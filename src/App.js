import { useState, useEffect } from "react";
import "./App.css";
import MemeCreator from "./components/MemeCreator";

function App() {
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState();

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes").then((res) => {
      res.json().then((response) => {
        setTemplates(response.data.memes);
      });
    });
  }, []);

  return (
    <div className="body">
      <div className="appContainer">
        <h1>Welcome to MEME-GENERATOR</h1>
        <div className="memeContainer">
          {!template ? (
            templates.map((template) => {
              return (
                <img
                className="img"
                  key={template.id}
                  src={template.url}
                  alt={template.name}
                  onClick={() => {
                    setTemplate(template);
                  }}
                />
              );
            })
          ) : (
            <MemeCreator temp={template} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
