import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faFacebookMessenger, faInstagram, faSkype } from "@fortawesome/free-brands-svg-icons"


const Footer = () => {
  return (
    <footer className="flex justify-center md:justify-between">
      <div>
          <p>Copyright&copy; 2024 - RYU FullStack Web Dev. All Rights Reserved</p>
      </div>
      <div className="social-link-icon">
          <FontAwesomeIcon className="socials" icon={faFacebook}/>
          <FontAwesomeIcon className="socials" icon={faSkype}/>
          <FontAwesomeIcon className="socials" icon={faInstagram}/>
          <FontAwesomeIcon className="socials" icon={faFacebookMessenger}/>
    </div>
    </footer>
  )
}

export default Footer
