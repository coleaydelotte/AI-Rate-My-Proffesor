from dotenv import load_dotenv
import os
from pinecone import Pinecone, ServerlessSpec
load_dotenv()
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
if 'rag' not in pc.list_indexes().names():
    pc.create_index(
        name="rag",
        dimension=768,
        metric="cosine",
        spec=ServerlessSpec(cloud="aws", region="us-east-1")
    )
