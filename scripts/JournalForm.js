import { saveJournalEntry } from "./JournalDataProvider.js";

import { EntryListComponent } from "./JournalEntryList.js";

const contentTarget = document.querySelector(".journalEntryForm")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveJournalEntry") {
        clickEvent.preventDefault();
        
        // Make a new object representation of a note
        if(document.querySelector("#journalConcepts").value.length > 10){
            window.alert("Concept too long")
        }else{
        const newJournalEntry = {
            date : document.querySelector("#journalDate").value,
            concept : document.querySelector("#journalConcepts").value,
            entry : document.querySelector("#journalText").value,
            mood : document.querySelector("#journalMood").value
            // Key/value pairs here
        }
        saveJournalEntry(newJournalEntry)
        EntryListComponent()
    }
        // Change API state and application state
    }
})


const render = () => {
    contentTarget.innerHTML = `
    <form action="">
                <fieldset class="inputForm">
                    <label for="journalDate">Date of entry</label>
                    <input type="date" name="journalDate" id="journalDate">
                    <label for="journalConcepts">Concepts Covered</label>
                    <input type="text" name="journalConcepts" id="journalConcepts">
                    <textarea name="journalText" id="journalText" rows="10" cols="30">Record Journal entry here
                    </textarea>
                    <label for="journalMood">Mood</label>
                    <select id="journalMood" name="journalMood">
                        <option value="happy">Happy</option>
                        <option value="sad">Sad</option>
                        <option value="mad">Mad</option>
                        <option value="frustrated">Frustrated</option>
                    </select>
                    <input type="button" id="saveJournalEntry" value="Record Journal Entry">
                </fieldset>             
            </form>
    `
}

export const JournalForm = () => {
    render()
}