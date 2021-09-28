export const checkUrlSource = (url: string): "spotify" | "apple" | "youtube" | null => {
  if (url.includes("spotify.com")) {
    return "spotify"
  }

  if (url.includes("music.apple.com")) {
    return "apple"
  }

  if (url.includes("youtube.com")) {
    return "youtube"
  }

  return null
}

export const isUrl = (text: string) => {
  return text.includes("https") && text.includes("//")
}

export const containsMultipleTracks = (url: string): boolean => {

  if (!isUrl(url)) return false

  switch (checkUrlSource(url)) {
    case "apple": {
      if (url.includes("/playlist/")) {
        return true
      }
    }
      break
    case "spotify": {
      if (url.includes("/playlist/")) {
        return true
      }
    }
      break
    default: {
      return false
    }
  }

  return false
}
