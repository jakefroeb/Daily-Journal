console.log("Welcome to the main module")

import { getJournalEntries, useJournalEntries } from "./JournalDataProvider.js";
import { EntryListComponent } from "./JournalEntryList.js"
import { JournalForm } from "./JournalForm.js";
import { getMoods, useMoods } from "./MoodsProvider.js";
import { FilterBar} from "./FilterBar.js"

EntryListComponent();
getMoods().then(() =>{
    JournalForm(useMoods())
    FilterBar()
    })
