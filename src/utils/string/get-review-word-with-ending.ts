export function getReviewWordWithEnding(count: number) {
    switch (count) {
        case 1:
        case 21:
        case 31:
            return `${count} review`;
        case 2:
        case 3:
        case 4:
        case 22:
        case 23:
        case 24:
        case 34:
            return `${count} reviews`;
        default:
            return `${count} reviews`;
    }
}