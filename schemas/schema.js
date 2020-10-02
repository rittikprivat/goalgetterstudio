import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import season from './season'
import matchType from './matchType'
import match from './match'
import player from './player'


// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
    // We name our schema
    name: 'matches',
    types: schemaTypes.concat([
        season,
        matchType,
        match,
        player
    ])
})
