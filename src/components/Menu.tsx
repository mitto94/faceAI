import * as React from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';

const Menu: React.FC = () => {
    return (
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/loading">Loading</Link></li>
								<li><Link to="/age">age</Link></li>
								<li><Link to="/age_photo">photo</Link></li>
								<li><Link to="/age_analysis">analysis</Link></li>

								<li><Link to="/emotion">emotion</Link></li>
								<li><Link to="/emotion_analysis">analysis</Link></li>

								<li><Link to="/relation">relation</Link></li>
								<li><Link to="/relation_photo">photo</Link></li>
								<li><Link to="/relation_analysis">analysis</Link></li>
            </ul>
            <hr/>
        </div>
    );
};

export default Menu;