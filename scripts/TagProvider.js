let tags
export const useTags = () => tags.slice()

export const getTags = async () => {
    const response = await fetch("http://localhost:8088/tags")
    const parsedEntries = await response.json()
    tags = parsedEntries
    return tags
}

export const saveTag = async tag => {
    const result = await fetch("http://localhost:8088/tags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tag)
    })
    const response = await result.json()
    return response
}