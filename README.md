# Spiel Client

Spiel client is a flexible and light frontend framework to make easier create a complex and modern applications for the client side. It joins two light but powerful libraries: [Picodom](https://github.com/picodom/picodom) and [Navigo](https://github.com/krasimir/navigo).

## Api documentation
* [Spiel client API](https://spiel-framework.github.io/spiel-client/)

## How use it

### First config you routes

```typescript
import {ConfigRouters, Router} from 'spiel-client';

import {genericHooks, hooks} from './hooks';

import {page1, page2, page3, page4, notFound} from './Pages'

const configSettings: ConfigRouters = {
    rootPath: 'http://localhost:9876/',
    default: '/home',
    useHash: true,
    genericHooks: genericHooks,
    defaultProps: 'default',
    notFound: true,
    hash: '#!',
    notFoundPath: '/not-found',
    routers: [{
        path: '/home',
        page: page1,
        routers: [{
            path: '/child/:number',
            page: page2,
            alias: 'child',
            hooks: hooks,
            routers: [{
                path: '/child2/:word',
                alias: 'grandchild',
                page: page3
            }]
        },{
            path: '/brother',
            defaultProps: 'my own prop',
            page: page4
        }]
    },
    {
        path: '/not-found',
        page: notFound
    }]
};

router.setRouters(configDefault).resolve();
```

You can also declare the routes manually and after resolve it:

```typescript
router.setRouters()
    .onMultiple({
        '/user/:id': { 
            as: 'user', uses: (params, query) => {
                Object.assign(page2.state, params);
                render(page2.view, page2.state);
            } 
        }
    })
    .resolve();
```

Assign alias if you want generate links:

```typescript
const configDefault: ConfigRouters = {
    routers: [{
        path: '/user/:id',
        default: '/user'
        page: page1,
        alias: 'user'
    }]
};

router.setRouters(configDefault).resolve();
console.log(router.generate('user', {id: 4})); // #/user/4
```

Set your generic hooks for all the routes:

```typescript
export const genericHooks = {
    before: (done: (suppress?: boolean) => void, params: Params) => {
        if(params && params.number) params.number = +params.number + 2;
        done();
    },
    after: (params: Params) => {
        if(params && params.number) params.number = +params.number + 2;
    }
}
```

And your hooks for expecific route:

```typescript
export const hooks = {
    before: (done: (suppress?: boolean) => void, params: Params) => {
        if(params) params.number = +params.number + 2;
        done();
    },
    after: (params: Params) => {
        if(params) params.number = +params.number + 2
    },
    leave: (params: Params) => {
        if(params) params.number = +params.number + 2
    },
    already: (params: Params) => {
        if(params) params.number = +params.number + 2
    }
}    
```
### Create your page components

```typescript
import { h, Component, Page, State, VNode, Children, JSXElements } from 'spiel-client';

interface Show {
    value: string
}

export class Page1 implements Page {
    state = {
        text: 'This is a Page component'
    }

    view(state: State): JSXElements {
        return(
            <Show value={state.text}>
                <span>And this is its component</span>
            </Show>
        )
    }
}

function Show ({value}: Show, children: Children) {
    return (
        <div>
            <span>{value}</span>
            <div id='child'>{children}</div>
        </div>
    )
}

export const page1 = new Page1();
```

**Note:** you need to export the singleton of the class and always import `h` and `Component` to render the views

To know more about the views see more in [picodom](https://github.com/picodom/picodom).
All the picodom functionalities like `patch`, `h` etc... are available in spiel-client

### Config your project

This is a tsconfig example:

```typescript
{
    "compilerOptions": {
        "target": "es6",
        "module": "commonjs",
        "sourceMap": true,
        "strict": true,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "declaration": true,
        "outDir": "./lib",
        "rootDir": ".",
        "jsx": "react",
        "jsxFactory": "h"
    },
    "include": [
        "./src",
        "./example"
    ],
    "exclude": [
        "node_modules"
    ]
}
```

Remember always to put `h` in the `jsxFactory` option.

### Test your code

Create your mocks:

```typescript
import { h, Component, Page, State, VNode, Children,    JSXElements } from 'spiel-client';

interface Show {
    value: string
}

export class ComponentTest implements Page {
    state = {
        text: 'This is a component'
    }

    view(state: State): JSXElements {
        return(
            <Show value={state.text}>
                <span>And this is its child</span>
            </Show>
        )
    }
}

function Show ({value}: Show, children: Children) {
    return (
        <div>
            <span>{value}</span>
            <div id='child'>{children}</div>
        </div>
    )
}

export const componentTest = new ComponentTest();
```

and your file spec:

```typescript
import { h, VNode } from "spiel-client";
import { expect, assert } from "chai";

import {componentTest} from './mocks';

describe('Component', () => {
    let nodes: VNode<any>
    before(()=> {
        nodes = h(componentTest.view, componentTest.state);
    });
    it('has to be created', ()=> {
        const text: any = nodes.children.find((node: any) => node.type === 'span');
        expect(text.children[0]).has.to.be.equal('This is a component')
    });

    it('has to exist its children', ()=> {
        const child: any = nodes.children.find((node: any) => node.type === 'div');     
        const text: any = child.children.find((node: any) => node.type === 'span');
        expect(text.children[0]).has.to.be.equal("And this is its child");
    });
})
```

## License

Spiel Client is MIT licensed. See [license](LICENSE.md)