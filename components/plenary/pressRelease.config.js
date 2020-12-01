const faker = require('faker');

const pressReleasesCount = 32;
const pressReleasesData = [];

for (var i = 0; i < pressReleasesCount; i++) {
  pressReleasesData.push({
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
    title: "Press releases",
    intro: "​The plenary assembly will discuss and vote​​ on the opinions listed here below.",
    pressReleases: pressReleasesData
  }
};