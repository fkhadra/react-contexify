/* eslint-env jest */
import React from "react";
import { mount, shallow } from "enzyme";

import ProxyContainer from "./../Component/ProxyContainer";
import eventManager from "./../util/eventManager";

describe("ProxyContainer", () => {
  it("Should bind event when component did mount and unbind them when will unmount", () => {
    const component = mount(<ProxyContainer />);
    expect(eventManager.eventList.has("PROXY_RENDER")).toBe(true);
    component.unmount();
    expect(eventManager.eventList.has("PROXY_RENDER")).toBe(false);
  });

  it("Don't crash if there is not element to render", () => {
    const component = shallow(<ProxyContainer />);
    expect(component.html()).toBe("<div></div>");
  });
});
