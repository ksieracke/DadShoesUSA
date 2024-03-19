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

INSERT INTO Dad_Quotes (QUOTE) VALUES
('Anybody can be a father, but it takes someone special to be a dad. -Wade Boggs'),
('The quality of a father can be seen in the goals, dreams, and aspirations he sets not only for himself but for his family. -Reed Markham'),
('Being a father means you have to think fast on your feet. You must be judicious, wise, brave, tender, and willing to put on a frilly hat and sit down to a pretend tea party. -Matthew Buckley'),
('The best way of training the young is to train yourself at the same time; not to admonish them, but to be never seen doing that of which you would admonish them. -Plato'),
('A truly rich man is one whose children run into his arms when his hands are empty. -Unknown'),
('Each day of our lives, we make deposits in the memory banks of our children. -Charles R. Swindoll'),
('Anyone who tells you fatherhood is the greatest thing that can happen to you; they are understating it. -Mike Myers'),
('My father gave me the greatest gift anyone could give another person. He believed in me. -Jim Valvano'),
('Every father should remember one day his son will follow his example, not his advice. -Charles Kettering'),
('My father didn''t tell me how to live. He lived and let me watch him do it. -Clarence Budington Kelland'),
('A child looks up at the stars and wonders. Great fathers put a child on his shoulders and help them to grab a star. -Reed Markham'),
('But there''s no substitute for a full-time dad. Dads who are fully engaged with their kids overwhelmingly tend to produce children who believe in themselves and live full lives. -Tony Dungy'),
('A dad is someone who wants to catch you before you fall but instead picks you up, brushes you off, and lets you try again. -Unknown'),
('Fatherhood is the greatest thing that could ever happen. You can’t explain it until it happens; it’s like telling somebody what water feels like before they’ve ever swam in it. -Michael Bublé'),
('Of all the titles I’ve been privileged to have, ‘Dad’ has always been the best. -Ken Norton'),
('Never is a man more of a man than when he is the father of a newborn. -Matthew McConaughey'),
('A father is neither an anchor to hold us back nor a sail to take us there, but a guiding light whose love shows us the way. -Unknown'),
('Fathering is not something perfect men do, but something that perfects the man. -Frank Pittman'),
('One of the greatest titles in the world is parent, and one of the biggest blessings in the world is to be one. -Jim DeMint');

