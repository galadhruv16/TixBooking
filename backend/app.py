from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Database connection
def create_connection():
    try:
        print("Attempting to connect to the database...")
        connection = mysql.connector.connect(
            host="localhost",  # Use '127.0.0.1' if 'localhost' causes issues
            user="root",
            password="mySQL@1611",
            database="TixBooking",
            connection_timeout=10  # Add a timeout to avoid hanging
        )
        if connection.is_connected():
            print("Connected to MySQL Server")
            return connection
    except Error as e:
        print(f"Database connection error: {e}")
        return None
    except Exception as e:
        print(f"Unexpected error: {e}")
        return None

# API endpoint to store billing data
@app.route('/api/save-billing', methods=['POST'])
def save_billing():
    print("Received a request to save billing data...")
    print(f"Request headers: {request.headers}")
    print(f"Request body: {request.json}")

    # Assign request.json to data
    data = request.json

    # Check if all required fields are present in the request
    required_fields = ['name', 'email', 'phone', 'movie', 'theatre', 'seats', 'total_price']
    for field in required_fields:
        if field not in data:
            print(f"Missing field in request: {field}")
            return jsonify({"error": f"Missing field: {field}"}), 400

    connection = create_connection()
    if connection is None:
        print("Failed to connect to the database.")
        return jsonify({"error": "Database connection failed"}), 500

    try:
        cursor = connection.cursor()
        query = """
            INSERT INTO BillingDetails (name, email, phone, movie, theatre, seats, total_price)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        # Debugging: Log the query and data being inserted
        print("Executing query...")
        print(f"Query: {query}")
        print(f"Data: {data['name']}, {data['email']}, {data['phone']}, {data['movie']}, {data['theatre']}, {', '.join(data['seats'])}, {data['total_price']}")

        cursor.execute(query, (
            data['name'],
            data['email'],
            data['phone'],
            data['movie'],
            data['theatre'],
            ', '.join(data['seats']),
            data['total_price']
        ))
        connection.commit()
        print("Data inserted successfully into the database.")
        return jsonify({"message": "Billing data saved successfully"}), 201
    except Error as e:
        print(f"Error while inserting data: {e}")
        return jsonify({"error": "Failed to save billing data"}), 500
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("Database connection closed.")

if __name__ == '__main__':
    print("Starting Flask server...")
    app.run(debug=True, host='127.0.0.1', port=5000)