import defaultResolve, {PublishAction} from 'part:@sanity/base/document-actions'
import {AddMatchToPlayersAction} from './actions/AddMatchToPlayersAction'

export default function resolveDocumentActions(props) {
    return  defaultResolve(props)
        .map(Action =>
            Action === PublishAction && props.type === 'match' ? AddMatchToPlayersAction : Action
        )
}
