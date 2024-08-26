This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### If trying to load data to the database:
cd into the load_db folder in the project root, and do the following command: `python -m venv venv` 
if python is not already installed it can be installed [here](https://www.python.org/downloads/).
once your prompt says: `(venv)` you can run the following command: `pip install -r requirements.txt`
then run the script with: `python load.py`
### NOTICE:
If you want to input data you must update the data in `reviews.json` to have ONLY the data you want to add in the current structure.