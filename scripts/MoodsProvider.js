let moods = []

export const getMoods = async () => {
    const response = await fetch("http://localhost:8088/moods")
    const parsedEntries = await response.json()
    moods = parsedEntries
    console.log(moods)
}

export const useMoods = () => moods.slice()
