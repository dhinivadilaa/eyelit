-- EYELIT DATABASE FIX VERSION

SET FOREIGN_KEY_CHECKS=0;

CREATE DATABASE IF NOT EXISTS eyelit;
USE eyelit;

-- ======================
-- USERS (WAJIB ADA)
-- ======================
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);

-- ======================
-- CATEGORIES
-- ======================
CREATE TABLE categories (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);

-- ======================
-- PRODUCTS
-- ======================
CREATE TABLE products (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(255),
    stock INT DEFAULT 0,
    category_id BIGINT UNSIGNED NOT NULL,
    gender VARCHAR(255),
    color VARCHAR(255),
    material VARCHAR(255),
    shape VARCHAR(255),
    specifications JSON,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- ======================
-- CARTS
-- ======================
CREATE TABLE carts (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    product_id BIGINT UNSIGNED NOT NULL,
    quantity INT DEFAULT 1,
    lens_details JSON,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- ======================
-- ORDERS
-- ======================
CREATE TABLE orders (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(255) NOT NULL UNIQUE,
    user_id BIGINT UNSIGNED NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    status VARCHAR(255) DEFAULT 'waiting',
    shipping_address TEXT NOT NULL,
    shipping_method VARCHAR(255),
    payment_method VARCHAR(255),
    payment_status VARCHAR(255) DEFAULT 'pending',
    paid_at TIMESTAMP NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ======================
-- ORDER ITEMS
-- ======================
CREATE TABLE order_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT UNSIGNED NOT NULL,
    product_id BIGINT UNSIGNED NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    lens_details JSON,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- ======================
-- ADDRESSES
-- ======================
CREATE TABLE addresses (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    label VARCHAR(255) DEFAULT 'Home',
    address TEXT NOT NULL,
    city VARCHAR(255) NOT NULL,
    province VARCHAR(255) NOT NULL,
    postal_code VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ======================
-- SAMPLE DATA
-- ======================

INSERT INTO users (name, email, password, created_at) VALUES
('User Demo', 'user@test.com', '123456', NOW());

INSERT INTO categories (name, slug, description, created_at) VALUES
('Sunglasses', 'sunglasses', 'Protective eyewear', NOW()),
('Eyeglasses', 'eyeglasses', 'Corrective eyewear', NOW());

INSERT INTO products (name, brand, description, price, stock, category_id, gender, color, material, shape, specifications, created_at) VALUES
('Classic Aviator', 'Ray-Ban', 'Timeless aviator sunglasses', 250000.00, 10, 1, 'Unisex', 'Gold', 'Metal', 'Aviator', '{"bridge": "14mm"}', NOW()),
('Round Glasses', 'Warby Parker', 'Modern round eyeglasses', 180000.00, 5, 2, 'Unisex', 'Black', 'Acetate', 'Round', '{"bridge": "18mm"}', NOW());



ALTER TABLE users 
ADD email_verified_at TIMESTAMP NULL,
ADD remember_token VARCHAR(100) NULL,
ADD two_factor_secret TEXT NULL,
ADD two_factor_recovery_codes TEXT NULL,
ADD two_factor_confirmed_at TIMESTAMP NULL;
SET FOREIGN_KEY_CHECKS=1;