import { fetchLeaderboard } from '../content.js';
import { localize, getFontColour } from '../util.js';

import Spinner from '../components/Spinner.js';

export default {
    components: {
        Spinner,
    },
    data: () => ({
        leaderboard: [],
        packs: [],
        loading: true,
        selected: 0,
        err: [],
    }),
    template: `
        <main v-if="loading">
            <Spinner></Spinner>
        </main>
        <main v-else class="page-leaderboard-container">
            <div class="page-leaderboard">
                <div class="error-container">
                    <p class="error" v-if="err.length > 0">
                        Žaidėjų sąrašas yra klaidingas, nes trūksta šių lygių: {{ err.join(', ') }}
                    </p>
                </div>

                <div class="board-container">
                    <table class="board">
                        <tr v-for="(ientry, i) in leaderboard">
                            <td class="rank">
                                <p class="type-label-lg">#{{ i + 1 }}</p>
                            </td>
                            <td class="total">
                                <p class="type-label-lg">{{ localize(ientry.total) }}</p>
                            </td>
                            <td class="user" :class="{ 'active': selected == i }">
                                <button @click="selected = i">
                                    <span class="type-label-lg">{{ ientry.user }}</span>
                                </button>
                            </td>
                        </tr>
                    </table>
                </div>

                
                <div class="player-container">
                    <div class="player">

                        <h1>#{{ selected + 1 }} {{ entry.user }}</h1> <h3>{{ entry.total }}</h3>

                        <!--Completed packs-->
                        <template v-if="entry.packsComplete.length > 0">
                            <h2>Įveikti pakeliai ({{ entry.packsComplete.length}})</h2>
                            <div class="packs">
                                <div class="tag" v-for="pack in entry.packsComplete" :style="{background:pack.colour, color:getFontColour(pack.colour)}">
                                {{pack.name}}
                                </div>
                            </div>
                        </template>

                        <!--Created levels-->
                        <template v-if="entry.createdLevels.length > 0">
                            <h2>Sukurti challenge'ai ({{entry.createdLevels.length}})</h2>
                            <div class="levels">
                                <template v-for="(score, index) in entry.createdLevels">
                                    <div class="level-display">
                                        <template v-if="score.rank <= 75">
                                            <a style="font-weight:bold;" :href="score.link">{{ score.level }}</a>
                                        </template>
                                        <template v-else>
                                            <a style="font-style:italic; opacity: 60%;" :href="score.link">{{ score.level }}</a>
                                        </template>
                                    </div>
                                    <p v-if="index !== entry.createdLevels.length" class="level-display"> - </p>
                                </template>
                            </div>
                        </template>

                        <!--Verified levels-->
                        <h2 v-if="entry.verifiedLevels.length > 0">Patvirtinti challenge'ai ({{ entry.verifiedLevels.length}})</h2>
                        <table class="table">
                            <tr v-for="score in entry.verifiedLevels">
                                <td class="rank">
                                    <p v-if="score.rank <= 75" class="type-label-lg">#{{ score.rank }}</p>
                                    <p v-else class="type-label-lg">Legacy</p>
                                </td>
                                <td class="level">
                                    <a class="type-label-lg" target="_blank" :href="score.link">{{ score.level }}</a>
                                </td>
                                <td class="score">
                                    <p>+{{ localize(score.score) }}</p>
                                </td>
                            </tr>
                        </table>

                        <!--Completed levels-->
                        <h2 v-if="entry.completedLevels.length > 0">Įveikti challenge'ai ({{ entry.completedLevels.length }})</h2>
                        <table class="table">
                            <tr v-for="score in entry.completedLevels">
                                <td class="rank">
                                    <p v-if="score.rank <= 75" class="type-label-lg">#{{ score.rank }}</p>
                                    <p v-else class="type-label-lg">Legacy</p>
                                </td>
                                <td class="level">
                                    <a class="type-label-lg" target="_blank" :href="score.link">{{ score.level }}</a>
                                </td>
                                <td class="score">
                                    <p>+{{ localize(score.score) }}</p>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    `,
    computed: {
        entry() {
            return this.leaderboard[this.selected];
        },
    },
    async mounted() {
        const [leaderboard, err] = await fetchLeaderboard();
        this.leaderboard = leaderboard;
        this.err = err;
        // Hide loading spinner
        this.loading = false;
    },
    methods: {
        localize,
        getFontColour
    },
};
