import "./mailList.css";

const MailList = () => {
  return (
    <div className="mail">
      <video autoPlay muted loop poster="placeholder-image.jpg">
        <source src="/mailBack.mp4" type="video/mp4" />
      </video>
      <h1 className="mailTitle">Save time, save money!</h1>
      <span className="mailDesc">
        Sign up and we'll send the best deals to you
      </span>
      <div className="mailInputContainer">
        <input type="text" placeholder="Your Email" />
        <button>Subscribe</button>
      </div>
    </div>
  );
};

export default MailList;
