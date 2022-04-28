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
  console.log(categories);
  console.log('CREATING NEW JSON, DELETE THIS!');
  const keys = Object.keys(categories);
  console.log(keys);
  for (let key of keys) {
    const newCategory = categories[key].sort((a, b) => a.name > b.name);
    const smallest = newCategory.reduce((prev, curr) =>
      prev.observationCount < curr.observationCount ? prev : curr
    );
    const largest = newCategory.reduce((prev, curr) =>
      prev.observationCount > curr.observationCount ? prev : curr
    );
    console.log(smallest.observationCount, largest.observationCount);
    for (let item of newCategory) {
      console.log(item.name);
      const percentage = calculatePercentage(item, largest);
      console.log(percentage);
      item.points = percentage;
    }
    console.log(newCategory);
  }
  console.log('FINALIZED PRODUCT');
  console.log(categories);
};
