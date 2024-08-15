import { nanoid } from "nanoid";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

function App() {
  const [userInput, setUserInput] = useState("");
  const [reply, setReply] = useState(false);
  const [listOfMessages, setListOfMessages] = useState([]);
  const [listOfReplies, setListOfReplies] = useState([]);
  const inputRef = useRef(null);
  const sendButtonRef = useRef(null);

  const refiningResponse = (response) => {
    const { choices } = response;
    console.log(choices[0].message.content);
    const text = choices[0].message.content;
    setListOfMessages((prevMessages) => [
      ...prevMessages,
      {
        id: nanoid(),
        role: "bot",
        content: text,
      },
    ]);
  };

  const handleSubmit = async () => {
    // console.log("in");

    // setQuery(userInput);
    setListOfMessages((prevMessages) => [
      ...prevMessages,
      {
        id: nanoid(),
        role: "user",
        content: userInput,
      },
    ]);
    const options = {
      method: "POST",
      url: "https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions",
      headers: {
        "x-rapidapi-key": "254d5bbddfmshbd33e73bfa0f653p1c6485jsn07029bccb407",
        "x-rapidapi-host":
          "cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        messages: [
          {
            role: "user",
            content: userInput,
          },
        ],
        model: "gpt-4o",
        max_tokens: 100,
        temperature: 0.9,
      },
    };

    try {
      const response = await axios.request(options);
      // console.log(response.data);
      refiningResponse(response.data);
      // return response.data;
    } catch (error) {
      console.error(error);
    }

    // setTimeout(() => {
    //   // setReply(true);
    //   setListOfMessages((prevMessages) => [
    //     ...prevMessages,
    //     {
    //       id: nanoid(),
    //       role: "bot",
    //       content: "Temp Reply",
    //     },
    //   ]);
    // }, 1000);

    setUserInput("");
  };

  useEffect(() => {
    inputRef.current.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        sendButtonRef.current.click();
      }
    });
    console.log(listOfMessages);
  }, []);

  // useEffect(() => {
  //   console.log(listOfMessages);
  // }, [listOfMessages]);
  return (
    <>
      {/* <div className="flex flex-col w-[400px] h-[500px]">
        <div>Chat platform</div>
        <div className="w-[400px] h-[400px] overflow-y-scroll">
          {listOfMessages &&
            listOfMessages.map((msg) => (
              <div key={msg.id}>
                <p>{msg.role === "user" && msg.content}</p>
                <p>{msg.role === "bot" && msg.content}</p>
              </div>
            ))}
        </div>
        <div className="flex justify-between">
          <input
            type="text"
            ref={inputRef}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="border border-black"
          />
          <button onClick={handleSubmit} ref={sendButtonRef}>
            Send
          </button>
        </div>
      </div> */}

      <div className="w-screen h-screen flex justify-center items-center">
        <div className="w-[400px] h-[600px] md:w-full md:h-full bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center p-4 border-b bg-orange-300">
            <div className="flex items-center">
              <img
                src="https://picsum.photos/200/300"
                alt="Alex"
                className="w-10 h-10 rounded-full mr-2"
              />
              <h2>Alex</h2>
            </div>
            <div className="text-gray-600 text-sm">online</div>
          </div>
          <div className="">
            <ul
              className="chatWindow bg-gradient-to-br from-orange-200 via-white to-green-200 p-2 h-[400px] md:h-[540px] overflow-y-scroll"
            >
              {listOfMessages.map((msg) => (
                <div key={msg.id}>
                  {msg.role === "user" && (
                    <li className="mb-2">
                      <div className="flex justify-end">
                        <p className="bg-blue-200 p-2 rounded-lg">
                          {msg.role === "user" && msg.content}
                        </p>
                        <img
                          src="https://picsum.photos/200/301"
                          alt="Fatih"
                          className="w-10 h-10 rounded-full ml-2"
                        />
                      </div>
                    </li>
                  )}

                  {msg.role === "bot" && (
                    <li className="mb-2">
                      <div className="flex justify-start">
                        <img
                          src="https://picsum.photos/200/300"
                          alt="Alex"
                          className="w-10 h-10 rounded-full mr-2"
                        />
                        <p className="w-11/12 bg-gray-200 p-2 rounded-lg">
                          {msg.role === "bot" && msg.content}
                        </p>
                      </div>
                    </li>
                  )}
                </div>
              ))}
            </ul>
          </div>
          <div className="p-4 flex justify-between bg-green-300">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full p-2 pl-10 text-sm text-gray-700"
              value={userInput}
              ref={inputRef}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSubmit}
              ref={sendButtonRef}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
