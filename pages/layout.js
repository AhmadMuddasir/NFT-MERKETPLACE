import React from "react";
import {
  Logo,
  Button,
  Card,
  Footer,
  CheckBox,
  Filter,
  Donate,
  Form,
  Notification,
  Profile,
  Login,
  Header,
  SignUp,
  Upload,
  Product
} from "../Components";

const layout = () => {
  return (
    <div className="home">
      <Header />
      <Product />
      {/* <Logo /> */}
      <Button />
      <Upload />
      <Notification />
      <Filter />
      <Card />
      <Donate />
      <Form />
      <Login />
      <SignUp />
      <Profile />
      <CheckBox />
      <Footer />
    </div>
  );
};

export default layout;
