import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "../App.css";

const CATEGORIES = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];

const NewsApp = () => {
  const [articles, setArticles] = useState([]);
  const [categ, setCateg] = useState("general");
  const [totalResults, setTotalResults] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [isLoading, setIsLoading] = useState("false");
  const loadNews = () => {
    axios({
      method: "GET",
      url: "https://newsapi.org/v2/top-headlines",
      params: {
        country: "in",
        apiKey: "a1c0c0d760ac4247a4297d6b5ff9b6ec",
        category: categ,
        page: pageNo,
        pageSize: 15,
      },
    })
      .then((response) => {
        setIsLoading(false);
        setArticles(response.data.articles);
        setTotalResults(response.data.totalResults);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadNews();
  }, []);

  useEffect(() => {
    loadNews();
  }, [categ, pageNo]);

  const handleCategory = (category) => {
    setIsLoading(true);
    // setPageNo(1);
    setCateg(category);
  };

  return (
    <div style={{ backgroundColor: "#e9ecef" }}>
      <div style={{ backgroundColor: "#3e3e3e" }}>
        <h1 style={{ color: "white" }}>News App</h1>
        <div>
          {CATEGORIES.map((category, index) => {
            return (
              <button
                key={index}
                className="btn btn-secondary"
                style={{ margin: 5 }}
                onClick={() => {
                  handleCategory(category);
                }}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
      <br />
      {isLoading ? (
        <>
          <div className="spinner-border text-primary" role="status"></div>
          <div className="spinner-border text-secondary" role="status"></div>
          <div className="spinner-border text-success" role="status"></div>
        </>
      ) : (
        <>
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            pageCount={Math.ceil(totalResults / 10)}
            onPageChange={(event) => {
              setPageNo(event.selected + 1);
            }}
          />
        </>
      )}

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {articles.map((article, index) => {
          return (
            <div
              className="card"
              style={{ width: "253px", margin: 7, height: "350px" }}
            >
              <img
                className="card-img-top"
                src={article.urlToImage}
                alt=""
                style={{ backgroundColor: "#3e3e3e" }}
                height="120"
              />
              <div className="card-body">
                <h6 className="card-title tit">{article.title}</h6>
                <p className="card-text descrip">{article.description}</p>
                <a href={article.url}>See More</a>
              </div>
            </div>
          );

          //<p key={index}>{article.title}</p>;
        })}
      </div>
    </div>
  );
};

export default NewsApp;

//    (
//   articles.map((article) => (
//     <p>{article.title}</p>
//   ))
//    )
