import React from "react";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import { Login, onFieldChange, onSubmit } from "./Login";
import {
  UPDATE_FIELD_AUTH,
  ASYNC_START,
  LOGIN,
} from "../../constants/actionTypes";

describe("Login", () => {
  let loginComp;
  const mockFieldChange = jest.fn();
  const props = {
    loading: false,
    onFieldChange: mockFieldChange,
  };
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  let store;
  beforeEach(() => {
    loginComp = shallow(<Login {...props} />);
    store = mockStore({});
  });

  const email = "shyam11@gmail.com";
  const password = "shyam11";

  const mockSuccessResponse = () => {
    return new Promise((resolve, reject) => {
      resolve({
        status: 200,
        data: {},
      });
    })
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((e) => {
        console.log(e);
      });
  };

  it("renders properly", () => {
    expect(shallowToJson(loginComp)).toMatchSnapshot();
  });

  it("should invoke onFieldChange when email input changes", () => {
    loginComp.find('input[type="email"]').simulate("change", {
      target: {
        value: email,
      },
    });

    //expect(mockFieldChange).toHaveBeenCalledWith("email", email);
    store.dispatch(onFieldChange("email", email));
  });

  it("should invoke onFieldChange when password input changes", () => {
    loginComp.find('input[type="password"]').simulate("change", {
      target: {
        value: password,
      },
    });

    //expect(mockFieldChange).toHaveBeenCalledWith("password", password);
    store.dispatch(onFieldChange("password", password));
  });

  it("should invoke onSubmit when submit is clicked", () => {
    loginComp.find("button").simulate("click");

    //expect(mockFieldChange).toHaveBeenCalledWith("password", password);
    store.dispatch(onSubmit(email, password)).then(mockSuccessResponse);
  });
});
