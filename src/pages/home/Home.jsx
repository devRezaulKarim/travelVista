import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";

const Home = () => {
  return (
    <div>
      <div className="headerSection">
        <video playsInline autoPlay muted loop poster="polina.jpg" id="bgvid">
          <source src="bgvid1.mp4" type="video/mp4" />
        </video>
        <Navbar />
        <Header />
      </div>
      <div className="homeContainer">
        <Featured />
        <div className="homeTitle">
          <h1>Find by property type</h1>
        </div>
        <PropertyList />
        <div className="homeTitle">
          <h1>Popular Homes</h1>
        </div>
        <FeaturedProperties />
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
