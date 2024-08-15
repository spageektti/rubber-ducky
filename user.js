async function getUserModel() {
  const { Client, Schema } = await import("replit-database");

  const db = new Client();

  const UserSchema = new Schema({
    id: {
      type: "string",
      required: true,
    },
    username: {
      type: "string",
      required: true,
    },
    duckyRank: "string",
    favoriteLanguage: "string",
    quackPoints: {
      type: "number",
      default: 0,
    },
  });

  return db.addSchema("user", UserSchema);
}

module.exports = getUserModel;
