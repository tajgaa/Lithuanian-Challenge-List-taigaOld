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
                    <h1 style="padding:2em;">#{{ selected + 1 }} {{ entry.user }}</h1> <h3 style="padding:2em;>{{ entry.total }}</h3>
                    <div class="player">

                        <!--Completed packs-->
                        <template v-if="entry.packsComplete.length > 0">
                            <h2>Įveikti pakeliai ({{ entry.packsComplete.length}})</h2>
                            <div class="packs">
                                <div class="tag" v-for="pack in entry.packsComplete" :style="{background:pack.colour, color:getFontColour(pack.colour)}">
                                {{pack.name}}
                                </div>
                            </div>
                        </template>

                        <!--Completed levels-->
                        <h2>Įveikti challenge'ai</h2>
                        <template v-if="entry.completedLevels.length > 0">
                                <div class="levels">
                                    <template v-for="(score, index) in entry.completedLevels">
                                        <div class="level-display">
                                            <template v-if="score.rank <= 75">
                                                <a style="font-weight:bold;" :href="score.link">{{ score.level }}</a>
                                            </template>
                                            <template v-else>
                                                <a style="font-style:italic; opacity: 60%;" :href="score.link">{{ score.level }}</a>
                                            </template>
                                        </div>
                                        <div v-if="index !== entry.completedLevels.length - 1" class="level-display">-</div>
                                    </template
                                </div>
                            </template>
                            <template v-else>
                                <div class="levels" style:"opacity:70%">Nieko</div>
                            </template>
                        </template>
                        
                        <div class="personal">

                            <!--Created levels-->
                            <div class="extra">
                            <h2>Sukurti challenge'ai</h2>
                            <template v-if="entry.createdLevels.length > 0">
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
                                        <div v-if="index !== entry.createdLevels.length - 1" class="level-display">-</div>
                                    </template>
                                </div>
                            </template>
                            <template v-else>
                                <div class="levels" style:"opacity:70%">Nieko</div>
                            </template>
                            </div>


                            <!--Verified levels-->
                            <div class="extra">
                            <h2>Patvirtinti challenge'ai ({{entry.verifiedLevels.length}})</h2>
                            <template v-if="entry.verifiedLevels.length > 0">
                                <div class="levels">
                                    <template v-for="(score, index) in entry.verifiedLevels">
                                        <div class="level-display">
                                            <template v-if="score.rank <= 75">
                                                <a style="font-weight:bold;" :href="score.link">{{ score.level }}</a>
                                            </template>
                                            <template v-else>
                                                <a style="font-style:italic; opacity: 60%;" :href="score.link">{{ score.level }}</a>
                                            </template>
                                        </div>
                                        <div v-if="index !== entry.verifiedLevels.length - 1" class="level-display">-</div>
                                    </template>
                                </div>
                            </template>
                            <template v-else>
                                <div class="levels" style:"opacity:70%">Nieko</div>
                            </template>
                            </div>
                        </div>
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
