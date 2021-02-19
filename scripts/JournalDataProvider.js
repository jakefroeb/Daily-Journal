/*
 *   Journal data provider for Daily Journal application
 *
 *      Holds the raw data about each entry and exports
 *      functions that other modules can use to filter
 *      the entries for different purposes.
 */

// This is the original data.

let journal = []
const eventHub = document.querySelector(".container")

/*
    You export a function that provides a version of the
    raw data in the format that you want
*/
const dispatchStateChangeEvent = () => {
    const journalEntriesStateChangedEvent = new CustomEvent("journalEntryStateChanged")
    eventHub.dispatchEvent(journalEntriesStateChangedEvent)
}
export const getJournalEntries = async () => {
    const response = await fetch("http://localhost:8088/entries?_expand=mood")
    const parsedEntries = await response.json()
    journal = parsedEntries
    console.log(journal)
}
export const saveJournalEntry = async entry => {
    const result = await fetch('http://localhost:8088/entries', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entry)
    })
    const response = await result.json()
    return response
}

export const useJournalEntries = () => {
    const sortedByDate = journal.sort(
        (currentEntry, nextEntry) =>
            Date.parse(currentEntry.date) - Date.parse(nextEntry.date)
    )
    return sortedByDate
}
export const deleteEntry = entryId => {
    return fetch(`http://localhost:8088/entries/${entryId}`, {
        method: "DELETE"
    })
        .then(getJournalEntries)
}