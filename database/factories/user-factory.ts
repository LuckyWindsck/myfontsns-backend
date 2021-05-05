import faker = require('faker')

class UserFactory {
  name: string;

  screenName: string;

  email: string;

  password: string;

  createdAt: Date;

  updatedAt: Date;

  constructor() {
    this.name = faker.random.alphaNumeric(15);
    this.screenName = faker.internet.userName();
    this.email = faker.internet.email();
    this.password = faker.internet.password();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static count(count: number) {
    return Array(count).fill(null).map(() => new UserFactory());
  }
}

export default UserFactory;
