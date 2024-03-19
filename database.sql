CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    street_address VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    zip_code BIGINT NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_type VARCHAR(255) NOT NULL DEFAULT 'Customer'
);

CREATE TABLE cart (
    id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name_of_product VARCHAR(255) NOT NULL,
    image BIGINT NOT NULL,
    price BIGINT NOT NULL
);

CREATE TABLE sizes (
    id SERIAL PRIMARY KEY,
    size VARCHAR(255) NOT NULL
);

CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY,
    cart_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity BIGINT NOT NULL,
    size_id BIGINT NOT NULL,
    FOREIGN KEY (cart_id) REFERENCES cart(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (size_id) REFERENCES sizes(id)
);

CREATE TABLE past_purchases (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    size_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    customer_id BIGINT NOT NULL,
    price_paid BIGINT NOT NULL,
    FOREIGN KEY (size_id) REFERENCES sizes(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (customer_id) REFERENCES users(id)
);

CREATE TABLE picture_gallery (
    id SERIAL PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    caption VARCHAR(255) NOT NULL,
    customer_id BIGINT NOT NULL,
    approved BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (customer_id) REFERENCES users(id)
);

CREATE TABLE dad_quotes (
    id SERIAL PRIMARY KEY,
    quote VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL
);
