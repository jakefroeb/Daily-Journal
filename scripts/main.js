console.log("Welcome to the main module")

import { getJournalEntries, useJournalEntries } from "./JournalDataProvider.js";
import { EntryListComponent } from "./JournalEntryList.js"
import { JournalForm } from "./JournalForm.js";
import { getMoods, useMoods } from "./MoodsProvider.js";
import { FilterBar} from "./FilterBar.js"
import { getTags, saveTag } from "./TagProvider.js";
import { getEntryTags } from "./EntryTagProvider.js";

EntryListComponent();
getEntryTags().then(getTags).then(getMoods).then(() =>{
    JournalForm(useMoods())
    FilterBar()
    })