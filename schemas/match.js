export default {
    name: 'match',
    type: 'document',
    title: 'Match',
    fields: [
        {
            name: 'title',
            type: 'string',
            title: 'Match title'
        },
        {
            name: 'date',
            type: 'date',
            title: 'Dato'
        },
        {
            name: 'season',
            title: 'Season',
            type: 'reference',
            to: [{ type: 'season' }]
        },
        {
            name: 'type',
            title: 'Type',
            type: 'reference',
            to: [{ type: 'matchType' }]
        },
        {
            name: 'opponent',
            type: 'string',
            title: 'Opponent'
        },
        {
            name: 'goals',
            type: 'number',
            title: 'Goals'
        },
        {
            name: 'opponentGoals',
            type: 'number',
            title: 'Opponent goals'
        },
        {
            name: 'away',
            type: 'boolean',
            title: 'Bortekamp'
        },
        {
            name: 'players',
            type: 'array',
            description: 'Publish one or more players and set a reference to them here.',
            title: 'Players',
            validation: Rule => Rule.unique().error('You can only have one of a player'),
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'player' }]
                }
            ]
        }
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'season.title',
            date: 'date'
        },
        prepare(selection){
            const {title, subtitle, date} = selection;
            return{
                title: title,
                subtitle: subtitle + '(' + date + ')'
            }
        }

    }
}
