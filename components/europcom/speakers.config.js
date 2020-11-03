const faker = require('faker');

const speakersCount = 32;
const speakersData = [];

for (var i = 0; i < speakersCount; i++) {
  speakersData.push({
    name: faker.name.findName(),
    picture: `https://fakeface.rest/face/view/${i}?minimum_age=25`,
    jobTitle: faker.name.jobTitle(),
    company: faker.company.companyName(),
    bio: faker.lorem.paragraphs(),
    role: "Speaker"
  });
}

module.exports = {
  preview: "@europcompreview",
  context: {
    speakers: speakersData
  }
};