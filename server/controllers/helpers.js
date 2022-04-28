// https://eslint.org/docs/rules/no-param-reassign
/* eslint no-param-reassign: ["error", { "props": false }] */
/**
 *
 * @param {*} documentToUpdate The mongoose document we wish to update
 * @param {*} values Object containing the [key, value]-pairs we wish to try to update
 */
const updateDocumentValues = (documentToUpdate, values) => {
  Object.entries(values).forEach(
    ([key, value]) => {
      if (value) documentToUpdate[key] = value;
    },
  );
};

// If first time, add points
// If first image, add points
const calculatePointsToAdd = (finds, newFind) => {
  const factor = newFind.image ? 2 : 1;

  const foundBefore = finds.filter(find => find._id === newFind.id);
  if (!foundBefore.length) return newFind.points * factor;

  const hasImageBefore = foundBefore.some((find) => {
    console.log(find.image);
    console.log(find.image.length);
    return find.image;
  });
  console.log(hasImageBefore);

  return hasImageBefore ? 0 : newFind.points;
};

const calculatePointsToRemove = (finds, findToRemove) => {
  const factor = findToRemove.image ? 2 : 1;
  const foundBefore = finds.filter(find => find._id !== findToRemove.id);

  if (!foundBefore) return findToRemove.points * factor;

  const hasImageBefore = foundBefore.some((find) => {
    console.log(find.image);
    console.log(find.image.length);
    return find.image;
  });
  console.log(hasImageBefore);

  return hasImageBefore ? findToRemove.points : findToRemove.points * factor;
};

const calculatePointsUpdate = (finds, findToUpdate) => {
  const findInDb = finds.find(find => find._id === findToUpdate._id);
  console.log('findsInDb', findInDb);

  if (!findInDb) return 0;

  // Ei aikaisempaa kuvaa
  if (!findInDb.image) {
    return findToUpdate.image
      ? calculatePointsToAdd(finds.filter(find => find._id !== findToUpdate._id), findToUpdate)
      : 0;
  }

  // On aikaisempi kuva
  return !findToUpdate.image
    // Aina miinusmerkkinen
    ? -Math.abs(calculatePointsToRemove(
      finds.filter(find => find._id !== findToUpdate._id, findToUpdate),
    ))
    : 0;
};

module.exports = {
  updateDocumentValues,
  calculatePointsToAdd,
  calculatePointsToRemove,
  calculatePointsUpdate,
};
