/*
 *  Purpose:
 *    To render as many journal entry components as
 *    there are items in the collection exposed by the
 *    data provider component
 */
import { getJournalEntries, useJournalEntries } from "./JournalDataProvider.js"
import { JournalEntryComponent } from "./JournalEntry.js"

// DOM reference to where all entries will be rendered
const entryLog = document.querySelector(".entryLog")
const eventHub = document.querySelector(".container")
let entries = []
eventHub.addEventListener("change", e => {
    if (e.target.name === "moodFilter") {
        entries = useJournalEntries()
        let filteredEntries = entries.filter(entry => entry.mood.id === parseInt(e.target.value))
        render(filteredEntries);
    }
})
export const EntryListComponent = () => {
    
    // Use the journal entry data from the data provider component
    getJournalEntries()
        .then(() => {
            entries = useJournalEntries()
            render(entries)
        }
        )
        }

const render = (journalEntries) =>{
    let journalHTMLRepresentation = ""
        
            for (const entry of journalEntries) {
                journalHTMLRepresentation += JournalEntryComponent(entry);
            }
            entryLog.innerHTML = journalHTMLRepresentation
        }
