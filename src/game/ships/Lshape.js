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
        ],
        /* polygon points. Order must corresponds to the variants above */
        frames: [
            [[1,1], [2,1], [2,3], [3,3], [3,4], [1,4], [1,1]],
            [[1,3], [2,3], [2,1], [3,1], [3,4], [1,4], [1,3]],
            [[1,1], [3,1], [3,2], [2,2], [2,4], [1,4], [1,1]],
            [[1,1], [3,1], [3,4], [2,4], [2,2], [1,2], [1,1]],

            [[1,1], [2,1], [2,2], [4,2], [4,3], [1,3], [1,1]],
            [[1,1], [4,1], [4,2], [2,2], [2,3], [1,3], [1,1]],
            [[1,2], [3,2], [3,1], [4,1], [4,3], [1,3], [1,2]],
            [[1,1], [4,1], [4,3], [3,3], [3,2], [1,2], [1,1]]
        ]
    }
}