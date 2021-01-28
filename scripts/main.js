console.log("Welcome to the main module")

import { getJournalEntries, useJournalEntries } from "./JournalDataProvider.js";
import { EntryListComponent } from "./JournalEntryList.js"
import { JournalForm } from "./JournalForm.js";

EntryListComponent();
JournalForm();