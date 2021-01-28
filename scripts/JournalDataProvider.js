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
    const response = await fetch("http://localhost:8088/entries")
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
    const result_1 = await getJournalEntries(result)
    return dispatchStateChangeEvent(result_1)
}

export const useJournalEntries = () => {
    const sortedByDate = journal.sort(
        (currentEntry, nextEntry) =>
            Date.parse(currentEntry.date) - Date.parse(nextEntry.date)
    )
    return sortedByDate
}