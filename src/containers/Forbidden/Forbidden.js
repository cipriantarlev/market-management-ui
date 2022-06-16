import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { hideNavBar, showNavBar } from '../../actions/navBarAction';
import './style.css'

const mapDispatchToProps = (dispatch) => {
	return {
	  hideNavBar: () => dispatch(hideNavBar()),
	  showNavBar: () => dispatch(showNavBar()),
	}
  }

const Forbidden = ({ hideNavBar, showNavBar }) => {
  
	useEffect(() => {
		hideNavBar();
		return () => {
			showNavBar();
		}
		// eslint-disable-next-line
	  }, [])
	  
	return(
    <div id="notfound">
		<div className="notfound">
			<div className="notfound-404">
				<h1>Oops!</h1>
				<h2>403 - Access Denied</h2>
			</div>
      <Link to="/">Go TO Homepage</Link>
		</div>
	</div>
  );
}

export default connect(null, mapDispatchToProps)(Forbidden);