const fs = require("fs").promises;
const path = require("path");

const usersFilePath = path.join(__dirname, "users.json");

const UserSchema = {
  id: "string",
  username: "string",
  duckyRank: "string",
  favoriteLanguage: "string",
  quackPoints: "number",
  lastAnsweredQuestion: "number",
};

function validateUserData(userData) {
  for (const key in UserSchema) {
    const expectedType = UserSchema[key];
    const actualType = typeof userData[key];

    if (expectedType === "number" && userData[key] === undefined) {
      userData[key] = 0;
    } else if (expectedType === "string" && userData[key] === undefined) {
      userData[key] = null;
    }

    if (actualType !== expectedType && userData[key] !== null) {
      throw new Error(
        `Invalid type for ${key}: expected ${expectedType}, got ${actualType}`,
      );
    }
  }
}

async function readUsers() {
  try {
    const data = await fs.readFile(usersFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw error;
  }
}

async function writeUsers(users) {
  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
}

async function getUserModel() {
  const users = await readUsers();

  return {
    findOne: async ({ where }) => {
      return users[where.id] || null;
    },
    save: async (user) => {
      validateUserData(user);
      users[user.id] = user;
      await writeUsers(users);
    },
    addSchema: async (name, schema) => {
      return {
        findOne: async ({ where }) => {
          return users[where.id] || null;
        },
        save: async (user) => {
          validateUserData(user);
          users[user.id] = user;
          await writeUsers(users);
        },
      };
    },
  };
}

module.exports = getUserModel;
