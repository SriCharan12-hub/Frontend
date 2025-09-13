import "./Categories.css";

function Categories({ click1, data, categories1 }) {
  return (
    <div className="Home-con-1">
      <h2 className="category-name">Categories</h2>

      <div className="category-wrapper">
        <div className="category-scroll">
          <h2
            className={click1 === null ? "category-all active" : "category-values"}
            onClick={() => categories1({ name: "All-categories" })}
          >
            All Categories
          </h2>

          {data && data.map(eachdata => (
            <a
              key={eachdata.id}
              className={click1 === eachdata.name ? "category-all active" : "category-values"}
              onClick={() => categories1(eachdata)}
            >
              {eachdata.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;
