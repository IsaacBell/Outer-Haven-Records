var React    = require('react');
var ReactDOM = require('react-dom');

var ContactForm = React.createClass({
  getInitialState: function() {
    return {
      fullName: ''
    , email: ''
    , message: ''
    , errors: {}
    , isSubmitted: false
    , submitted: null
    }
  }
, styles: {
    redText: {
      color:  '#FF0000'
    },
    defaultTextColor: {
      color: '#000000'
    },
    disabledSubmitButton: {}
  }
, emailIsValid: function (value) {
    // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
  }
, handleSubmit: function(e) {
    e.preventDefault()
    let contactForm = this
  
    if ( this.submissionIsValid() ){

      $.get("/mail", {
        from:    this.state.email,
        to:      'contact.outerhaven@gmail.com',
        subject: 'Contact from: ' + this.state.fullName,
        text:    this.state.message
        }, function (data) {
          if (data == "sent") {
            contactForm.setState({ submitted: contactForm.getFormData(), isSubmitted: true })
            $('.cbp-mc-submit').hide()
          }
        }
      )
    }
    else {
      console.log('Failed to submit')
      if (this.state.errors.fullName) { 
        $('#fullName').val(this.state.errors.fullName)
      }
      if (this.state.errors.email) {
        $('#email').val(this.state.errors.email)
      }      
      if (this.state.errors.message) {
        $('#message').val(this.state.errors.message)
      }
    }
  }
, handleNameChange: function(e) {
    this.setState({fullName: e.target.value})
  }
, handleEmailChange: function(e) {
    this.setState({email: e.target.value})
  }
, handleMessageChange: function(e) {
    this.setState({message: e.target.value})
  }
, submissionIsValid: function() {
    let formData = this.getFormData()
    this.state.errors = {}

    if (!formData.fullName || formData.fullName.length === 0) {
      this.state.errors['fullName'] = "Name cannot be blank!"
    }
    if (!this.emailIsValid(formData.email)) {
      this.state.errors['email'] = "You must enter a valid email!"
    }
    if (!formData.email || formData.email.length === 0) {
      this.state.errors['email'] = "Email cannot be blank!"
    }
    if (!formData.message || formData.message.length === 0) {
      this.state.errors['message'] = "Message cannot be blank!"
    }

    return this.isErrorFree()
  }
, isErrorFree: function() {
    return Object.keys(this.state.errors).length === 0
  }
, getFormData: function() {
    var data = {
      fullName: this.trim(this.state.fullName),
      email:    this.trim(this.state.email),
      message:  this.trim(this.state.message)
    }
    
    return data
  }
, trim: function(string) {
  var TRIM_RE = /^\s+|\s+$/g
  return string.replace(TRIM_RE, '')
}
, render: function() {
    var submitted

    if (this.state.submitted !== null) {
      submitted = <div className="alert alert-success">
        <h2>Thanks!</h2>
        <p>Submitted data:</p>
        <pre><code>{JSON.stringify(this.state.submitted, null, '  ')}</code></pre>
      </div>
    }

    return(<form className="cbp-mc-form" action="/mail" method="get" encType="x-www-form-urlencoded" onSubmit={this.handleSubmit}>
      <div className="cbp-mc-column">
        <label htmlFor="fullName">Name</label>
        <input 
          type="text" 
          id="fullName" 
          name="fullName" 
          placeholder="John Doe"
          style={!this.state.errors.fullName ? this.styles.defaultTextColor : this.styles.redText}
          onChange={this.handleNameChange}
        />
        <label htmlFor="email">Email Address</label>
        <input 
          type="text" 
          id="email" 
          name="email" 
          placeholder="jane@doe.com"
          style={!this.state.errors.email ? this.styles.defaultTextColor : this.styles.redText}
          onChange={this.handleEmailChange}
        />
      </div>
      <div className="cbp-mc-column">
        <label htmlFor="message">Message</label>
        <textarea 
          id="message" 
          name="message"
          style={!this.state.errors.message ? this.styles.defaultTextColor : this.styles.redText}
          onChange={this.handleMessageChange}>
        </textarea> 
      </div>
      <div className="cbp-mc-submit-wrap">
        <input 
          type="submit"
          className="cbp-mc-submit" 
          value="Submit"
          disabled={this.state.isSubmitted}
        />
      </div>
      {submitted ? submitted : ''}
    </form>)
  }
})

ReactDOM.render(<ContactForm />, document.getElementById('contact-form'))
