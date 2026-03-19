import { useState, useEffect } from "react";
import Header from "./Header.js";
import "./index.css";

import "./home.css";
import { Link } from "react-router-dom";

export default function Home() {
  const [place, setPlace] = useState("");
  const [desc, setDesc] = useState("");
  const [places, setPlaces] = useState(() => {
    const saved = localStorage.getItem("places");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("places", JSON.stringify(places));
  }, [places]);

  function handleAdd() {
    if (!place || !desc) return;

    const newPlace = {
      id: Date.now(),
      name: place,
      description: desc,
    };

    setPlaces((prev) => [...prev, newPlace]);

    setPlace("");
    setDesc("");
  }

  return (
    <>
      <Header />
      <h2 className="bright">All The Bright Places</h2>

      <div className="place">
        <label htmlFor="place">place</label>

        <input
          id="placeid"
          className="add"
          type="text"
          placeholder="Enter place"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />

        <label htmlFor="motive">Motive</label>

        <textarea
          id="motive"
          rows="5"
          cols="30"
          placeholder="Why this place?"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <button className="add btn" onClick={handleAdd}>
          Add
        </button>
      </div>

      <div className="place-list">
        {places.map((p) => (
          <div key={p.id} className="place-card">
            <Link to={`/travel/${p.name}`}>{p.name}</Link>
            <p>{p.description}</p>
            <button
              className="delPlace"
              onClick={() =>
                setPlaces((prev) => prev.filter((place) => place.id !== p.id))
              }
            >
              🗑
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
