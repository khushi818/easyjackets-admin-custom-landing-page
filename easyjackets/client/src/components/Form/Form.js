

export const Form = ({ onSubmit, name, onNameChange, email, setEmail, message, setMessage , data}) => {
  // Inline styles for custom adjustments
  const styles = {
    heading: {
      fontSize: '2.5rem', // Adjusted font size for "Get In Touch" heading
    },
    sectionTitle: {
      textAlign: 'start', // Align "Royalty Jackets" heading to the start
    },
    icon: {
      color: '#007bff', // Default icon color
    },
    socialIcon: {
      marginRight: '10px',
    },
    facebookIcon: {
      color: '#4267B2', // Facebook icon color
    },
    twitterIcon: {
      color: '#1DA1F2', // Twitter icon color
    },
    youtubeIcon: {
      color: '#FF0000', // YouTube icon color
    },
  };

  return (
    <div className="container mt-4 mb-4">
      <div className="row">
        <div className="col-md-6">
          <h1 className="display-4 fw-bold mb-3" style={styles.heading}>Get In Touch</h1>
          <p className="lead">
            Simply fill in this form and we’ll get back to you. We’re more than happy to answer any question you might have, even to arrange a time to chat about your order.
          </p>
          <h2 className='fw-bold mb-4' style={styles.sectionTitle}>Easy Jackets</h2>
          <ul className="list-unstyled">
            <li className='mb-4'><strong>Faisal Munir Butt</strong></li>
            <li className='mb-4'><i className="fas fa-phone" style={styles.icon}></i> {data?.phoneNumber}</li>
            <li className='mb-4'><i className="fas fa-envelope" style={styles.icon}></i> {data?.email}</li>
            <li><i className="fas fa-map-marker-alt" style={styles.icon}></i> {data?.address},</li>
            <li><i className="fas fa-map-marker-alt" style={styles.icon}></i> {data?.address1}</li>
          </ul>

          <ul className="list-inline">
            <li className="list-inline-item" style={styles.socialIcon}><i className="fab fa-facebook fa-2x" style={styles.facebookIcon}></i></li>
            <li className="list-inline-item" style={styles.socialIcon}><i className="fab fa-twitter fa-2x" style={styles.twitterIcon}></i></li>
            <li className="list-inline-item" style={styles.socialIcon}><i className="fab fa-youtube fa-2x" style={styles.youtubeIcon}></i></li>
          </ul>
        </div>
        <div className="col-md-6">
          <form onSubmit={onSubmit}>
            <div className="form-group mb-4">
              <label htmlFor="name" className='fs-5 fw-bold text-secondary'>Name <span className="text- danger">*</span></label>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First"
                    id="firstName"
                    name="firstName"
                    value={name.firstName}
                    onChange={onNameChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last"
                    id="lastName"
                    name="lastName"
                    value={name.lastName}
                    onChange={onNameChange}
                  />
                </div>
              </div>
            </div>
            <div className="form-group mb-4">
              <label htmlFor="email" className='fs-5 fw-bold text-secondary'>Email <span className="text-danger">*</span></label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message" className='fs-5 fw-bold text-secondary'>Comment or Message</label>
              <textarea
                className="form-control"
                id="message"
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary mt-3">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};
