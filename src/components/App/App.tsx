import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from '../Main/Main';
import TodoPage from '../TodoPage/TodoPage';

const App = () => {
    return (
       <BrowserRouter>
       <Routes>
        <Route path="/">
            <Route index element={<Main />}></Route>
            <Route path=":id" element={<TodoPage />}/>
        </Route>
       </Routes>
       </BrowserRouter> 
    )
}

export default App