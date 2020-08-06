import configureStore from "redux-mock-store";
import reduxThunk from "redux-thunk";
import moxios from "moxios";
import { shallow, mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import React from "react";

import { MainView, fetchData } from "./MainView";
import agent from "../../agent";

describe("MainView", () => {
  const middlewares = [reduxThunk];
  const mockStore = configureStore(middlewares);
  const store = mockStore({});
  const mockTabClick = jest.fn();

  const props = {
    token: "SFHFHGFEEHVV#",
    tab: "all",
    onTabClick: mockTabClick,
  };

  let mainview, mainShallowView;
  beforeEach(() => {
    mainview = mount(<MainView {...props} />);
    mainShallowView = shallow(<MainView {...props} />);
  });

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
    expect(shallowToJson(mainShallowView)).toMatchSnapshot();
    fetchData(store.dispatch, "all", mockSuccessResponse);
  });

  describe("when user clicks on the global feed tab", () => {
    beforeEach(() => {
      console.log(mainview);
      mainview.find(".global-feed").simulate("click");
    });

    it("should invoke tab click handler", () => {
      expect(mockTabClick).toHaveBeenCalledWith("all", agent.Articles.all);
    });
  });

  describe("when user clicks on the your feed tab", () => {
    beforeEach(() => {
      console.log(mainview);
      mainview.find(".your-feed").simulate("click");
    });

    it("should invoke tab click handler", () => {
      expect(mockTabClick).toHaveBeenCalledWith("feed", agent.Articles.feed);
    });
  });
});
