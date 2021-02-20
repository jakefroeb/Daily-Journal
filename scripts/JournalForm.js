import { deleteEntryTags, saveEntryTag } from "./EntryTagProvider.js";
import { saveJournalEntry, deleteEntry, getJournalEntries } from "./JournalDataProvider.js";
import { EntryListComponent } from "./JournalEntryList.js";
import { getTags, saveTag } from "./TagProvider.js";

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
            let journalId
            let tagId
            let entryTag
            let inputTagObj
        saveJournalEntry(newJournalEntry).then((entry) => {
            journalId = entry.id}).then(getTags).then((tags) =>{
                for (const inputTag of inputTags) {
                    let foundTag = tags.find(tag => tag.subject === inputTag)
                    if(foundTag){
                        tagId = foundTag.id
                        entryTag = {
                            tagId : tagId,
                            entryId : journalId
                        }
                        saveEntryTag(entryTag)
                    }else{
                        inputTagObj = {
                            subject : inputTag
                        }
                        saveTag(inputTagObj).then((tag) => {
                            entryTag = {
                                tagId : tag.id,
                                entryId : journalId
                            }
                        }).then(()=>saveEntryTag(entryTag))
                    }
                }
            })    
        EntryListComponent()
    }
    }
})
eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("deleteNote--")) {
        const [prefix, id] = clickEvent.target.id.split("--")
        deleteEntry(id).then(deleteEntryTags(id)).then(getJournalEntries).then(() => {
            
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