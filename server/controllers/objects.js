const objectsRouter = require('express').Router();
const axios = require('axios');
const FindableObject = require('../models/FindableObject');
// const axios = require('axios');
// const middleware = require('../util/middleware');
// const data = require('../util/data.json');

/*

ROUTES:

GET : /
GET : /:id
GET : /category/:name

*/

// GET
objectsRouter.get('/', async (req, res) => {
  const objects = await FindableObject.find({});
  return res.status(200).json(objects.map(object => object.toJSON()));
});

objectsRouter.get('/category/:name', async (req, res) => {
  const objects = await FindableObject.find({ category: req.params.name });
  return res.status(200).json(objects);
});

objectsRouter.get('/wikipedia/:name', async (req, res) => {
  const apiUrl = 'https://fi.wikipedia.org/w/api.php';
  const wikiTitle = req.params.name;

  const getTitle = async (title) => {
    if (!title || typeof (title) !== 'string') return null;
    const config = {
      action: 'parse',
      prop: 'text',
      page: encodeURI(title),
      format: 'json',
    };

    let url = `${apiUrl}`;
    // TODO: Onko kauniimpi tapa? Ekaan kysymysmerkki loppuihin &
    Object.keys(config).forEach((key,i) => url += `${i === 0 ? '?' : '&'}${key}=${config[key]}`);

    try {
      const response = await axios.get(url, { headers: { 'User-Agent': 'Bongari-App (itjonne@gmail.com) axios' } });
      return response.data.parse.text['*'];
    } catch (error) {
      console.log('error', error.status);
      return null;
    }
  };

  const response = await getTitle(wikiTitle);
  return response ? res.status(200).json(response) : res.status(400).json({ error: 'problems with wikipedia'});
});

objectsRouter.get('/:id', async (req, res) => {
  const object = await FindableObject.findById(req.params.id);
  return object ? res.status(200).json(object.toJSON()) : res.status(400).json({ message: `failed to get ${req.params.id}` });
});

// Täältä muokattu: https://www.mediawiki.org/wiki/API:Picture_of_the_day_viewer
objectsRouter.get('/wikipedia-image/:name', async (req, res) => {
  const apiUrl = 'https://fi.wikipedia.org/w/api.php';
  const title = req.params.name;

  const getTitleImageSrc = async (filename) => {
    const config = {
      action: 'query',
      format: 'json',
      prop: 'imageinfo',
      iiprop: 'url',
      titles: filename,
    };

    let url = `${apiUrl}`;
    // TODO: Onko kauniimpi tapa? Ekaan kysymysmerkki loppuihin &
    Object.keys(config).forEach(
      (key, i) => { url += `${i === 0 ? '?' : '&'}${key}=${config[key]}`; });

    try {
      const response = await axios.get(
        url, { headers: { 'User-Agent': 'Bongari-App (itjonne@gmail.com) axios' } });
      // const thumbnail = response.data.query.pages[0].thumbnail.source
      // ? response.data.query.pages[0].thumbnail.source : null;

      if (response.data.query.pages) {
        const key = Object.keys(response.data.query.pages)[0];
        return response.data.query.pages[key].imageinfo[0].url;
      }
      return null;
    } catch (error) {
      console.log('error', error.status);
      return null;
    }
  };

  const getTitleImage = async (name) => {
    if (!name || typeof (name) !== 'string') return null;
    const config = {
      action: 'query',
      prop: 'images',
      titles: encodeURI(name),
      format: 'json',
    };

    let url = `${apiUrl}`;
    // TODO: Onko kauniimpi tapa? Ekaan kysymysmerkki loppuihin &
    Object.keys(config).forEach(
      (key, i) => { url += `${i === 0 ? '?' : '&'}${key}=${config[key]}`; });
    // const simpleUrl = `https://fi.wikipedia.org/w/api.php?action=parse&page=${encodeURI(name)}&prop=text`;
    // , { headers: {'User-Agent': 'Bongari-App (itjonne@gmail.com) axios'}}

    try {
      const response = await axios.get(
        url, { headers: { 'User-Agent': 'Bongari-App (itjonne@gmail.com) axios' } });
      // const thumbnail = response.data.query.pages[0].thumbnail.source
      // ? response.data.query.pages[0].thumbnail.source : null;
      if (response.data.query.pages) {
        const key = Object.keys(response.data.query.pages)[0];
        const realImages = [];

        const imageLoopFunction = (value, index, array) => {
          if (!value.title.includes('logo') && !value.title.includes('svg')) {
            realImages.push(value);
          }
        };

        response.data.query.pages[key].images.forEach(imageLoopFunction);

        return realImages;
      }
      return null;
    } catch (error) {
      console.log('error', error.status);
      return null;
    }
  };
  const filenames = await getTitleImage(title);

  const filenameFunction = async (value) => {
    if (!value.title) return null;
    console.log(value);
    const src = await getTitleImageSrc(value.title);
    console.log(src);
    return src;
  };

  const getImages = async (names) => {
    const images = [];
    if (!names) return images;

    for await (const name of names) {
      console.log(name);
      const src = await filenameFunction(name);
      if (src) images.push(src);
    };

    return images;
  };

  const images = await getImages(filenames);
  // filenames.forEach(filenameFunction);
  // const src = await getTitleImageSrc(filename.title);
  return res.status(200).json(images);
  // action=query&titles=Al-Farabi&prop=pageimages&format=json&pithumbsize=100
});

/* APU

const changeCategoryToCorrect = (value) => {
  const real = {
    kala: 'Kalat',
    sieni: 'Sienet',
    nisakas: 'Nisäkkäät',
    perhonen: 'Perhoset',
    kukkakasvi: 'Kukkakasvit',
    puu_pensas: 'Puut & Pensaat',
    lintu: 'Linnut',
  };
  return real[value];
};

// TODO: Ei testattu.
objectsRouter.post('/updateOccurences', middleware.requireAuth('ADMIN'), async (req, res) => {
  const objects = await Object.find({});

  const updateOccurences = async (value, index, array) => {
    const object = value;
    const url = `https://api.laji.fi/v0/taxa/${object.taxon}?lang=fi&langFallback=true&maxLevel=0&selectedFields=observationCountFinland&includeHidden=false&includeMedia=false&includeDescriptions=false&includeRedListEvaluations=false&sortOrder=taxonomic&access_token=msabmytgBCKR5Cubs9VAH7bxwMMb15V0tFFfXKLWlfeFMZ8p1E3Ij1FfQ6Dr34ic`;
    const response = await axios.get(url);
    console.log(response.data);
    console.log(response.data.observationCountFinland);
    object.observationCount = response.data.observationCountFinland
      && response.data.observationCountFinland;
    await object.save();
  };

  objects.forEach(updateOccurences);

  const newObjects = await Object.find({});
  return res.status(200).json(newObjects);
});

objectsRouter.get('/vanha', async (req, res) => {
  const objects = await FindableObject.find({});
  return res.status(200).json(objects.map(object => object.toJSON()));
});

objectsRouter.post('/clear', async (req, res) => {
  await Object.deleteMany({});
  return res.status(200);
});

objectsRouter.get('/families', async (req, res) => {
  console.log('families');
  const unique = [...new Set(data.map(item => item.extra.family))];
  return res.status(200).json(unique);
});

objectsRouter.post('/populate', async (req, res) => {
  console.log('populating');
  const createNew = async (value, index, array) => {
    const object = new Object({
      name: value.name,
      nameLatin: value.extra.name_latin,
      category: changeCategoryToCorrect(value.extra.species),
      subcategory: value.extra.family,
      taxon: value.taxon,
      points: 1,
      observationCount: value.observationCount,
    });
    await object.save();
  };
  data.forEach(createNew);
  return res.status(201).json({ message: 'created' });
});

objectsRouter.get('/wikipedia/:name', async (req, res) => {
  const apiUrl = 'https://fi.wikipedia.org/w/api.php';
  const title = req.params.name;

  const getTitle = async (name) => {
    console.log('title', name);
    if (!name || typeof (name) !== 'string') return null;
    const config = {
      action: 'parse',
      prop: 'text',
      page: encodeURI(name),
      format: 'json',
    };
    let url = `${apiUrl}`;
    // TODO: Onko kauniimpi tapa? Ekaan kysymysmerkki loppuihin &
    Object.keys(config).forEach(
      (key, i) => { url += `${i === 0 ? '?' : '&'}${key}=${config[key]}`; });
    // const simpleUrl = `https://fi.wikipedia.org/w/api.php?action=parse&page=${encodeURI(title)}&prop=text`;
    console.log(url);
    // , { headers: {'User-Agent': 'Bongari-App (itjonne@gmail.com) axios'}}
    try {
      const response = await axios.get(
        url, { headers: { 'User-Agent': 'Bongari-App (itjonne@gmail.com) axios' } });
      return response.data.parse.text['*'];
    } catch (error) {
      console.log('error', error.status);
      return null;
    }
  };

  const response = await getTitle(title);
  return response ? res.status(200).json(response) : res.status(400).json(
    { error: 'problems with wikipedia' });
});

// Täältä muokattu: https://www.mediawiki.org/wiki/API:Picture_of_the_day_viewer
objectsRouter.get('/wikipedia-image/:name', async (req, res) => {
  const apiUrl = 'https://fi.wikipedia.org/w/api.php';
  const title = req.params.name;

  const getTitleImageSrc = async (filename) => {
    const config = {
      action: 'query',
      format: 'json',
      prop: 'imageinfo',
      iiprop: 'url',
      titles: filename,
    };

    let url = `${apiUrl}`;
    // TODO: Onko kauniimpi tapa? Ekaan kysymysmerkki loppuihin &
    Object.keys(config).forEach(
      (key, i) => { url += `${i === 0 ? '?' : '&'}${key}=${config[key]}`; });

    try {
      const response = await axios.get(
        url, { headers: { 'User-Agent': 'Bongari-App (itjonne@gmail.com) axios' } });
      // const thumbnail = response.data.query.pages[0].thumbnail.source
      // ? response.data.query.pages[0].thumbnail.source : null;

      if (response.data.query.pages) {
        const key = Object.keys(response.data.query.pages)[0];
        console.log('key found', key);
        return response.data.query.pages[key].imageinfo[0].url;
      }
      return null;
    } catch (error) {
      console.log('error', error.status);
      return null;
    }
  };

  const getTitleImage = async (name) => {
    console.log('title', name);
    if (!name || typeof (name) !== 'string') return null;
    const config = {
      action: 'query',
      prop: 'images',
      titles: encodeURI(name),
      format: 'json',
    };

    let url = `${apiUrl}`;
    // TODO: Onko kauniimpi tapa? Ekaan kysymysmerkki loppuihin &
    Object.keys(config).forEach(
      (key, i) => { url += `${i === 0 ? '?' : '&'}${key}=${config[key]}`; });
    // const simpleUrl = `https://fi.wikipedia.org/w/api.php?action=parse&page=${encodeURI(name)}&prop=text`;
    console.log(url);
    // , { headers: {'User-Agent': 'Bongari-App (itjonne@gmail.com) axios'}}

    try {
      const response = await axios.get(
      url, { headers: { 'User-Agent': 'Bongari-App (itjonne@gmail.com) axios' } });
      // const thumbnail = response.data.query.pages[0].thumbnail.source
      // ? response.data.query.pages[0].thumbnail.source : null;
      if (response.data.query.pages) {
        const key = Object.keys(response.data.query.pages)[0];
        const realImages = [];

        const imageLoopFunction = (value, index, array) => {
          if (!value.title.includes('logo') && !value.title.includes('svg')) {
            console.log(value.title);
            realImages.push(value);
          }
        };

        response.data.query.pages[key].images.forEach(imageLoopFunction);

        console.log('realimages', realImages);
        return realImages;
      }
      return null;
    } catch (error) {
      console.log('error', error.status);
      return null;
    }
  };
  const filenames = await getTitleImage(title);
  const images = [];

  const filenameFunction = async (value, index, array) => {
    const src = await getTitleImageSrc(value.title);
    if (src) images.push(src);
  };

  filenames.forEach(filenameFunction);
  // const src = await getTitleImageSrc(filename.title);
  return res.status(200).json(images);
  // action=query&titles=Al-Farabi&prop=pageimages&format=json&pithumbsize=100
});

*/

module.exports = objectsRouter;
