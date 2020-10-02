import S from '@sanity/desk-tool/structure-builder'

export default () =>
    S.list()
        .title('Content')
        .items([
            // List out all the document types in schema.js
            ...S.documentTypeListItems(),
            // Add a new list item for projects by category
            S.listItem()
                .title('Matches by season')
                .child(
                    // List out all categories
                    S.documentTypeList('season')
                        .title('Matches by season')
                        .child(seasonId =>
                            // List out project documents where the _id for the selected
                            // category appear as a _ref in the project’s categories array
                            S.documentList()
                                .schemaType('match')
                                .title('Matches')
                                .filter(
                                        '_type == "match" && $seasonId == season._ref'
                                )
                                .params({ seasonId })
                        )
                ),
        ])
