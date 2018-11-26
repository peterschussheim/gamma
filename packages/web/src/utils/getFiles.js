/**
 * Takes an object representation of a 'gist' and iterates over its' keys
 * collecting each key (equiv to file name) and value in the result array.
 *
 * @param {object} g gist object from app state
 * @returns {array} An array containing object files
 */
export default function getFiles(g) {
  let { files } = g
  let result = []
  for (let key in files) {
    if (files.hasOwnProperty(key)) {
      result.push(files[key])
    }
  }
  return result
}
