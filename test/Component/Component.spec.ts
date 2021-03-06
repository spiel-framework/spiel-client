import { assert, expect } from "chai";
import { h, patch, VNode} from "../../src";

import {componentTest} from "./mocks";

describe("Component", () => {
    let nodes: VNode<any>;
    before(() => {
        nodes = h(componentTest.view, componentTest.state);
    });
    it("has to be created", () => {
        const text: any = nodes.children.find((node: any) => node.nodeName === "span");
        expect(text.children[0]).has.to.be.equal("This is a component");
    });

    it("has to exist its children", () => {
        const child: any = nodes.children.find((node: any) => node.nodeName === "div");
        const text: any = child.children.find((node: any) => node.nodeName === "span");
        expect(text.children[0]).has.to.be.equal("And this is its child");
    });
});
