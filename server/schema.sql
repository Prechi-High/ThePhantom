-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- USER TYPES & ROLES
CREATE TYPE user_role AS ENUM ('PLAYER', 'MANAGER', 'ADMIN', 'SUPER_ADMIN', 'BOT');
CREATE TYPE auth_mode AS ENUM ('BROWSER', 'TELEGRAM');
CREATE TYPE account_status AS ENUM ('ACTIVE', 'SUSPENDED', 'BANNED', 'PENDING');

-- USERS TABLE
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    telegram_id BIGINT UNIQUE,
    username VARCHAR(255) UNIQUE,
    display_name VARCHAR(255),
    avatar_url TEXT,
    phone_number VARCHAR(20),
    email VARCHAR(255) UNIQUE,
    auth_provider VARCHAR(50) DEFAULT 'credentials',
    auth_mode auth_mode DEFAULT 'BROWSER',
    password_hash TEXT,
    telegram_init_hash TEXT,
    referral_code VARCHAR(50) UNIQUE,
    referred_by_user_id INTEGER REFERENCES users(id),
    current_camp_id INTEGER, -- Circular ref handled later
    current_squad_id INTEGER,
    active_session_id INTEGER,
    membership_tier VARCHAR(50) DEFAULT 'PHANTOM_FREE',
    wallet_balance DECIMAL(18, 2) DEFAULT 0.00,
    total_won DECIMAL(18, 2) DEFAULT 0.00,
    total_lost DECIMAL(18, 2) DEFAULT 0.00,
    total_sessions INTEGER DEFAULT 0,
    best_finish INTEGER,
    reputation_score INTEGER DEFAULT 0,
    rivalry_score INTEGER DEFAULT 0,
    resurrection_score INTEGER DEFAULT 0,
    risk_score INTEGER DEFAULT 0,
    account_status account_status DEFAULT 'ACTIVE',
    is_manager BOOLEAN DEFAULT FALSE,
    is_admin BOOLEAN DEFAULT FALSE,
    is_bot BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP WITH TIME ZONE
);

-- CAMPS TABLE
CREATE TABLE camps (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    manager_user_id INTEGER NOT NULL REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    logo_url TEXT,
    banner_url TEXT,
    description TEXT,
    telegram_channel_id BIGINT,
    telegram_group_id BIGINT,
    telegram_bot_id BIGINT,
    subscriber_count INTEGER DEFAULT 0,
    reputation_score INTEGER DEFAULT 0,
    activity_score INTEGER DEFAULT 0,
    loyalty_score INTEGER DEFAULT 0,
    total_members INTEGER DEFAULT 0,
    total_session_entries INTEGER DEFAULT 0,
    total_revenue DECIMAL(18, 2) DEFAULT 0.00,
    total_resurrections INTEGER DEFAULT 0,
    camp_rank INTEGER,
    rivalry_index INTEGER DEFAULT 0,
    approval_status VARCHAR(50) DEFAULT 'PENDING',
    verification_status BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ADD FOREIGN KEY TO USERS FOR CAMPS
ALTER TABLE users ADD CONSTRAINT fk_user_camp FOREIGN KEY (current_camp_id) REFERENCES camps(id);

-- SESSIONS TABLE
CREATE TYPE session_status AS ENUM ('REGISTRATION', 'LOBBY', 'ACTIVE', 'COMPLETED', 'CANCELLED');
CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    session_type VARCHAR(50) NOT NULL, -- 'Morning Grind', 'Rush Hour', 'Death Hour'
    entry_fee DECIMAL(18, 2) DEFAULT 0.00,
    max_players INTEGER NOT NULL,
    current_players INTEGER DEFAULT 0,
    round_count INTEGER DEFAULT 0,
    status session_status DEFAULT 'REGISTRATION',
    start_time TIMESTAMP WITH TIME ZONE,
    end_time TIMESTAMP WITH TIME ZONE,
    registration_open_at TIMESTAMP WITH TIME ZONE,
    registration_close_at TIMESTAMP WITH TIME ZONE,
    resurrection_enabled BOOLEAN DEFAULT TRUE,
    spectator_enabled BOOLEAN DEFAULT TRUE,
    bot_fill_enabled BOOLEAN DEFAULT TRUE,
    created_by_admin_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- SQUADS TABLE
CREATE TABLE squads (
    id SERIAL PRIMARY KEY,
    session_id INTEGER NOT NULL REFERENCES sessions(id),
    squad_code VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- RIVALRIES TABLE
CREATE TABLE rivalries (
    id SERIAL PRIMARY KEY,
    player_one_id INTEGER NOT NULL REFERENCES users(id),
    player_two_id INTEGER NOT NULL REFERENCES users(id),
    camp_one_id INTEGER REFERENCES camps(id),
    camp_two_id INTEGER REFERENCES camps(id),
    rivalry_score INTEGER DEFAULT 0,
    steals_count INTEGER DEFAULT 0,
    eliminations_count INTEGER DEFAULT 0,
    revenge_count INTEGER DEFAULT 0,
    last_encounter_session_id INTEGER REFERENCES sessions(id),
    active_status BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(player_one_id, player_two_id)
);

-- TRANSACTIONS TABLE
CREATE TYPE transaction_type AS ENUM ('DEPOSIT', 'WITHDRAWAL', 'ENTRY_FEE', 'REWARD', 'COMMISSION', 'RESURRECTION');
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    transaction_type transaction_type NOT NULL,
    amount DECIMAL(18, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'COMPLETED',
    payment_provider VARCHAR(50),
    metadata_json JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- AUDIT LOGS
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    actor_user_id INTEGER REFERENCES users(id),
    actor_type VARCHAR(50),
    action_type VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id INTEGER,
    old_values_json JSONB,
    new_values_json JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- INDEXING STRATEGY
CREATE INDEX idx_users_telegram_id ON users(telegram_id);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_sessions_status ON sessions(status);
CREATE INDEX idx_rivalries_players ON rivalries(player_one_id, player_two_id);
CREATE INDEX idx_transactions_user ON transactions(user_id);
CREATE INDEX idx_audit_entity ON audit_logs(entity_type, entity_id);
