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

function deleteMember(member_id) {
    Postgres.query("DELETE FROM members WHERE member_id=$1", [member_id])
}

module.exports = { getMembers, createMember, deleteMember }

