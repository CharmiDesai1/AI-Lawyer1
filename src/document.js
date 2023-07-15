import React, { useState } from "react";

const Document = () => {
  const [value, setValue] = useState(null);
  const [message, setMessage] = useState(null);

  const getMessages = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: value
      })
    };
    try {
      const response = await fetch("http://localhost:8000/getDocuments", options);
      const data = await response.json();
      console.log(data.choices[0].message);
      setMessage(data.choices[0].message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mainDiv">
      <style>
        {`
          img {
            max-width: 100%;
            max-height: 100%;
          }
          .picture1 {
            width: 200px;
            height: 300px;
          }
        `}
      </style>
      <div className="picture1">
        <img
          src="https://thumbs.dreamstime.com/b/constitutional-law-outline-vector-icon-thin-line-black-flat-simple-element-illustration-editable-justice-concept-isolated-175200290.jpg"
          alt=""
          srcSet=""
        />
      </div>
      <h1>Documents</h1>
      <div className="input-container">
        <input value={value} onChange={(e) => setValue(e.target.value)} />
        <div id="submitDoc" onClick={getMessages}>
          &#10146;
        </div>
        {message && <p>{message.content}</p>}
      </div>
    </div>
  );
};

export default Document;
