const faker = require('faker');

const opinionsCount = 32;
const opinionsData = [];

for (var i = 0; i < opinionsCount; i++) {
  opinionsData.push({
    picture: `https://fakeface.rest/face/view/${i}?minimum_age=25`,
    title: faker.lorem.sentence(),
    name: faker.name.findName(),
    country: faker.address.country(),
    group: faker.company.companyName(),
    role: "Rapporteur"
  });
}

module.exports = {
  context: {
    title: "Opinions",
    intro: "​The plenary assembly will discuss and vote​​ on the opinions listed here below.",
    opinions: opinionsData
  }
};