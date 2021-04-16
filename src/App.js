import React, { useEffect, useState, useRef } from "react";
import "./css/index.css";
import {
  Container,
  Row,
  Col,
  Badge,
  Spinner,
  ToggleButtonGroup,
  ToggleButton,
  Overlay,
  Tooltip,
} from "react-bootstrap";
// import logoSubee from "./../src/assets/image/icon.jpg";
import avatar from "./assets/image/avatar.jpg";
import {
  FaBell,
  // FaFacebookSquare ,
  FaGlobeAsia,
  FaPlusSquare,
  // FaHaykal,
  FaSkullCrossbones,
  FaSyringe,
  FaPencilAlt,
  FaRegCalendarAlt,
  FaRegCopyright,
  FaPhone,
  FaCode,
} from "react-icons/fa";
import Axios from "axios";
import ModalEmail from "./../src/component/ModelEmail";
import TabMap from "./../src/component/TabMap";
import moment from "moment";
import VnIcon from "./../src/assets/image/vnicon.png";
import data from "./api.json";

function App() {
  const [total, setTotal] = useState({});
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [originData, setOriginData] = useState([]);
  const sortCases = (foo, baz) => foo.cases - baz.cases;
  const [list, setList] = useState([]);
  const [currentUpdate, setCurrentUpdate] = useState(
    moment(new Date().toString())
  );
  // const[ pu, setPu]= useState({});
  const [check, setCheck] = useState(1);
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const devYear = new Date("2020").getFullYear();
  const thisYear = new Date().getFullYear();
  let year;
  devYear >= thisYear ? (year = devYear) : (year = `${devYear} - ${thisYear}`);
  const handleSearchBox = (event) => {
    const { value } = event.target;
    searchAnything(value);
  };
  const searchAnything = (value) => {
    const newList = originData.filter((item) =>
      new RegExp(value, "i").test(item.country)
    );
    setList(newList);
  };
  useEffect(() => {
    const getData = async () => {
      try {
        let getList = await Axios.get(
          "https://disease.sh/v3/covid-19/countries"
        );
        setOriginData(getList.data);
        setList(getList.data);
        setCurrentUpdate(moment(new Date().toString()));
        setLoading(false);
        // setPu(getList);
        let initial = { sumCases: 0, sumDeaths: 0, sumRecovered: 0 };
        let sum = getList.data.reduce((acc, cur) => {
          return {
            sumCases: acc.sumCases + cur.cases,
            sumDeaths: acc.sumDeaths + cur.deaths,
            sumRecovered: acc.sumRecovered + cur.recovered,
          };
        }, initial);
        setTotal(sum);
        const intervalId = setInterval(() => {
          setOriginData(getList.data);
          setList(getList.data);
          setCurrentUpdate(moment(new Date().toString()));
          setTotal(sum);
        }, 180000);
        // componentWillUnmount
        return () => {
          clearInterval(intervalId);
        };
      } catch (error) {
        console.error("error", error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    setOriginData(data);
    setList(data);
    setCurrentUpdate(moment(new Date().toString()));
    setLoading(false);
    let initial = {
      sumCases: 0,
      sumDeaths: 0,
      sumRecovered: 0,
    };
    let sum = originData.reduce((acc, cur) => {
      return {
        sumCases: acc.sumCases + cur.cases,
        sumDeaths: acc.sumDeaths + cur.deaths,
        sumRecovered: acc.sumRecovered + cur.recovered,
      };
    }, initial);
    setTotal(sum);
  }, []);

  // console.log("originData", originData);
  // console.log("loading", loading);
  // console.log("pu", pu);

  return (
    <Container style={{ width: "100%", height: "100%" }} fluid={true}>
      <Row>
        <Col className="row-1" md={12}>
          <Container fluid={true}>
            <Row>
              <Col className="row-2" md={2}>
                <div className="col-style">
                  <img
                    className="avatar"
                    src={avatar}
                    width="45"
                    height="61"
                    alt="avatar"
                  ></img>{" "}
                  <p className="text2">manhhust</p>{" "}
                </div>
              </Col>{" "}
              <Col className="row-2" md={3}>
                <h6 className="text">Coronavirus (2021 - nCoV)</h6>{" "}
              </Col>
              <Col className="row-2" md={3}>
                <div
                  className={"buttonStyleFa"}
                  ref={target}
                  onClick={() => setShow(!show)}
                  style={{ marginRight: 10 }}
                >
                  {" "}
                  <FaCode color={"white"} style={{ marginRight: 3 }} />{" "}
                  <span style={{ color: "white", fontSize: 10 }}>Nhúng</span>{" "}
                </div>{" "}
                <Overlay target={target.current} show={show} placement="bottom">
                  {" "}
                  {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                      {" "}
                      {
                        'Code : <iframe width="100%" height="720px" src="https://coronavirusupdatevn.herokuapp.com/"></iframe>'
                      }{" "}
                    </Tooltip>
                  )}{" "}
                </Overlay>{" "}
                <div
                  onClick={() => {
                    setOpenModal(true);
                  }}
                  className="buttonStyle"
                >
                  {" "}
                  <FaBell color={"white"} style={{ marginRight: 3 }} />{" "}
                  <span style={{ color: "white", fontSize: 10 }}>
                    {" "}
                    Nhận thông báo{" "}
                  </span>{" "}
                </div>{" "}
              </Col>{" "}
              <Col className="row-2" md={4}>
                {" "}
                <table>
                  {" "}
                  <td>
                    {" "}
                    <tr className="text2">
                      {" "}
                      <FaRegCalendarAlt /> Cập nhật lần cuối lúc{" "}
                      {currentUpdate.format("DD/MM/YYYY HH:mm")}{" "}
                    </tr>{" "}
                    <tr className="text2">
                      {" "}
                      <FaRegCopyright /> Nguồn : WHO, CDC, NHC, DXY & Bộ Y Tế
                      Việt Nam.{" "}
                    </tr>{" "}
                    <tr className="text2">
                      {" "}
                      <FaPhone /> Liên hệ :{" "}
                      <a href="#" style={{color: "yellow"}}>manhktashust@gmail.com</a>{" "}
                    </tr>{" "}
                  </td>{" "}
                </table>{" "}
              </Col>{" "}
            </Row>{" "}
          </Container>{" "}
        </Col>{" "}
      </Row>{" "}
      <Row style={{ marginTop: 10 }}>
        <Col className="row-1-col-2" md={3}>
          {" "}
          
          <table className="">
            {" "}
            <tr>
              {" "}
              <td>
                <ToggleButtonGroup
                  style={{ marginBottom: 10 }}
                  type="radio"
                  name="options"
                  defaultValue={1}
                  onChange={(e) => setCheck(e)}
                >
                  {" "}
                  <ToggleButton
                    variant={check === 1 ? "info" : "dark"}
                    className="textTab"
                    value={1}
                    // style={{ fontWeight: "bold" }}
                  >
                    {" "}
                    <FaGlobeAsia /> Thế giới{" "}
                  </ToggleButton>{" "}
                  <ToggleButton
                    variant={check === 2 ? "info" : "dark"}
                    className="textTab"
                    value={2}
                    // style={{ fontWeight: "bold" }}
                  >
                    {" "}
                    <img
                      src={VnIcon}
                      width={20}
                      height={15}
                      style={{ marginRight: 5 }}
                      alt="flag"
                    ></img>{" "}
                    Việt Nam{" "}
                  </ToggleButton>{" "}
                </ToggleButtonGroup>{" "}
                <div
                  className="text2"
                  style={{ marginBottom: 10, fontWeight: "bold" }}
                >
                  {" "}
                  <FaGlobeAsia /> Thống kê ca nhiễm theo quốc gia{" "}
                </div>{" "}
                {check === 1 ? (
                  <input
                    className="searchbox"
                    placeholder="Search 667 regions ..."
                    onChange={handleSearchBox}
                  />
                ) : (
                  <span></span>
                )}{" "}
              </td>{" "}
            </tr>{" "}
            <tr>
              {" "}
              <td>
                {" "}
                {loading ? (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {" "}
                    <Spinner
                      style={{ textAlign: "center" }}
                      animation="border"
                      variant="light"
                    />{" "}
                  </div>
                ) : list.length !== 0 ? (
                  <table className="">
                    {" "}
                    <thead>
                      {" "}
                      <tr>
                        {" "}
                        <th className="text2" style={{ fontSize: "10px" }}>
                          {" "}
                          <b>Flag</b>{" "}
                        </th>{" "}
                        <th
                          className="text2 text-center"
                          style={{ fontSize: "10px" }}
                        >
                          {" "}
                          <b>Nation</b>{" "}
                        </th>{" "}
                        <th
                          className="text2 text-center"
                          style={{ fontSize: "10px" }}
                        >
                          {" "}
                          <b>Update</b>{" "}
                        </th>{" "}
                        <th
                          className="text2 text-center"
                          style={{ fontSize: "10px" }}
                        >
                          {" "}
                          <b>Cases</b>{" "}
                        </th>{" "}
                        <th
                          className="text2 text-center"
                          style={{ fontSize: "10px" }}
                        >
                          {" "}
                          <b>Death</b>{" "}
                        </th>{" "}
                        <th
                          className="text2 text-center"
                          style={{ fontSize: "10px" }}
                        >
                          {" "}
                          <b>Recovered</b>{" "}
                        </th>{" "}
                      </tr>{" "}
                    </thead>{" "}
                    <tbody>
                      {" "}
                      {check === 1
                        ? list
                            .sort(sortCases)
                            .reverse()
                            .map((element) => {
                              return (
                                <tr key={element.country}>
                                  {" "}
                                  <td>
                                    {" "}
                                    <img
                                      className="flagStyle"
                                      src={element.countryInfo.flag}
                                      alt={element.country}
                                    />{" "}
                                  </td>{" "}
                                  <td>
                                    {" "}
                                    <div className="text2">
                                      {" "}
                                      {element.country}{" "}
                                    </div>{" "}
                                  </td>{" "}
                                  <td>
                                    {" "}
                                    <span
                                      className="text2"
                                      style={{ fontSize: "7px" }}
                                    >
                                      {" "}
                                      {moment(element.updated).fromNow(
                                        true
                                      )}{" "}
                                    </span>{" "}
                                  </td>{" "}
                                  <td>
                                    {" "}
                                    <div
                                      className="text2"
                                      style={{
                                        marginLeft: 10,
                                        fontSize: "12px",
                                      }}
                                    >
                                      {" "}
                                      <Badge variant="warning">
                                        {" "}
                                        {element.cases}{" "}
                                      </Badge>{" "}
                                    </div>{" "}
                                  </td>{" "}
                                  <td>
                                    {" "}
                                    <div
                                      className="text2"
                                      style={{
                                        marginRight: 10,
                                        marginLeft: 10,
                                        fontSize: "12px",
                                      }}
                                    >
                                      {" "}
                                      <Badge variant="danger">
                                        {" "}
                                        {element.deaths}{" "}
                                      </Badge>{" "}
                                    </div>{" "}
                                  </td>{" "}
                                  <td>
                                    {" "}
                                    <div
                                      className="text2"
                                      style={{ fontSize: "12px" }}
                                    >
                                      {" "}
                                      <Badge variant="success">
                                        {" "}
                                        {element.recovered}{" "}
                                      </Badge>{" "}
                                    </div>{" "}
                                  </td>{" "}
                                </tr>
                              );
                            })
                        : originData
                            .filter((item) => item.country === "Vietnam")
                            .map((element) => {
                              return (
                                <tr className="">
                                  {" "}
                                  <td>
                                    {" "}
                                    <img
                                      className="flagStyle"
                                      src={element.countryInfo.flag}
                                      alt={element.country}
                                    />{" "}
                                  </td>{" "}
                                  <td>
                                    {" "}
                                    <div className="text2">
                                      {" "}
                                      {element.country}{" "}
                                    </div>{" "}
                                  </td>{" "}
                                  <td>
                                    {" "}
                                    <span
                                      className="text2"
                                      style={{ fontSize: "7px" }}
                                    >
                                      {" "}
                                      {moment(element.updated).fromNow(
                                        true
                                      )}{" "}
                                    </span>{" "}
                                  </td>{" "}
                                  <td>
                                    {" "}
                                    <div
                                      className="text2"
                                      style={{
                                        marginLeft: 10,
                                        fontSize: "15px",
                                      }}
                                    >
                                      {" "}
                                      <Badge variant="warning">
                                        {" "}
                                        {element.cases}{" "}
                                      </Badge>{" "}
                                    </div>{" "}
                                  </td>{" "}
                                  <td>
                                    {" "}
                                    <div
                                      className="text2"
                                      style={{
                                        marginRight: 10,
                                        marginLeft: 10,
                                        fontSize: "15px",
                                      }}
                                    >
                                      {" "}
                                      <Badge variant="danger">
                                        {" "}
                                        {element.deaths}{" "}
                                      </Badge>{" "}
                                    </div>{" "}
                                  </td>{" "}
                                  <td>
                                    {" "}
                                    <div
                                      className="text2"
                                      style={{ fontSize: "15px" }}
                                    >
                                      {" "}
                                      <Badge variant="success">
                                        {" "}
                                        {element.recovered}{" "}
                                      </Badge>{" "}
                                    </div>{" "}
                                  </td>{" "}
                                </tr>
                              );
                            })}{" "}
                    </tbody>{" "}
                  </table>
                ) : (
                  <span className="text2 text-center">Country Not Found</span>
                )}{" "}
              </td>{" "}
            </tr>{" "}
          </table>
          
        {" "}
          <Container fluid={true}>
            {" "}
            <Row style={{ marginTop: 10 }}>
              {" "}
              <Col md={12}>
                {" "}
                {/* <div style={{ justifyContent: "center", display: "flex", alignItems: "center", marginBottom: 20, }} > <Badge variant="warning">0</Badge> <div className="text2" style={{ fontSize: 10, marginLeft: 5 }} > {" "} Số ca nhiễm </div> <Badge variant="danger" style={{ marginLeft: 20 }}> 0 </Badge> <div className="text2" style={{ fontSize: 10, marginLeft: 5 }} > {" "} Tử vong </div> <Badge variant="success" style={{ marginLeft: 20 }}> 0 </Badge> <div className="text2" style={{ fontSize: 10, marginLeft: 5 }} > {" "} Hồi phục </div> </div> */}{" "}
              </Col>{" "}
            </Row>{" "}
          </Container>{" "}
        </Col>{" "}
        <Col className="row-1-col-2" md={6}>
          {" "}
          <TabMap originData={originData} />{" "}
        </Col>{" "}
        <Col className="row-1-col-2" md={3}>
          {" "}
          {loading ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {" "}
              <Spinner
                style={{ textAlign: "center" }}
                animation="border"
                variant="light"
              />{" "}
            </div>
          ) : (
            <Row>
              {" "}
              <Col md={4}>
                {" "}
                <div className="col-style">
                  {" "}
                  <div className="text2" style={{ fontWeight: "bold" }}>
                    {" "}
                    <FaSyringe /> Tổng ca nhiễm{" "}
                  </div>
                  {" "}
                  <div className="text" style={{ fontSize: 15 }}>
                    {" "}
                    {total.sumCases}
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
              </Col>
              {" "}
              <Col md={4}>
                {" "}
                <div className="col-style">
                  {" "}
                  <div className="text2" style={{ fontWeight: "bold" }}>
                    {" "}
                    <FaSkullCrossbones /> Tử vong
                    {" "}
                  </div>{" "}
                  <div className="text" style={{ fontSize: 15 }}>
                    {" "}
                    {total.sumDeaths}
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
              </Col>
              {" "}
              <Col md={4}>
                {" "}
                <div className="col-style">
                  {" "}
                  <div className="text2" style={{ fontWeight: "bold" }}>
                    {" "}
                    <FaPlusSquare /> Hồi phục
                    {" "}
                  </div>
                  {" "}
                  <div className="text" style={{ fontSize: 15 }}>
                    {" "}
                    {total.sumRecovered}
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
              </Col>
              {" "}
            </Row>
          )}
          {" "}
          <Row style={{ marginTop: 50 }}>
            {" "}
            <Col
              md={12}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 30,
              }}
            >
              {" "}
              <div
                className="text2"
                style={{ marginLeft: 10, fontWeight: "bold" }}
              >
                {" "}
                <FaPencilAlt /> Chú thích biểu đồ{" "}
              </div>{" "}
            </Col>{" "}
            <Col
              md={12}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {" "}
              <div
                style={{
                  backgroundColor: "red",
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  opacity: 0.3,
                }}
              ></div>{" "}
              <div className="text2" style={{ marginLeft: 10 }}>
                {" "}
                Từ 1000 - 1,000,000{" "}
              </div>{" "}
            </Col>{" "}
            <Col
              md={12}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {" "}
              <div
                style={{
                  backgroundColor: "red",
                  marginLeft: 10,
                  marginTop: 10,
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  opacity: 0.3,
                }}
              ></div>{" "}
              <div className="text2" style={{ marginLeft: 10 }}>
                {" "}
                Từ 100 - 1000{" "}
              </div>{" "}
            </Col>{" "}
            <Col
              md={12}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {" "}
              <div
                style={{
                  backgroundColor: "red",
                  marginLeft: 30,
                  marginTop: 10,
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  opacity: 0.3,
                }}
              ></div>{" "}
              <div className="text2" style={{ marginLeft: 10 }}>
                {" "}
                Từ 10 - 100{" "}
              </div>{" "}
            </Col>{" "}
            <Col
              md={12}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {" "}
              <div
                style={{
                  backgroundColor: "red",
                  marginLeft: 38,
                  marginTop: 10,
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  opacity: 0.3,
                }}
              ></div>{" "}
              <div className="text2" style={{ marginLeft: 10 }}>
                {" "}
                Từ 1 - 10{" "}
              </div>{" "}
            </Col>{" "}
          </Row>{" "}
        </Col>{" "}
      </Row>{" "}
      <ModalEmail show={openModal} onHide={() => setOpenModal(false)} />{" "}
      <Row style={{ marginTop: 10 }}>
        {" "}
        <Col className="row-1" md={12}>
          {" "}
          <Container fluid={true}>
            {" "}
            <footer
              className="container-fluid"
              style={{
                color: "white",
                textAlign: "center",
                padding: "18px",
                fontSize: "10px",
                position: "relative",
              }}
            >
              {" "}
              &copy; All rights reserved belong to &nbsp;
              <a href="https://github.com/manhhust/" className="text-light">
                manhhust
              </a>
              &nbsp;<span className="text-warning">{year}</span>. Please
              reference the Terms of Use and the Supplemental Terms for specific
              information related to your country. <br /> Your use of this
              website constitutes acceptance of the Terms of Use, Supplemental
              Terms, Privacy Policy and Cookie Policy. Do Not Sell My Personal
              Information{" "}
            </footer>{" "}
          </Container>{" "}
        </Col>{" "}
      </Row>{" "}
    </Container>
  );
}
export default App;