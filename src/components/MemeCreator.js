import { useState } from "react";
import "./MemeCreator.css";

function MemeCreator(templ) {
  const [template,setTemplate] = useState(templ.temp);
  const [didSendMeme,setDidSendMeme] = useState(false);

  const [sendObject, setSendObject] = useState({
    username: "danivn",
    password: "123danivnTest",
    template_id: template.id,
    text0: "",
    text1: "",
  });

  const handleTopTextChange = (event) => {
    setSendObject({ ...sendObject, text0: event.target.value });
  };

  const handleBottomTextChange = (event) => {
    setSendObject({ ...sendObject, text1: event.target.value });
  };

  const objectToQueryParams = (obj) => {
    const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
    return "?" + params.join("&");
  };

  const submitMeme = async () => {
    const res = await fetch(
      `https://api.imgflip.com/caption_image${objectToQueryParams(sendObject)}`
    );
    const data = await res.json();

    setTemplate({...template, url: data.data.url});
    setDidSendMeme(true);
  };

  return (
    <div>
      <div>
        <img
          className="bigImg"
          key={template.id}
          src={template.url}
          alt={template.name}
        />
      </div>
      <div>
        {"Upper Text:"}
        <input type="text" className="textBox" onChange={handleTopTextChange} />
      </div>
      <div>
        {"Lower Text:"}
        <input
          type="text"
          className="textBox"
          onChange={handleBottomTextChange}
        />
      </div>
      <button className="submitBtn" onClick={submitMeme}>
        Create Meme
      </button>
      {
        didSendMeme ? 
        <h2>New meme link: {template.url}</h2>
        : null
      }
    </div>
  );
}

export default MemeCreator;
