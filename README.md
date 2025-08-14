# Ampd Energy - Savings Dashboard

This project is a full-stack web application created for a take-home coding exercise. It features a Node.js backend API that serves aggregated energy savings data from a CSV file, and a modern, responsive frontend dashboard to visualize this data. The entire application is containerized with Docker for seamless setup and deployment on any Mac OS or Linux system.



---

## ✨ Features

-   **Interactive Dashboard**: A sleek, modern UI with animated cards and a dynamic chart to visualize carbon and diesel savings.
-   **Dynamic Date Filtering**: Users can filter the data by selecting a date range or using quick-filter buttons (30d, 60d, 1y).
-   **RESTful API**: A robust backend built with Node.js and Express that processes raw CSV data and serves it through a clean API endpoint.
-   **Dockerized Environment**: The entire application (backend and frontend) is containerized using Docker and Docker Compose, ensuring it runs identically on any machine with a single command.
-   **Cross-Platform Compatibility**: Guaranteed to run on Mac OS and Linux environments as required.

---

## 🛠️ Tech Stack

-   **Backend**: Node.js (v18.19.0), Express.js, CORS, CSV-Parser
-   **Frontend**: HTML5, CSS3 (with custom properties for theming), JavaScript (ES6+), Chart.js, Feather Icons
-   **Deployment**: Docker, Docker Compose, Nginx (for serving the frontend)

---

## 🚀 Getting Started

Follow these instructions to get the application up and running on your local machine.

### Prerequisites

-   **Docker Desktop**: Make sure Docker is installed and running on your system. You can download it from the [official Docker website](https://www.docker.com/products/docker-desktop/).
-   **Git**: Required to clone the repository.

### Installation & Launch

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/624deba7-9ba0-4204-8123-2ba4e009bda5.git](https://github.com/YOUR_USERNAME/624deba7-9ba0-4204-8123-2ba4e009bda5.git)
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd 624deba7-9ba0-4204-8123-2ba4e009bda5
    ```

3.  **Run the application with a single command:**
    ```bash
    docker-compose up --build
    ```
    This command will build the backend image, pull the Nginx image, and start both containers.

4.  **View the application:**
    Once the build is complete and the containers are running, open your web browser and navigate to:
    **`http://localhost:8080`**

---

## 📝 API Endpoint

The backend provides one main API endpoint to fetch the savings data.

-   **URL**: `/api/device-savings`
-   **Method**: `GET`
-   **Query Parameters**:
    -   `startDate` (required): The start of the date range in `YYYY-MM-DD` format.
    -   `endDate` (required): The end of the date range in `YYYY-MM-DD` format.
-   **Example Request**:
    ```
    http://localhost:3000/api/device-savings?startDate=2023-01-01&endDate=2023-12-31
    ```
-   **Success Response (200 OK)**:
    ```json
    {
      "summary": {
        "totalCarbonTonnes": 64.1,
        "totalDieselLitres": 43840.3,
        "monthlyAvgCarbonTonnes": 5.3,
        "monthlyAvgDieselLitres": 3653.4
      },
      "chartData": [
        {
          "month": "2023-09",
          "carbonSavings": 4500.5,
          "dieselSavings": 3200.1
        }
      ]
    }
    ```
