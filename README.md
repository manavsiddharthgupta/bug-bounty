## Bug Bounty Program

A Webapp where you find a bug, connect with mentor to fix the bug and earn rewards.

## Getting Started

**Before cloning the frontend repo make sure you have cloned the backend repo and have it running on your local machine. Here is the link to the Backend Repo: [Backend Repo](https://github.com/manavsiddharthgupta/bug-bounty-backend)**

clone git repo:

```
git clone https://github.com/manavsiddharthgupta/bug-bounty.git
```

create a `.env` file and add the following:

```env
GITHUB_ID=your_github_id
GITHUB_SECRET=your_github_secret
SECRET=your_next_auth_secret

// generate your next_auth_secret using: https://generate-secret.vercel.app/32
```

install all dependencies:

```
npm install
```

run the development server:

```bash
npm run dev
```

## How to contribute

- Select an issue
- Create an issue if you want to update or change ui
- get assigned
- You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.
- create pull request to get merged

#

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## To do

- [x] Create Bounty Type Modal
- [x] Create Bounty Page
- [x] Each Bounty Description component
- [x] Each Bounty Application component
- [x] Implement Apply Modal
- [x] Implement share option
- [ ] update filter logic
- [x] Backend logic
- [x] user centric/ authentication, authorization
