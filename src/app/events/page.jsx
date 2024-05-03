import AddEventForm from "@/components/AddEventForm/AddEventForm";
import EventsList from "@/components/EventsList/EventsList";

export default function EventsPage() {
    return (<>
        <h2>Events</h2>

        <p>These are my events...</p>

        <EventsList />

        
        <hr />

        <h3>Add event</h3>

        <AddEventForm />
    </>);
}