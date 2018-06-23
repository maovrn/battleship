/***********************************************************************************************************************
 * Describe L-shape ship
 **********************************************************************************************************************/
export default function Lshape () {
    return {
        name: 'L-shape ship',
        decks: 4,
        /* predefined matrix of all available forms. 3 - ship, 1 - other ships free place */
        variants: [
            [
                [1, 1, 1, 0],
                [1, 3, 1, 0],
                [1, 3, 1, 1],
                [1, 3, 3, 1],
                [1, 1, 1, 1]
            ],
            [
                [0, 1, 1, 1],
                [0, 1, 3, 1],
                [1, 1, 3, 1],
                [1, 3, 3, 1],
                [1, 1, 1, 1]
            ],
            [
                [1, 1, 1, 1],
                [1, 3, 3, 1],
                [1, 3, 1, 1],
                [1, 3, 1, 0],
                [1, 1, 1, 0]
            ],
            [
                [1, 1, 1, 1],
                [1, 3, 3, 1],
                [1, 1, 3, 1],
                [0, 1, 3, 1],
                [0, 1, 1, 1]
            ],

            [
                [1, 1, 1, 0, 0],
                [1, 3, 1, 1, 1],
                [1, 3, 3, 3, 1],
                [1, 1, 1, 1, 1]
            ],
            [
                [1, 1, 1, 1, 1],
                [1, 3, 3, 3, 1],
                [1, 3, 1, 1, 1],
                [1, 1, 1, 0, 0]
            ],
            [
                [0, 0, 1, 1, 1],
                [1, 1, 1, 3, 1],
                [1, 3, 3, 3, 1],
                [1, 1, 1, 1, 1]
            ],
            [
                [1, 1, 1, 1, 1],
                [1, 3, 3, 3, 1],
                [1, 1, 1, 3, 1],
                [0, 0, 1, 1, 1]
            ]
        ]
    }
}