import {articles} from "@/app/api/article/data";
export async function GET (_req: Request, { params }: { params: Promise<{ id: string }> }) {
  
  //searchParams
  //const searchParams = req.nextUrl.searchParams;
  //const query = searchParams.get("query") || "";

  //headers
  //const headers = new Headers(req.headers);
  //const headers = await headers(); from next/headers
  //console.log(headers.get("Authorization"));


  const { id } = await params;
  const article = articles.find((article) => article.id === id);
  return new Response(JSON.stringify(article), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function PATCH (req: Request, { params }: { params: Promise<{ id: string }> }) {
  
  //cookies
  //const theme = req.cookies.get("theme");
  //const cookieStore = await cookies(); from next/cookies
  //cookieStore.set("theme", "dark");
  //cookieStore.get("theme", "dark");

  //redirect
  //redirect("/api/where/to/redirect");
  
  const { id } = await params;
  const body = await req.json();
  const { title} = body;
  const index = articles.findIndex((article) => article.id === id);  
  articles[index].title = title;
    return new Response(JSON.stringify(articles[index]), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
     // "Set-Cookie": "theme=dark",
      },
    });
}

export async function DELETE (_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const index = articles.findIndex((article) => article.id === id);  
  const deletedArticle = articles[index];
  articles.splice(index, 1);
    return new Response(JSON.stringify(deletedArticle), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
}