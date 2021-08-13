import React, {
    // useEffect,
    useState
} from 'react';
import {
    // Tab,
    // Tabs,
    ToggleButtonGroup, 
    ToggleButton, 
    Container
} from 'react-bootstrap';
import Mapss from './Map';
import MapVN from './MapVN';
import VnIcon from './../assets/image/vnicon.png';
import { FaGlobeAsia } from 'react-icons/fa';

function TabMap(props) {
    // const [key, setKey] = useState([1]);
    const [check, setCheck] = useState(1);

    // const handleChange = val => setKey(val);
    return (
       <Container fluid={true}>
            <ToggleButtonGroup type="radio" name="options" defaultValue={1} onChange={(e) => setCheck(e) }>
                <ToggleButton variant={check === 1 ? 'info' : ''} className='textTab' value={1}>
                <FaGlobeAsia/> Worldwide infection chart
                </ToggleButton>
                <ToggleButton variant={check === 2 ? 'info' : ''} className='textTab' value={2}>
                <img src={VnIcon} width={20} height={15} style={{marginRight : 5}} alt="Vietnam"/>
                Provinces in Vietnam
                </ToggleButton>
            </ToggleButtonGroup>

           <div style={{ border : 1, marginTop : 1 }}>
                {check === 1 
                ? 
                <Mapss originData={props.originData}/> 
                : 
                <MapVN originData={props.originData}/>}
           </div>
       </Container>
    );
}

export default TabMap;