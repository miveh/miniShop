🛒 OOP Shopping Cart Project
A robust E-commerce shopping cart implementation using TypeScript, Next(App router), and Object-Oriented Programming (OOP) principles.

🚀 Getting Started
This project uses Yarn as the package manager. Follow these steps to run the project locally.

Prerequisites
Ensure you have Node.js installed on your machine.

````Installation
Clone the repository:

> > git clone https://github.com/your-username/your-repo-name.git
> > cd your-repo-name```

Install dependencies:

```> > yarn install```

Running the App
Start the development server:

```> > yarn dev```

# or, depending on your setup:

yarn start
Open http://localhost:3000 to view it in the browser.

Building for Production
To create a production-ready build:

```> > yarn build```

Domain Layer (OOP):
Classes (Cart, CartItem) handle the "rules" of the application.
They use efficient data structures (Map) for performance.

UI Layer (React): MUI
State Management: RTK
📚 Class Documentation

1. Product
   A data transfer object (DTO) representing a product available in the store.

Purpose: Holds static information about items fetched from the API/Database.
Fields: id, title, price, description, category, image. 2. CartItem
Represents a single line item inside the shopping cart.

Purpose: Manages the specific quantity and subtotal of a specific product. 3. Cart
The main manager class acting as the "Single Source of Truth" for the shopping session.

Data Structure: Uses a Map<number, CartItem> instead of an Array. This allows for O(1) (instant) lookups when checking if an item already exists, rather than looping through an array.
🛠 Technologies
Language: TypeScript
Framework: Next
State Management: (Redux Toolkit / Context API - Edit based on your usage)
Package Manager: Yarn
Styling: (MUI / Tailwind / CSS - Edit based on your usage)
````
