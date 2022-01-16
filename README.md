# Project Phobos

The **main goal** of Project Phobos is to **help you organize and search for specific passages through your documents**.

The user can upload the desired documents and use a search bar to seek specific terms across all files, without having the pain to open each file individually and search manually.

<div align="center"><a href="https://www.youtube.com/watch?v=d-cIFKLLPqE" target="_blank"><strong>BRIEF VIDEO REVIEW</strong></a></div>

## Tech Stack

- ⚡️ ReactJS for the frontend
- ⌘ Axios for data fetching
- ✨ ExpressJS for the HTTP Server and the REST apis
- 🐘 PostgreSQL as the main database (there's also another branch using MySQL)

<br />

## Use case

### Without Phobos

Let's say you have several math books to study this semester, and you want to review one specific topic from all those books:
<p align="center">
  <img src="https://user-images.githubusercontent.com/50183633/146289893-2ef568eb-d1d4-46c6-bed7-398163e7645a.png" alt="A set of math books">
</p>
Following the traditional approach, you would have to open all the PDFs and search the topic manually.

### Phobos to the rescue!

Using Phobos, you only have to upload the files and type the term in one single place (the search bar), and it will get back to you all the pages related to the desired content:
<p align="center">
  <img width="600" src="https://user-images.githubusercontent.com/50183633/146299748-5c3f60f8-a0c5-42ee-8f9e-ca915561e482.png" alt="Phobos upload content">
</p>

<p align="center">
  <img width="600" src="https://user-images.githubusercontent.com/50183633/146294704-52f269b0-7db3-4956-b683-6235d5d4ada5.png" alt="Phobos searching">
</p>

Voila! It's as simple as that!

### Scripts
 - `yarn start` - Start the app.
 - `yarn build` - Make the build.
