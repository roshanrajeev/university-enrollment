export const decodeBase64 = encodedString => {
  const decodedString = atob(encodedString)
  return decodedString
}
