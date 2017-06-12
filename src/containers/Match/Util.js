function formatPosition(position) {
    if (position === 0)
        return undefined
    if (position === 1)
        return "1st"
    if (position === 2)
        return "2nd"
    if (position === 3)
        return "3rd"
    return `${position}th`

}

export {formatPosition}