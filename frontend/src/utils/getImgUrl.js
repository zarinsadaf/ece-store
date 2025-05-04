function getImgUrl (name) {
    return new URL(`../assets/merchandises/${name}`, import.meta.url)
}

export {getImgUrl}