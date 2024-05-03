"use client";

import { addEvent, callOnUpdate } from "@/utils/db";
import { useState } from "react";

export default function AddEventForm({ }) {

    const [formData, setFormData] = useState({
        title: "",
        date: new Date(),
        description: ""
    })

    const handleFormChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;

        setFormData({ ...formData, [fieldName]: fieldValue })
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();

        addEvent(formData.title, formData.date, formData.description);

        callOnUpdate();
    }

    return (<form onChange={handleFormChange} onSubmit={handleFormSubmit}>

        <p>
            <input type="text" name="title" defaultValue={formData.title} />
        </p>

        <p>
            <input type="text" name="date" defaultValue={formData.date} />
        </p>

        <p>
            <input type="text" name="description" defaultValue={formData.description} />
        </p>

        <button>Save</button>
    </form>)
}