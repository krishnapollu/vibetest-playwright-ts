import fs from 'fs';
import path from 'path';
import faker from 'faker';

export class TestData {
  static loadJson(fileName: string) {
    const filePath = path.join(__dirname, '../data', fileName);
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  static fakeUser() {
    return {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      address: faker.address.streetAddress(),
      phone: faker.phone.phoneNumber()
    };
  }
} 