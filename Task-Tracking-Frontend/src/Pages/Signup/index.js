import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Post } from "../../AxiosFunction/AxiosFunction";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import { BaseUrl, validateEmail } from "../../Config/apiUrl";
import { Logoo, signup } from "../../Constant/ImagePath";
import classes from "./Signup.module.css";
const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSignup = async () => {
    const apiUrl = BaseUrl("auth/register");
    const body = {
      firstName,
      lastName,
      email,
      password,
    };
    for (let key in body) {
      if (!body[key]) {
        return toast.error("Please fill all the fields");
      }
    }
    if (body?.password !== confirmPassword) {
      return toast.error(
        "The password and confirmation password should be match"
      );
    }
    if (!validateEmail(body?.email)) {
      return toast.error("Please fill the valid email");
    }
    if (body?.password?.length < 8) {
      return toast.error("Password should be greater than 8 character");
    }
    setIsLoading(true);
    const response = await Post(apiUrl, body);
    if (response !== undefined) {
      toast.success("Signup Successfully");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/login");
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className={classes.pageMain}>
        <div className={classes.leftMain}>
          <div className={classes.leftImageMain}>
            <img src={signup} />
          </div>
        </div>
        <div className={classes.rightMain}>
          <div className={classes.headerMain}>
            <div className={classes.sideLogoMain}>
              <div onClick={() => navigate("/")} className={classes.logoMian}>
                <img src={Logoo} />
              </div>
            </div>

            <div className={classes.alreadyMain}>
              <Link to={"/login"}>Already have account ?</Link>
              <Button onClick={() => navigate("/login")} label={"Login"} />
            </div>
          </div>

          <h2>Signup Now!</h2>
          <Row className={"gy-4"}>
          
            <Col xl={6} lg={12}>
              <Input
                setter={setFirstName}
                value={firstName}
                label={"First Name"}
                placeholder={"First Name"}
              />
            </Col>
            <Col xl={6} lg={12}>
              <Input
                setter={setLastName}
                value={lastName}
                label={"Last Name"}
                placeholder={"Last Name"}
              />
            </Col>
        
            <Col lg={12}>
              <Input
                setter={setEmail}
                value={email}
                label={"Email"}
                placeholder={"Email"}
              />
            </Col>

            <Col md={12}>
              <Input
                setter={setPassword}
                value={password}
                type={"password"}
                label={"Password"}
                placeholder={"Password"}
              />
            </Col>
            <Col md={12}>
              <Input
                setter={setConfirmPassword}
                value={confirmPassword}
                type={"password"}
                label={"Confirm Password"}
                placeholder={"Confirm Password"}
              />
            </Col>
            <Col md={12}>
              <div className={classes.btnMain}>
                <Button
                  disabled={isLoading}
                  onClick={handleSignup}
                  label={isLoading ? "Loading..." : "SIGNUP"}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Signup;
