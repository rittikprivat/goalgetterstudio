import {useState, useEffect} from 'react'
import {useDocumentOperation} from '@sanity/react-hooks'

import client from "part:@sanity/base/client"

export function AddMatchToPlayersAction(props) {
    const {publish} = useDocumentOperation(props.id, props.type);
    const [isPublishing, setIsPublishing] = useState(false);

    let toBeAdded= [];
    let toBeDeleted =[];

    useEffect(() => {
        // if the isPublishing state was set to true and the draft has changed
        // to become `null` the document has been published
        if (isPublishing && !props.draft) {
            setIsPublishing(false)
        }
    }, [props.draft]);

    return {
        disabled: publish.disabled,
        label: isPublishing ? 'Adding match to player and publishing…' : 'Add match and publish',
        onHandle: () => {
            // This will update the button text
            setIsPublishing(true);

            props.draft.players.forEach((player) => {
                if(props.published){
                    const idx = props.published.players.indexOf(player)
                    if(idx >= 0){
                        // Player already published
                        props.published.players.splice(idx, 1)
                    } else {
                        toBeAdded.push(player);
                    }
                } else {
                    toBeAdded.push(player);
                }
            });

            toBeDeleted = props.published.players;

            // Add match to players
            toBeAdded.forEach((player) => {
                client.getDocument(player._ref).then(p =>{
                    client
                        .patch(player._ref)
                        .setIfMissing({matches: []})
                        .insert('after', 'matches[-1]', [
                            {
                                _key: '_' + Math.random().toString(36).substr(2, 9),
                                _type: 'matchStat',
                                seasonId: props.published.season._ref,
                                matchId: props.published._id,
                                matchTitle: props.published.title,
                                goals: 0,
                                assists: 0
                            }
                        ])
                        .commit()
                });
            });

            toBeDeleted.forEach((player) =>{
                const matchToRemove = ['matches[matchId=="' + props.published._id + '"]'];
                client.getDocument(player._ref).then(p =>{
                    client
                        .patch(player._ref)
                        .unset(matchToRemove)
                        .commit()
                });
            });

            // Perform the publish
            publish.execute();
            // Signal that the action is completed
            props.onComplete();
        }
    }
}
