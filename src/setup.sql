CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, user_type VARCHAR(20), description TEXT, business_name VARCHAR(50), location VARCHAR(50), first_name VARCHAR(50), last_name VARCHAR(50), email VARCHAR(50), created_at TIMESTAMP, updated_at TIMESTAMP);

CREATE TABLE IF NOT EXISTS loans(id SERIAL PRIMARY KEY, uuid uuid DEFAULT uuid_generate_v4(), user_id BIGINT references users(id), amount INTEGER, purpose TEXT, term_length INTEGER, term_rate DECIMAL, created_at TIMESTAMP, updated_at TIMESTAMP);

CREATE TABLE IF NOT EXISTS savings_accounts(id SERIAL PRIMARY KEY, uuid uuid DEFAULT uuid_generate_v4(), user_id BIGINT references users(id), loan_id BIGINT references loans(id), amount INTEGER, term_length INTEGER, term_rate DECIMAL, created_at TIMESTAMP, updated_at TIMESTAMP); 