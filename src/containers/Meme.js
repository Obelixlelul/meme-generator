import { useState, useEffect } from "react";



export default function Meme() {


    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: ""
    });

    const [allMemeImages, setAllMeMeImages] = useState({});

    useEffect(() => {
        async function fetchData() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json();
            setAllMeMeImages(data.data.memes);
        }
        fetchData();
        return () => { };
    }, []);


    function returnMemesData() {
        const memesArray = allMemeImages;
        const randomNumber = Math.floor(Math.random() * memesArray.length)
        const url = memesArray[randomNumber].url;
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }));
        return () => { };
    }

    function handleChange(event) {
        const { name, value } = event.target
        setMeme(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    return (
        <main>
            <div className="form">
                <input
                    type="text"
                    className="form--input"
                    placeholder="Top text"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    className="form--input"
                    placeholder="Bottom text"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button onClick={returnMemesData} className="form--button">
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">

                <img src={meme.randomImage} alt="" className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>

    );

}