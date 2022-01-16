# Project Phobos

The **main goal** of Project Phobos is to **help you organize and search for specific passages through your documents**.

The user can upload the desired documents and use a search bar to seek specific terms across all files, without having the pain to open each file individually and search manually.

<div align="center">
  <a href="https://www.youtube.com/watch?v=d-cIFKLLPqE" target="_blank">
    <strong>BRIEF VIDEO REVIEW</strong>
  </a>
</div>

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
  <img src="https://user-images.githubusercontent.com/50183633/149677103-8b02ae75-0934-4bf3-a85a-26c86a7784be.gif" alt="Phobos upload modal">
  <br />
  <em>Uploading file</em>
</p>

<br />

<p align="center">
  <img src="https://user-images.githubusercontent.com/50183633/149676109-2b7380e5-4f20-415c-934d-73803d4dd812.gif" alt="Phobos home page">
  <br />
  <em>Searching</em>
</p>

Voila! It's as simple as that!

## Pages

<p align="center">
  <img src="https://user-images.githubusercontent.com/50183633/149675996-8106a217-1814-44fb-b600-77cc749aeaf5.gif" alt="Phobos register page">
  <br />
  <em>Register page</em>
</p>

<br />

<p align="center">
  <img width="600px" height="338px" src="https://user-images.githubusercontent.com/50183633/149676106-5c77b08d-d48f-447b-beeb-307c9a4a43e9.png" alt="Phobos login page">
  <br />
  <em>Login page</em>
</p>

<br />

<p align="center">
  <img src="https://user-images.githubusercontent.com/50183633/149676109-2b7380e5-4f20-415c-934d-73803d4dd812.gif" alt="Phobos home page">
  <br />
  <em>Home page</em>
</p>

<br />

<p align="center">
  <img src="https://user-images.githubusercontent.com/50183633/149676122-597d5891-8fee-49c3-90fe-d5ecb7ba3bcc.gif" alt="Phobos upload modal">
  <br />
  <em>Upload file</em>
</p>

<br />

<p align="center">
  <img src="https://user-images.githubusercontent.com/50183633/149676130-6456a4de-54f4-4fd9-a86a-4c6ab024a75b.gif" alt="Phobos library page">
  <br />
  <em>Library page — manage your documents</em>
</p>

<br />

<p align="center">
  <img src="https://user-images.githubusercontent.com/50183633/149676134-235f1d87-2323-4290-b8d6-651e34ed0f5e.gif" alt="Phobos upload modal">
  <br />
  <em>Explore page — explore public documents uploaded by users</em>
</p>

### Directory structure

```
┣📦frontend — The frontend app, built with ReactJS.
┣📦backend — The backend app, built with ExpressJS.
┣📦shared — Contains code shared between the frontend and backend.
```

### Scripts
 - `yarn start` — Start the app.
 - `yarn build` — Make the build.
