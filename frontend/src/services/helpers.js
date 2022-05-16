import _ from 'lodash';
/* eslint-disable */
export const parseObjectsArray = (array) => {
  const categories = _.groupBy(array, (object) => object.category);
  return categories;
};

export const createNewJSON = (array) => {
  const calculatePercentage = (item, largest) => {
    const percentage =
      item.observationCount > 0
        ? (item.observationCount / largest.observationCount) * 100
        : (1 / largest.observationCount) * 100;

    const points = (Math.ceil(percentage / 10) * 10) / 10;
    return 11 - points;
    // return (Math.ceil(percentage / 10) * 10) / 10;
  };

  let categories = parseObjectsArray(array);

  const keys = Object.keys(categories);

  for (let key of keys) {
    const newCategory = categories[key].sort((a, b) => a.name > b.name);
    const smallest = newCategory.reduce((prev, curr) =>
      prev.observationCount < curr.observationCount ? prev : curr
    );
    const largest = newCategory.reduce((prev, curr) =>
      prev.observationCount > curr.observationCount ? prev : curr
    );

    for (let item of newCategory) {
      const percentage = calculatePercentage(item, largest);

      item.points = percentage;
    }
  }
};
