import { saveEntryTag } from "./EntryTagProvider.js";
import { saveJournalEntry, deleteEntry } from "./JournalDataProvider.js";

import { EntryListComponent } from "./JournalEntryList.js";
import { useMoods } from "./MoodsProvider.js";
import { saveTag, useTags } from "./TagProvider.js";

const contentTarget = document.querySelector(".journalEntryForm")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveJournalEntry") {
        clickEvent.preventDefault();
        let inputTags = document.querySelector("#journalTags").value.split(',')
        
        // Make a new object representation of a note
        if(document.querySelector("#journalConcepts").value.length > 10){
            window.alert("Concept too long")
        }else if(badWords(document.querySelector("#journalConcepts").value)){
            window.alert("POTTY MOUTH")
        }else{
            const newJournalEntry = {
                date : document.querySelector("#journalDate").value,
                concept : document.querySelector("#journalConcepts").value,
                entry : document.querySelector("#journalText").value,
                moodId : document.querySelector("#journalMood").value
                // Key/value pairs here
            }
        saveJournalEntry(newJournalEntry)
            for (const tag of inputTags) {
                if(useTags().find(tt => tt.subject !== tag)){
                    saveTag(tag).then(entryTag => {
                        saveEntryTag(entryTag)
                    })
                }
                                                        
            }
        EntryListComponent()
    }
        // Change API state and application state
    }
})
eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("deleteNote--")) {
        const [prefix, id] = clickEvent.target.id.split("--")
        deleteEntry(id).then(
           () => {
               EntryListComponent()
           }
       )
    }
})

const badWords = (words) => {
    const re = /badword/
    return re.test(words)
}


const render = (allMoods) => {
    contentTarget.innerHTML = `
    <form action="">
                <fieldset class="inputForm">
                    <label for="journalDate">Date of entry</label>
                    <input type="date" name="journalDate" id="journalDate">
                    <label for="journalConcepts">Concepts Covered</label>
                    <input type="text" name="journalConcepts" id="journalConcepts">
                    <label for="journalTags">Tags</label>
                    <input type="text" name="journalTags" id="journalTags">
                    <textarea name="journalText" id="journalText" rows="10" cols="30">Record Journal entry here
                    </textarea>
                    <label for="journalMood">Mood</label>
                    <select id="journalMood" name="journalMood">
                    ${
                        allMoods.map(
                            (mood) => {
                                return `<option value="${ mood.id }">${ mood.label }</option>`
                            }
                        ).join("")
                    }
                    </select>
                    <input type="button" id="saveJournalEntry" value="Record Journal Entry">
                </fieldset>             
            </form>
    `
}

export const JournalForm = (moods) => {
    render(moods)
}