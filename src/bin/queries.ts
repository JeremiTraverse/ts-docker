import db from "../database";

export async function getUser(email : String) {
  try {
    const user = await db.User.findOne({where : {email : email}});
    return user;
  } catch(err) {
    return err;
  }
}
