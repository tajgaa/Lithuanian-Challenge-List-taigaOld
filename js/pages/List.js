import { store } from "../main.js";
import { embed, getFontColour } from "../util.js";
import { score } from "../score.js";
import { fetchEditors, fetchList } from "../content.js";

import Spinner from "../components/Spinner.js";
import LevelAuthors from "../components/List/LevelAuthors.js";

const roleIconMap = {
    owner: "crown",
    admin: "user-gear",
    helper: "user-shield",
    dev: "code",
    trial: "user-lock",
};

export default {
    components: { Spinner, LevelAuthors },
    template: `
        <!-- Template remains unchanged -->
        <!-- (Keep your existing template as-is) -->
    `,
    data: () => ({
        list: null, // Initialize as null to distinguish "not loaded" vs "empty"
        editors: null,
        loading: true,
        selected: 0,
        errors: [],
        roleIconMap,
        store
    }),
    computed: {
        level() {
            // Safeguard against null/undefined or invalid selected index
            if (!this.list || this.list.length === 0 || this.selected >= this.list.length) {
                return null;
            }
            return this.list[this.selected][0]; // [level, err] structure
        },
        video() {
            if (!this.level || !this.level.verification) return "";
            return embed(this.level.showcase || this.level.verification);
        },
        enjoyment() {
            if (!this.level || !this.level.records) return null;
            
            let enjoymentSum = 0;
            let enjoymentCount = 0;
            
            this.level.records.forEach((record) => {
                if (record.enjoyment != null && record.enjoyment >= 0 && record.enjoyment <= 10) {
                    enjoymentSum += record.enjoyment;
                    enjoymentCount++;
                }
            });

            return enjoymentCount > 0 ? (enjoymentSum / enjoymentCount).toFixed(2) : null;
        }
    },
    async mounted() {
        try {
            // Fetch data
            this.list = (await fetchList()) || []; // Fallback to empty array
            this.editors = (await fetchEditors()) || [];

            // Error handling
            this.errors = [];
            if (!this.list || this.list.length === 0) {
                this.errors.push("Nepavyko pakrauti listo. Bandykite vėliau arba kontaktuoja su moderatoriais.");
            } else {
                // Add errors for failed level loads
                this.list.forEach(([_, err]) => {
                    if (err) this.errors.push(`Nepavyko pakrauti lygio. (${err}.json)`);
                });
            }

            if (!this.editors) {
                this.errors.push("Nepavyko pakrauti moderatorių sąrašo.");
            }
        } catch (error) {
            console.error("Failed to load data:", error);
            this.errors.push("Įvyko serverio klaida. Bandykite vėliau.");
        } finally {
            this.loading = false;
        }
    },
    methods: {
        embed,
        score,
    },
};