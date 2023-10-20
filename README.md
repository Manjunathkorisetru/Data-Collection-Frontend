# Data-Collection-Frontend

A Web App that is used for data collection from multiple users. This app will be used for image data collection to be formed as a dataset at the end. 
Each uploaded image contains a few features that will be annotated on the image.

## Features Implemented
- The main dashboard that represents a summary and statistics of the uploaded data records.
- The dashboard page provides the feature of downloading the collected datasets. Each user can download his/her own data. System admin can download individual data sets of all the users indvidually and also all together.
- The Upload page ( a CRUD page ) which provides the functionality of uploading the images and annotating the specified features for each. It also provides the preview of the images and their features.
- A login page that asks for authentication
- The user profile, which summarize the information of the user as well as the role of the user. The user information can also be updated
- A Search field in the Dashboard to filter data sets by text features
- The web app is responsive across four breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)

 

## Technologies Used

- **Frontend:** React.js, TypeScript, HTML, CSS, TailwindCSS
- **Backend:** Node.js, Express.js, Mongoose
- **Database:** MongoDB Cloud (https://cloud.mongodb.com/)
- **Build Tools:** Vite
- **Package Manager:** npm
- **Version Control:** Git, GitHub


## Prerequisites

Before you begin, ensure you have Node.js and npm (Node Package Manager) installed on your system. You can download and install them from [nodejs.org](https://nodejs.org/).

## Getting Started

1. Clone this repository to your local machine using `https://github.com/Manjunathkorisetru/Data-Collection-Frontend.git`.

2. Navigate to the project directory using the terminal or command prompt.

```bash
cd Data-Collection-Frontend
```


1. Install dependencies using npm

```bash
npm install
```

## Developement Server
To start the development server. run the following command

```bash
npm run dev
```

This will start the development server, and your React application will be accessible at http://localhost:5173 (if the 5173 port is available).


