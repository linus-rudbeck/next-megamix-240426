"use client"

import Cookie from "js-cookie";
import { useState } from "react"

export default function CookiesForm() {

    const [formData, setFormData] = useState({ favouriteSong: "" })
    const [message, setMessage] = useState("Enter favourite song please...");

    const handleFormChange = (event) => {
        const fieldName = event.target.name;
        const value = event.target.value;

        setFormData({ ...formData, [fieldName]: value })
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();

        Cookie.set("favouriteSong", formData.favouriteSong, { expires: (1 / 24) });

        setMessage("Saved favourite song: " + formData.favouriteSong);
    }

    const handleClickGetSong = () => {
        const favouriteSong = Cookie.get("favouriteSong");

        if(favouriteSong){
            setMessage("Got favourite song: " + favouriteSong)
        }
        else{
            setMessage("No favourite song saved");
        }
    }

    return (<>

        <h3>{message}</h3>

        <form onChange={handleFormChange} onSubmit={handleFormSubmit}>

            <p>
                <label htmlFor="favouriteSong">Favourite song: </label>
                <input
                    name="favouriteSong"
                    placeholder="Favourite song"
                    type="text"
                    defaultValue={formData.favouriteSong} />
            </p>

            <p>
                <button type="submit">Save cookie</button>
                <button type="button" onClick={handleClickGetSong}>Get favourite song</button>
            </p>
        </form>
    </>)
}