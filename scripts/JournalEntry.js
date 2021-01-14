/*
 *  Purpose: To render a single journal entry as an
 *           HTML representation of the data
 */
export const JournalEntryComponent = (entry) => {
    return `
        <section id="entry--${entry.id}" class="journalEntry">
            <h1>${entry.concept}</h1>
            <div>${entry.entry}</div>
            <div>${entry.date}</div>
            <div>${entry.mood}</div>
        </section>
    `
}