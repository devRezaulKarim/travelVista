import "./featured.css";

const Featured = () => {
  return (
    <div className="featured">
      <div className="featuredItem">
        <img
          src="https://www.travelandleisure.com/thmb/bggU8kobL7GC0jIaY7g7XV_KEI4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/skyline-river-austin-texas-ATXTHINGS0122-4f095568988a408b8eadf93c530f1344.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Austin</h1>
          <h2>111 properties</h2>
        </div>
      </div>

      <div className="featuredItem">
        <img
          src="https://emilyembarks.com/wp-content/uploads/2021/08/ireland-4533675_1280.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Dublin</h1>
          <h2>321 properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://img.freepik.com/free-photo/beautiful-view-skyscrapers-against-cloudy-blue-sky-san-francisco-california_181624-38324.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>San Francisco</h1>
          <h2>222 properties</h2>
        </div>
      </div>
    </div>
  );
};

export default Featured;
