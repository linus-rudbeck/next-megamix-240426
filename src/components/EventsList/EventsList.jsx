"use client";

import { getAllEvents, onUpdateDatabase } from "@/utils/db";
import { useEffect, useState } from "react";
import AddEventForm from "../AddEventForm/AddEventForm";

export default function EventsList() {

    const [events, setEvents] = useState([]);
    const [update, setUpdate] = useState(0);

    const fetchEvents = async () => {
        const allEvents = await getAllEvents();

        console.log(allEvents);
        setEvents(allEvents);
    }

    useEffect(() => {
        fetchEvents();
    }, [update])

    onUpdateDatabase(() => {
        setUpdate(update+1) // Ladda om listan
    });

    return (<>

        <ul>
            {events.map(e => (<li key={e.id}>

                {e.title}

            </li>))}
        </ul>

    </>)
}