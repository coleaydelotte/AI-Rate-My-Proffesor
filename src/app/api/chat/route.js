import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";

const { GoogleGenerativeAI } = require("@google/generative-ai");
const api_key = process.env.GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(api_key);
const systemPrompt =
`
You are a highly skilled assistant for the "Rate My Professor" application. Your task is to help students find the best professors based on their queries. When a user asks a question about finding a professor, you should:

1. **Understand the Query**: Analyze the user’s query to understand the specific criteria they are looking for in a professor. This could include factors such as subject expertise, teaching style, rating, or location.

2. **Retrieve Relevant Data**: Use the Retrieval-Augmented Generation (RAG) model to search for the most relevant professor profiles based on the user’s criteria. Ensure you consider factors such as recent ratings, review keywords, and the relevance of each professor’s expertise.

3. **Generate the Top Recommendations**: Provide a concise response listing the top 3 professors that best match the user’s query. Include the following details for each professor:
   - **Name**
   - **Department or Subject Expertise**
   - **Rating**
   - **Brief Description** (e.g., teaching style or notable achievements)

4. **Maintain Relevance and Accuracy**: Ensure that the recommendations are based on the most current and relevant data available. If there are no professors that match the criteria, politely inform the user and suggest refining their query.

#### Example User Query:
- "I'm looking for the top professors in Computer Science who are highly rated for their teaching style."

#### Example Response:
- **Professor Jane Doe** – Computer Science
  - **Rating**: 4.8
  - **Description**: Known for engaging lectures and clear explanations. Highly recommended for beginners.

- **Professor John Smith** – Computer Science
  - **Rating**: 4.7
  - **Description**: Expert in algorithms with a reputation for providing detailed feedback.

- **Professor Emily Clark** – Computer Science
  - **Rating**: 4.6
  - **Description**: Excellent communicator who makes complex topics accessible.

Remember to adapt the response based on the actual data and ensure it aligns with the user’s specific needs.
`;

export async function POST(req) {
    const data = await req.json();
    const pc = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY,
    });
    const index = pc.index('rag').namespace('ns1')
    const embedModel = genAI.getGenerativeModel({ model: "text-embedding-004"});
    const text = data[data.length - 1].content;
    const response = embedModel.embedContent(text);
    const embedding = response.embedding;
    const results = await index.query({
      topK: 3,
      includeMetadata: true,
      vector: embedding,
    });

    let resultString = '\n\nReturned Results from vector db (done automatically): ';
    results.matches.forEach(match => {
        resultString += `
        \n
        professor: ${match.metadata.professor}
        review: ${match.metadata.review}
        Subject: ${match.metadata.subject}
        Stars: ${match.metadata.stars}
        \n
        \n
        `;
    });

    const lastMessage = data[data.length - 1]
    lastMessageContent = lastMessage.content + resultString
    lastDataWithoutLastMessage = data.slice(0, data.length - 1)
    const completion = await openAi.create({
        messages: [
            {role: 'system', content: systemPrompt},
            ...lastDataWithoutLastMessage,
            {role: 'user', content: lastMessageContent}
        ],
        model: 'gpt-4o-mini',
        stream: true,
    })

    const stream = ReadableStream({
        async start(controller){
            const encoder = new TextEncoder();
            try {
                for await (const chunk of completion) {
                    const content = chunk.choices[0]?.delta?.content;
                    if (content) {
                        const text = encoder.encode(content);
                        controller.enqueue(text);
                    }
                }
            } catch (error) {
                controller.error(error);
            } finally {
                controller.close();
            }
        }
    })

    return new NextResponse(stream)
}