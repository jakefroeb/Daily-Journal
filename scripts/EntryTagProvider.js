let entryTags
export const useEntryTags = () => tags.slice()

export const getEntryTags = async () => {
    const response = await fetch("http://localhost:8088/entrytags")
    const parsedEntries = await response.json()
    entryTags = parsedEntries
}

export const saveEntryTag = async entryTag => {
    const result = await fetch('http://localhost:8088/entrytags', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entryTag)
    })
}