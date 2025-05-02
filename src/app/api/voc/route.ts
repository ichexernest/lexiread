import {articles} from "@/app/api/article/data";

//caching
// export const dynamic = "force-static"; // Static generation for all requests
// export const revalidate = 10; // Revalidate every 10 seconds
export async function GET () {
  return new Response(JSON.stringify(articles), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST (req: Request) {
    const article = await req.json();
    const newArticle = {
      id: Date.now().toString(),
      ...article,
    };
    articles.push(newArticle);
    return new Response(JSON.stringify(newArticle), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }