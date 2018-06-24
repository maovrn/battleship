/***********************************************************************************************************************
 * Describe I-shape ship
 **********************************************************************************************************************/
export default function Ishape () {
    return {
        name: 'I-shape ship',
        decks: 4,
        /* predefined matrix of all available forms. 3 - ship, 1 - other ships free place */
        variants: [
            [
                [1, 1, 1],
                [1, 3, 1],
                [1, 3, 1],
                [1, 3, 1],
                [1, 3, 1],
                [1, 1, 1]
            ],
            [
                [1, 1, 1, 1, 1, 1],
                [1, 3, 3, 3, 3, 1],
                [1, 1, 1, 1, 1, 1]
            ]
        ],
        /* polygon points. Order must corresponds to the variants above */
        frames: [
            [[1,1], [2,1], [2,5], [1,5], [1,1]],
            [[1,1], [5,1], [5,2], [1,2], [1,1]]
        ]
    }
}