from dotenv import load_dotenv
import os
from pinecone import Pinecone, ServerlessSpec
import json
import google.generativeai as ga

load_dotenv()
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
if 'rag' not in pc.list_indexes().names():
    pc.create_index(
        name="rag",
        dimension=768,
        metric="cosine",
        spec=ServerlessSpec(cloud="aws", region="us-east-1")
    )

data = json.load(open('reviews.json'))
processed_data = []
ga.configure(api_key=os.getenv("GEMINI_API_KEY"))

for review in data['reviews']:
    try:
        response = ga.embed_content(
            model="models/text-embedding-004",
            content=review['review'],
            task_type="retrieval_document",
            title="Embedding of single string"
        )
        embedding = response['embedding']
        processed_data.append({
            "values": embedding,
            "id": review['professor'],
            "metadata": {
                "review": review['review'],
                "subject": review['subject'],
                "stars": review['stars']
            }
        })
    except Exception as e:
        print(f"Error generating embedding for review: {e}")

index = pc.Index("rag")
index.upsert(
  vectors=processed_data,
  namespace="ns1"
)
