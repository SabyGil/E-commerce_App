const fs = require('fs');
class UsersRepository {
  constructor(filename) {
    if (!filename) {
      throw new Error('Creating a repository requires a filename');
    }
    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, '[]');
    }
  }

  async getAll() {
    // open the file called this.filename
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: 'utf8',
      })
    );
  }

  async create(attrs) {
    // obj that will potentially have an email or pass key val pair
    const records = await this.getAll();
    records.push(attrs);
    // write the updated 'records'
    await fs.promises.writeFile(this.filename, JSON.stringify(records));
  }
}

/*
    1. You are not allowed to have async code inside a constructor, why not?
    2. what does accessSync do?
    3. 

    sync seems to makes the code stop & wait for a function to complete
*/
const test = async () => {
  const repo = new UsersRepository('users.json');
  await repo.create({ email: 'test@test.com', password: 'password' });
  const users = await repo.getAll();
  console.log(users);
};

test();
