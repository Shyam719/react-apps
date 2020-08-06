import React from "react";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { App } from "./App";

describe("App", () => {
  let app;
  const mockOnLoad = jest.fn();
  const props = {
    appLoaded: false,
    appName: "Feed App",
    currentUser: null,
    redirectTo: null,
    token: null,
    onLoad: mockOnLoad,
  };

  beforeEach(() => {
    app = shallow(<App {...props} />);
  });

  it("renders properly", () => {
    expect(shallowToJson(app)).toMatchSnapshot();
  });
});
