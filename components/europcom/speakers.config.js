const faker = require('faker');
const speakersCount = 32;
const speakersData = [];

for (var i = 0; i < speakersCount; i++) {
  speakersData.push({
    name: faker.name.findName(),
    picture: faker.image.nature(),
    jobTitle: faker.name.jobTitle(),
    company: faker.company.companyName(),
    bio: faker.lorem.paragraphs()
  });
}

module.exports = {
  preview: "@europcompreview",
  context: {
    speakers: speakersData
  }
};