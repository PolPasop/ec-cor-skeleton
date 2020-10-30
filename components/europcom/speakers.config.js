const faker = require('faker');
const speakersCount = 32;
const speakersData = [];

for (var i = 0; i < speakersCount; i++) {
  speakersData.push({
    name: faker.name.findName(),
    picture: faker.image.nature(),
    jobTitle: faker.name.jobTitle(),
    company: faker.company.companyName()
  });
}

module.exports = {
  context: {
    speakers: speakersData
  }
};