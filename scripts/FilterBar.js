
import { MoodFilter } from "./MoodFilter.js"
import { useMoods } from "./MoodsProvider.js"

/*
 You need to make a new HTML element with a class of
 `filters` in index.html
*/
const contentTarget = document.querySelector(".filters")

const render = () => {
    contentTarget.innerHTML = `
        ${MoodFilter(useMoods())}
    `
}
export const FilterBar = () => {
    render()
}