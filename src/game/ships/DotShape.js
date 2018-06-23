/***********************************************************************************************************************
 * Describe dot-shape ship
 **********************************************************************************************************************/
export default function DotShape () {
    return {
        name: 'Single deck ship',
        decks: 1,
        /* predefined matrix of all available forms. 3 - ship, 1 - other ships free place */
        variants: [
            [
                [1, 1, 1],
                [1, 3, 1],
                [1, 1, 1]
            ]
        ],
        /* polygon points. Order must relates to the variants above */
        frames: [
            [[1,1], [2,1], [2,2], [1,2], [1,1]]
        ]
    }
}