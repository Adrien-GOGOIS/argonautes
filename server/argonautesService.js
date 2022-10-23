const { Pool } = require("pg");
const path = require('path');

// Dotenv
const dotenv = require("dotenv");
dotenv.config({ path: './config.env' });

const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });

function getMembers() {
    return Postgres.query("SELECT * FROM members");
}

function createMember(name) {
    Postgres.query("INSERT INTO members (name) VALUES ($1)", [name])
}

module.exports = { getMembers, createMember }

