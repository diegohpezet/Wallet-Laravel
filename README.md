# Wallet

This is a digital wallet application built using Laravel. It allows users to simulate handling transactions between accounts. **Please note that all funds are fake and cannot be used in real-world transactions**. The purpose of this project is to demonstrate and simulate a real-world e-wallet system.

## Features

- **User Accounts**: Create and manage user profiles.
- **Transactions**: Simulate sending and receiving funds between users.
- **Transaction History**: View past transactions.
- **Balance Management**: Monitor the balance of the wallet for each user.

## Installation
### Prerequisites

Before starting, ensure that you have the following installed:

- PHP >= 8.0
- Composer
- Node.js and npm
- MySQL or another compatible database

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/diegohpezet/Wallet-Laravel.git
    ```
2. Install PHP dependencies:
    ```bash
    composer install
    ```
3. Install JavaScript dependencies:
    ```bash
    npm install
    ```
4. Set up your environment file:
    Copy the `.env.example` file to `.env`:
    ```bash
    cp .env.example .env
    ```
    Then, update the `.env` file with your database and other environment configurations.
5. Generate the application key:
    ```bash
    php artisan key:generate
    ```

## Running the Application

To start the development server:

```bash
php artisan serve
```

## Database

To set up the database with default sample data, run the following commands:

1. Run migrations:
    ```bash
    php artisan migrate
    ```
2. Seed the database:
    ```bash
    php artisan db:seed
    ```
  
## License

This project is licensed under the MIT License. See LICENSE file for details.

