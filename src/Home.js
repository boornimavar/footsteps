import { useState } from "react";
import Header from "./Header.js";
import "./home.css";

export default function Home() {
  const [place, setPlace] = useState("");
  const [desc, setDesc] = useState("");
  const [places, setPlaces] = useState([]);

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

      <div className="place">
        <h2>All The Bright Places</h2>

        <input
          id="placeid"
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

        <button className="add" onClick={handleAdd}>
          Add
        </button>
      </div>

      <div className="places-list">
        {places.map((p) => (
          <div key={p.id} className="place-card">
            <h3>{p.name}</h3>
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
