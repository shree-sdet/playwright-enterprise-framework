import { test, expect } from '../../fixtures/baseFixture';
 
const timestamp = Date.now();

const dynamicName =`User_${timestamp}`;
const dynamicEmail = `user_${timestamp}@test.com`;

test('Validate user from database @api @smoke', async ({ dbClient }) => {
    const user = await dbClient.getUserById(1);
    console.log(user);
    expect(user.name).toBe('Shree');

});

test('Create and cleanup DB user @db', async ({ dbClient }) => {
    // CREATE USER
    const createdUser = await dbClient.createUser(dynamicName, dynamicEmail);
    console.log(createdUser);
    expect(createdUser.name).toBe(dynamicName);

    // VALIDATE USER EXISTS
    const fetchedUser = await dbClient.getUserById(createdUser.id);
    expect(fetchedUser.email).toBe(dynamicEmail);

    // CLEANUP
    await dbClient.deleteUser(createdUser.id);
});

test('Transaction rollback example',async ({ dbClient }) => {

    // START TRANSACTION
    await dbClient.beginTransaction();

    // CREATE USER
    const createdUser = await dbClient.createUser(dynamicName, dynamicEmail);

    // VALIDATE USER EXISTS
    await dbClient.getUserById(createdUser.id); 
    expect(createdUser.email).toBe(dynamicEmail);

    // ROLLBACK EVERYTHING
    await dbClient.rollbackTransaction();
});