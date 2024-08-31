# AI Rate My Professor
Authors:
[Cole Aydelotte](https://github.com/coleaydelotte)
[Francisco Figueroa](https://github.com/FranThe3rd)
## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Python Data Loader
The script reads from a file called `reviews.json` and then embeds it using OpenAI API. The embeddings are then put into a Pinecone Namespace.
### If trying to load data to the database:
cd into the load_db folder in the project root, and do the following command: `python -m venv venv` 
if python is not already installed it can be installed [here](https://www.python.org/downloads/).
once your prompt says: `(venv)` you can run the following command: `pip install -r requirements.txt`
then run the script with: `python load.py`
### NOTICE:
If you want to input data you must update the data in `reviews.json` to have ONLY the data you want to add in the current structure.