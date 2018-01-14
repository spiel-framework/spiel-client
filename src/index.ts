import 'reflect-metadata';

declare let node: any;

export { router, Router} from './router';
export { patch, h, Component, VNode } from "picodom";
export { render } from "./render";
export { ConfigRouters, State, View, Page, JSXElements,
    Children, Hooks, GenericHooks, Params, Handler, RoutersHandler} from './helpers'