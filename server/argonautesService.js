const { Pool } = require("pg");
const path = require('path');

// Dotenv
const dotenv = require("dotenv");
dotenv.config({ path: './config.env' });

const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });

async function getMembers() {
    return await Postgres.query("SELECT * FROM members");
}

async function createMember(name) {
    await Postgres.query("INSERT INTO members (name) VALUES ($1)", [name])
}

async function deleteMember(member_id) {
    await Postgres.query("DELETE FROM members WHERE member_id=$1", [member_id])
}

module.exports = { getMembers, createMember, deleteMember }

