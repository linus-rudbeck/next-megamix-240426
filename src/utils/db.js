const dbName = "EventsDB"
const storeName = "events"

// Skapa eller öppn en databasanslutning
function openDB() {

    // Returnerar ett promise som vi kan awaita
    return new Promise((resolve, reject) => {

        // Ansluter till databasen
        const request = indexedDB.open(dbName, 1);

        // Om/när versionen har ökat anropas följande funktion
        request.onupgradeneeded = function (event) {

            // Hämta databasen
            const db = event.target.result;

            // Om vår tabell inte finns
            if (!db.objectStoreNames.contains(storeName)) {

                // Skapa tabellen
                db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true })
            }
        }


        // Om/när det blir nåt fel
        request.onerror = function (event) {

            // Logga felmeddelandet
            console.error(event);

            // Anropa reject för att kunna fånga felet
            reject(event.target.errorCode)
        }

        // Om/när anslutningen lyckas
        request.onsuccess = function (event) {

            // Anropa resolve för att meddela den anropande koden att vi är klara
            resolve(event.target.result)
        }

    });
}


// Lägg till ett event i databasen
export async function addEvent(title, date, description) {

    // Vänta på en anslutning till databasen
    const db = await openDB()

    // Starta en transaktion för att kunna läsa och skriva
    const transaction = db.transaction([storeName], "readwrite");

    // Välj tabellen att jobba med
    const store = transaction.objectStore(storeName);

    // Skapa förfrågan att lägga till data
    const request = store.add({ title, date, description });

    // Skapa ett promise som vi kan awaita
    return new Promise((resolve, reject) => {

        // Om/när förfrågan lyckas
        request.onsuccess = function (event) {

            // Anropa resolve för att meddela den anropande koden att vi är klara
            resolve(event.target.result);
        }

        // Om/när det blir nåt fel
        request.onerror = function (event) {

            // Logga felmeddelandet
            console.error(event);

            // Anropa reject för att kunna fånga felet
            reject(event.target.errorCode)
        }
    });
}


// Hämta alla events från databasen
export async function getAllEvents() {

    // Vänta på en anslutning till databasen
    const db = await openDB()

    // Starta en transaktion för att kunna läsa från databasen
    const transaction = db.transaction([storeName], "readonly");

    // Välj tabellen att jobba med
    const store = transaction.objectStore(storeName);

    // Skapa en tom array av events att returnera
    const events = []; // Händelser (fotbollsmatcher)

    return new Promise((resolve, reject) => {

        // Om/när en rad hämtas från tabellen
        store.openCursor().onsuccess = function (event) { // Webb-event (databasen kunde öppnas)

            // Hämta en pekare till en rad i tabellen
            const cursor = event.target.result;

            // Om raden finns
            if (cursor) {

                // Lägg till i vår array
                events.push(cursor.value)

                // Gå vidare till nästa rad
                cursor.continue();
            } else {

                // Skicka tillbaka alla events när det inte finns fler att hämta
                resolve(events)
            }
        }

        // Om/när det blir nåt fel
        transaction.onerror = function (event) {

            // Logga felmeddelandet
            console.error(event);

            // Anropa reject för att kunna fånga felet
            reject(event.target.errorCode);
        }
    });
}



// Function to call if database is updated
let updateDatabaseCallback = null;

// Set callback fanction
export function onUpdateDatabase(callback){
    updateDatabaseCallback = callback;
}

// Run callback funtion
export function callOnUpdate(){
    if(updateDatabaseCallback){
        updateDatabaseCallback();
    }
}
