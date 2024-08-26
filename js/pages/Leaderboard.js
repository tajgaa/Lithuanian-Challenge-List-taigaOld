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
                    <h1 style="padding:20px; width:100%; text-align:center;">{{ entry.user }}</h1>
                    <div class="player">

                        <!--Main info tab-->
                        <div class="stats-container">
                            <!--Rank-->
                            <div class="extra">
                                <h2 style="padding:5px; width:100%">Reitingas</h2>
                                <div class="levels">
                                    {{ selected + 1 }}
                                </div>
                            <div>

                            <!--Score-->
                            <div class="extra">
                                <h2 style="padding:5px; width:100%">Taškai</h2>
                                <div class="levels">
                                    {{ entry.total }}\
                                </div>
                            <div>

                            <!--Hardest-->
                            <div class="extra">
                                <h2 style="padding:5px; width:100%">Sunkiausias challenge'as</h2>
                                <template v-if="entry.completedLevels.length > 0 | entry.verifiedLevels.length > 0">
                                    <div class="levels">{{ entry.hardest.name }}</div>
                                </template>
                                <template v-else>
                                    <div class="levels">Nieko</div>
                                </template>
                            <div>
                        </div>


                        <!--Completed packs-->
                        <div class="stats-container">
                            <h2 style="padding:5px; width:100%">Įveikti pakeliai</h2>
                            <template v-if="entry.packsComplete.length > 0">
                                <div class="packs">
                                    <div class="tag" v-for="pack in entry.packsComplete" :style="{background:pack.colour, color:getFontColour(pack.colour)}">
                                    {{pack.name}}
                                    </div>
                                </div>
                            </template>
                            <template v-else>
                                <div class="packs">
                                    <div class="tag" style="opacity:70%; background-color:transparent;"> Nieko</div>
                                </div>
                            </template>
                        </div>

                        <!--Completed levels-->
                        <div class="stats-container">
                        <h2 style="padding:5px; width:100%">Įveikti challenge'ai</h2>
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
                            <div class="levels">
                                <div class="level-display" style="opacity:70%">Nieko</div>
                            </div>
                        </template>
                        </div>
                        
                        <div class="stats-container">

                            <!--Created levels-->
                            <div class="extra">
                                <h2 style="padding:5px; width:100%">Sukurti challenge'ai</h2>
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
                                    <div class="levels">
                                        <div class="level-display" style="opacity:70%">Nieko</div>
                                    </div>
                                </template>
                            </div>


                            <!--Verified levels-->
                            <div class="extra">
                                <h2 style="padding:5px; width:100%">Patvirtinti challenge'ai</h2>
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
                                    <div class="levels">
                                        <div class="level-display" style="opacity:70%">Nieko</div>
                                    </div>
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
