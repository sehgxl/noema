import { Readability } from "@mozilla/readability";
const getSummary = async (props) => {
  const { setLoading, setSummary, setShowSmry } = props;
  setLoading(true);
  const documentClone = document.cloneNode(true);
  const article = new Readability(documentClone).parse();

  try {
    const req = await fetch(`https://read-mojo-api.onrender.com/article/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: article.title,
        url: window.location.href,
        summary: "Empty",
        body: article.textContent,
      }),
    });
    res = await req.json();
    console.log(res);
    setSummary(res.article.summary.replace(/^\n\n/, ""));
    setLoading(false);
    setShowSmry(true);
  } catch (error) {
    setSummary("Please try again");
    setLoading(false);
    setShowSmry(true);
    console.log(error);
  }
};

export default getSummary;
