import client from "part:@sanity/base/client"

export default {
    type: 'document',
    name: 'player',
    title: 'Player',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string'
        },
        {
            name: 'matches',
            type: 'array',
            description: 'Publish one or more matches and set a reference to them here.',
            title: 'Matches',
            of: [
                {
                    type: 'object',
                    title: 'Match stats',
                    name: 'matchStat',
                    fields:[
                        {name: 'seasonId', title: 'Season ID', type: 'string'},
                        {name: 'matchId', title: 'Match ID', type: 'string'},
                        {name: 'matchTitle', title: 'Match Title', type: 'string'},
                        {name: 'goals', title: 'Goals', type: 'number'},
                        {name: 'assists', title: 'Assists', type: 'number'}
                    ],
                    preview: {
                        select: {
                            title: 'matchTitle'
                        }
                    },
                }
            ]
        }
    ]
}
