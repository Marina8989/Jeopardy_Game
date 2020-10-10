const BASE_API_URL = "https://jservice.io/api/";
const NUM_CATEGORIES = 6;
const NUM_CLUES_PER_CAT = 5;

let categories = [];

async function getCategoryIds() {
  let response = await axios.get(`$${BASE_API_URL}categories?count=100`);
  let catIds =response.data.map(c => c.id);
  return _.sampleSize(catId, NUM_CATEGORIES);
}

async function getCategory(catId) {
  let response = await axios.get(`${BASE_API_URL}category?id=${catId}`);
  let cat = response.data;
  let allClues = cat.clues;
  let randomClues = _.sampleSize(allClues, NUM_CLUES_PER_CAT);
  let clues = randomClues.map(c => ({
      question: c.question,
      answer: c.answer,
      showing: null,
  }));
    return { title: cat.title, clues};
}