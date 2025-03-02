const request = require("supertest");
const app = require("../server"); // Import your Express app
const User = require("../models/UserModel");

describe("Auth Routes", () => {
    beforeAll(async () => {
        // Clear the users collection before running tests
        await User.deleteMany({});
    });

    it("should register a new user", async () => {
        const res = await request(app)
            .post("/api/auth/register")
            .send({
                username: "testuser",
                email: "test@example.com",
                password: "password123",
                role: "regular",
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toEqual("User registered successfully");
    });

    it("should log in an existing user", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email: "test@example.com",
                password: "password123",
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.token).toBeDefined();
    });

    it("should not log in with invalid credentials", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email: "test@example.com",
                password: "wrongpassword",
            });

        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toEqual("Invalid credentials");
    });
});