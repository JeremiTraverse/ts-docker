import db from "../database";

beforeAll(async () => {
    await db.sequelize.sync();
});

test('create person', async () => {
    expect.assertions(1);
    const person = await db.User.create({
        id: 1,
        name: 'Bobbie',
        email: 'bobbie@bobbie.com',
        password: "testestestest"
    });
    expect(person.id).toEqual(1);
    
});

