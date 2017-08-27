/* eslint-env jest */
import React from "react";
import { mount, shallow } from "enzyme";

import ContextMenu from "./../Component/ContextMenu";
import Item from "./../Component/Item";
import eventManager from "./../util/eventManager";
import withProxy from "./../util/withProxy";

describe("withProxy", () => {
  it("Wrapped component should render null", () => {
    const Foo = () => <div>Foobar</div>;
    const Component = withProxy({
      component: Foo,
      containerId: "foo"
    });
    const renderedComponent = shallow(<Component />);
    expect(renderedComponent.html()).toBe(null);
  });
});
