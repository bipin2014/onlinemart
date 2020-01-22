import Search from "./components/Search/Search";


export default [
    {path:'/search', component:Search,exact},
    {path:'/details/:id',component:DOMSettableTokenList,exact},
    {path:'', component:HTMLFormElement,exact}
]