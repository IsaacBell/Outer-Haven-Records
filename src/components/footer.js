var React    = require('react');
var ReactDOM = require('react-dom');

var iconStyle = function(h, w, mT = undefined) {
  return {
    display:   'inline-block !important',
    height:    h.toString() + '%',
    width:     w.toString() + '%',
    marginTop: mT === undefined ? '0' : mT.toString() + '%'
  }
}

class Footer extends React.Component {
  render() {
    return(<section className="footer">
      <span className="social">
        <a href="mailto:contact.outerhaven@gmail.com" target="_blank">
          <img 
            src="https://s3.amazonaws.com/outer-haven/icons/new-message.png" alt="Email Icon" 
            style={iconStyle(100, 75)}
          />
        </a>
      </span>
      <span className="social">
        <a href="https://vimeo.com/user53410088" target="_blank">
          <img 
            src="https://s3.amazonaws.com/outer-haven/icons/vimeo-logo.png" alt="Vimeo Icon" 
            style={iconStyle(100, 77.5)}
          />
        </a>
      </span>
      <span className="social">
        <a href="#" target="_blank">
          <img 
            src="https://s3.amazonaws.com/outer-haven/icons/fb2.png" alt="Facebook Icon" 
            style={iconStyle(85, 90, 7.5)}
          />
        </a>
      </span>

      <span className="social">
        <a href="#" target="_blank">
          <img 
            src="https://s3.amazonaws.com/outer-haven/icons/soundcloud-logo.png" alt="Soundcloud Icon" 
            style={iconStyle(100, 77.5)}
          />
        </a>
      </span>
      <span className="social">
        <a href="#" target="_blank">
          <img 
            src="https://s3.amazonaws.com/outer-haven/icons/yt.png" alt="Youtube Icon" 
            style={iconStyle(87.5, 95, 5)}
          />
        </a>
      </span>
      <span className="social">
        <a href="https://www.instagram.com/outerhavenrecords/" target="_blank">
          <img 
            src="https://s3.amazonaws.com/outer-haven/icons/icon-ig.png" alt="Instagram Icon" 
            style={iconStyle(75, 80, 10)}
          />
        </a>
      </span>
      <span className="social">
        <a href="#" target="_blank">
          <img 
            src="https://s3.amazonaws.com/outer-haven/icons/bandcamp-logo.png" alt="Bandcamp Icon" 
            style={iconStyle(70, 75, 15)}
          />
        </a>
      </span>
      <span className="social">
        <a href="https://www.mixcloud.com/Outer_Haven_Records/" target="_blank">
          <img 
            src="https://s3.amazonaws.com/outer-haven/icons/mixcloud.png" alt="Mixcloud Icon" 
            style={iconStyle(100, 100, 0)}
          />
        </a>
      </span>
      <span className="social">
        <a href="https://twitter.com/OuterHavenRec" target="_blank">
          <img 
            src="https://s3.amazonaws.com/outer-haven/icons/icon-twttr.png" alt="Twitter Icon" 
            style={iconStyle(70, 75, 15)}
          />
        </a>
      </span>
    </section>)
  }
}

// Render all instaces of class 'footer'
var els = document.getElementsByClassName('footer')
for (var i = els.length - 1; i >= 0; i--) {
  let el = els[i]
  el.setAttribute( "id", "footer-section-" + i.toString() )
  ReactDOM.render(<Footer />, el)
}

