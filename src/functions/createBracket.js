require("dotenv").config();
const fs = require('fs');
const { v2, auth } = require('osu-api-extended');
const {google} = require('googleapis');
const googleAuth = new google.auth.GoogleAuth({
    keyFile: '../keyfile.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets'
});

const sheets = google.sheets({version: 'v4', auth: googleAuth});

async function getSettings() {
    return new Promise(async (resolve, reject) => {
        const settings = await sheets.spreadsheets.values.get({
            spreadsheetId: '106_E_FVrBRr4VJhlrOujAoFo2CH0_UqY8lJ9Whr49Xw',
            range: 'Settings!A2:B',
        });

        resolve(settings.data.values);
    });
}

async function getTeams() {
    return new Promise(async (resolve, reject) => {
        const teams = await sheets.spreadsheets.values.get({
            spreadsheetId: spreadsheetId,
            range: 'Teams!A2:G',
        });

        resolve(teams.data.values);
    });
}

async function getRounds() {
    return new Promise(async (resolve, reject) => {
        const rounds = await sheets.spreadsheets.values.get({
            spreadsheetId: spreadsheetId,
            range: 'Rounds!A2:J',
        });

        resolve(rounds.data.values);
    });
}

async function getMatches() {
    return new Promise(async (resolve, reject) => {
        const matches = await sheets.spreadsheets.values.get({
            spreadsheetId: spreadsheetId,
            range: 'Matches!A2:J',
        });
    });
}

const bracket = {};

bracket.Ruleset = {};

// Default settings
bracket.Ruleset.ShortName = "osu";
bracket.Ruleset.Name = "osu!";
bracket.Ruleset.InstantiationInfo = "osu.Game.Rulesets.Osu.OsuRuleset, osu.Game.Rulesets.Osu";
bracket.Matches = [];
bracket.Rounds = [];
bracket.Teams = [];
bracket.Progressions = [];
bracket.ChromaKeyWidth = 1024;
bracket.PlayersPerTeam = 4;
bracket.AutoProgressScreens = true;

function addMatch(id, team1Acronym, team2Acronym, losers, date, pointsToWin) {
    bracket.Matches.push({
        ID: id,
        Team1Acronym: team1Acronym,
        Team1Score: null,
        Team2Acronym: team2Acronym,
        Team2Score: null,
        Completed: false,
        Losers: losers,
        PicksBans: [],
        Current: false,
        Date: date,
        ConditionalMatches: [],
        Position: {
            X: 0,
            Y: 0
        },
        Acronyms: [
            team1Acronym,
            team2Acronym
        ],
        WinnerColour: "Blue",
        PointsToWin: pointsToWin,
    })

    console.log("Added match " + id);
}

function addRound(roundName, description, bestOf, startDate) {
    bracket.Rounds.push({
        Name: roundName,
        Description: description,
        BestOf: bestOf,
        Beatmaps: [],
        StartDate: startDate,
        Matches: []
    });

    console.log("Added round " + roundName);
}

function addRoundBeatmap(roundName, beatmapId, mods) {
    bracket.Rounds.forEach(round => {
        if (round.Name == roundName) {
            round.Beatmaps.push({
                ID: beatmapId,
                Mods: mods,
                BeatmapInfo: {
                    OnlineID: beatmapId,
                    DifficultyName: "test",
                    BPM: 100,
                    Length: 100,
                    StarRating: 5,
                    Metadata: {
                        Title: "test",
                        title_unicode: "test",
                        Artist: "test",
                        artist_unicode: "test",
                        Author: {
                            OnlineID: 1,
                            Username: "test",
                            CountryString: "US",
                        },
                        Source: "test",
                        tags: "test",
                        PreviewTime: 100,
                        AudioFile: "test",
                        BackgroundFile: "test",
                    },
                    Difficulty: {
                        DrainRate: 5,
                        CircleSize: 5,
                        OverallDifficulty: 5,
                        ApproachRate: 5,
                        SliderMultiplier: 5,
                        SliderTickRate: 5,
                    },
                    Covers: {
                        "cover@2x": "test",
                        "card@2x": "test",
                        "list@2x": "test",
                    }
                }
            });
        }
    });

    console.log("Added beatmap " + beatmapId + " to round " + roundName);
}

function addRoundMatch(roundName, matchId) {
    bracket.Rounds.forEach(round => {
        if (round.Name == roundName) {
            round.Matches.push(matchId);
        }
    });

    console.log("Added match " + matchId + " to round " + roundName);
}

function addTeam(teamName, flagName, acronym, seed, lastYearPlacing) {    
    bracket.Teams.push({
        FullName: teamName,
        FlagName: flagName,
        Acronym: acronym,
        SeedingResults: [],
        Seed: seed,
        LastYearPlacing: lastYearPlacing,
        AverageRank: 1,
        Players: [],
    });

    console.log("Added team " + teamName);
}

 function getPlayerInfo(osuPlayerId) {
    return new Promise(async (resolve, reject) => {
        await auth.login(process.env.OSU_CLIENT_ID, process.env.OSU_CLIENT_SECRET);

        const user = await v2.user.details(osuPlayerId, 'osu');
        resolve(user);
    });
}

async function addTeamPlayer(teamAcronym, osuPlayerId) {
    await getPlayerInfo(osuPlayerId).then(player => {
        bracket.Teams.forEach(team => {
            if (team.Acronym == teamAcronym) {
                team.Players.push({
                    id: osuPlayerId,
                    Username: player.username,
                    country_code: player.country_code,
                    Rank: player.statistics.global_rank,
                    CoverUrl: player.cover_url,
                });

                console.log("Added player " + player.username + " to team " + teamAcronym);
            }
        });
    });
}

function addProgression(sourceID, targetID) {
    bracket.Progressions.push({
        SourceID: sourceID,
        TargetID: targetID,
    });

    console.log("Added progression from match " + sourceID + " to match " + targetID);
}

// async function addSampleData() {
//     addMatch(1, "AUS", "NZL", false, "2022-10-09T16:00:00+00:00", 5);
//     addMatch(2, "AUS", "NZL", false, "2022-10-09T16:00:00+00:00", 5);
//     addRound("Round 1", "Best of 11", 11, "2022-10-09T16:00:00+00:00");
//     addTeam("Team 1", "US", "T1", 1, 1);
//     addTeam("Team 2", "US", "T2", 2, 2);
//     await addTeamPlayer("T1", 11212255);
//     addProgression(1, 2);
//     return;
// }

getSettings().then(settings => {
    console.log(settings);
});

// addSampleData().then(() => {
//     fs.writeFile('./bracket.json', JSON.stringify(bracket), (err) => {
//         if (err) throw err;
//         console.log('The file has been saved!');
//     });
// });