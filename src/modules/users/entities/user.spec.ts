import {User} from './user.entity';

describe("Class User entity", () => {
  it("should make a cat with no fields", () => {
    const user = new User();
    expect(user).toBeTruthy();
    expect(user.email).toBe(undefined);
    expect(user.names).toBe(undefined);
    expect(user.id).toBe(undefined);
  });
})